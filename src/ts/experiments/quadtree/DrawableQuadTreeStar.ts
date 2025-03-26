import DrawingCanvas from '../../draw/DrawingCanvas';
import { DrawType, GradientStyle, ShapeBufferKey } from '../../draw/DrawingUtils';
import IDrawable from '../../draw/IDrawable';
import Body from '../../simulation/Body';
import MathUtils from '../../utils/MathUtils';

export class DrawableQuadTreeStar implements IDrawable {
    private particleStyle = new ShapeBufferKey({
        priority: 2,
        drawType: DrawType.FILL,
        fillStyle: 'white',
        shadow: { color: 'white' },
    });

    private body: Body;
    private interpolateShadowFn: (ts: number) => number;

    constructor(body: Body) {
        this.body = body;
        const randomDuration = Math.random() * (250 - 150) + 150;
        this.interpolateShadowFn = MathUtils.interpolateCycleFn(randomDuration, 0, 50);
    }

    public draw(ts: number, canvas: DrawingCanvas): void {
        this.particleStyle.shadow.blur = this.interpolateShadowFn(ts);
        canvas.bufferShape(this.particleStyle, (paintBrush) => {
            paintBrush.drawPoint(this.body.x, this.body.y, this.body.mass);
        });
    }
}
