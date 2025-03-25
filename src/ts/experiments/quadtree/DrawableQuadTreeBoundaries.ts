import DrawingCanvas from '../../draw/DrawingCanvas';
import { DrawType, GradientStyle, ShapeBufferKey } from '../../draw/DrawingUtils';
import IDrawable from '../../draw/IDrawable';
import Point from '../../geometry/Point';
import QuadTree from '../../simulation/QuadTree';
import Color from '../../utils/Color';

export class DrawableQuadTreeBoundaries implements IDrawable {
    private quadTree: QuadTree;
    private colorInterpolateFn: (ts: number) => Color;
    private lastAddedTs: number = 0;
    private tickFlag: boolean = false;
    private white = new Color(255, 255, 255);

    constructor(quadTree: QuadTree, colorInterpolateFn: (ts: number) => Color) {
        this.quadTree = quadTree;
        this.colorInterpolateFn = colorInterpolateFn;
    }

    public draw(ts: number, canvas: DrawingCanvas): void {
        if (this.tickFlag) {
            this.lastAddedTs = ts;
            this.tickFlag = false;
        }
        const interpColor = this.colorInterpolateFn(ts);
        const alpha = this.getAlphaValue(ts);
        interpColor.alpha = alpha;
        this.white.alpha = alpha;
        const interpColorRgba = interpColor.toRgba();

        // Create a vertical linear gradient.
        const gradient = new GradientStyle({
            p1: new Point({ x: 0, y: 0 }),
            p2: new Point({ x: 0, y: canvas.height }),
        });
        gradient.addColorStop(0, interpColorRgba);
        gradient.addColorStop(0.5, interpColorRgba);
        gradient.addColorStop(1, this.white.toRgba());

        const gradStyle = new ShapeBufferKey({
            priority: 0,
            drawType: DrawType.STROKE,
            strokeStyle: gradient,
        });

        for (const node of this.quadTree.dfsIterator()) {
            canvas.bufferShape(gradStyle, (paintBrush) => {
                paintBrush.drawRectangle(node.boundary);
            });
        }
    }

    public tickBoundaries(): void {
        this.tickFlag = true;
    }

    private getAlphaValue(ts: number): number {
        const elapsed = ts - this.lastAddedTs;
        const fadeOutDuration = 2000;
        if (elapsed > fadeOutDuration) {
            return 0;
        }
        return 1 - elapsed / fadeOutDuration;
    }
}
