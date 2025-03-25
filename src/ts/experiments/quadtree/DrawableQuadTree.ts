import DrawingCanvas from '../../draw/DrawingCanvas';
import IDrawable from '../../draw/IDrawable';
import Body from '../../simulation/Body';
import QuadTree from '../../simulation/QuadTree';
import Color from '../../utils/Color';
import { DrawType, GradientStyle, ShapeBufferKey } from '../../draw/DrawingUtils';
import Point from '../../geometry/Point';
import Rectangle from '../../geometry/Rectangle';
import { DrawableQuadTreeBoundaries } from './DrawableQuadTreeBoundaries';

export default class DrawableQuadTree extends QuadTree implements IDrawable {
    private stars: Body[] = [];

    private particleStyle = new ShapeBufferKey({
        priority: 2,
        drawType: DrawType.FILL,
        fillStyle: 'white',
        shadow: { color: 'white', blur: 10 },
    });

    private backgroundInterpolateFn = Color.interpolateFn(
        5000,
        new Color(3, 71, 75), // rgb(3, 71, 75)
        new Color(0, 0, 139), // rgb(0, 0, 139)
        new Color(58, 7, 81), // rgb(58, 7, 81)
        new Color(139, 0, 0) // rgb(139, 0, 0)
    );

    private drawableQuadTreeBoundaries = new DrawableQuadTreeBoundaries(this, this.backgroundInterpolateFn);

    public override insert(body: Body): void {
        super.insert(body);
        this.stars.push(body);
        this.drawableQuadTreeBoundaries.tickBoundaries();
    }

    public draw(ts: number, canvas: DrawingCanvas): void {
        this.drawBackground(ts, canvas);
        this.drawableQuadTreeBoundaries.draw(ts, canvas);
        this.drawStars(ts, canvas);
    }

    private drawStars(ts: number, canvas: DrawingCanvas): void {
        for (const star of this.stars) {
            canvas.bufferShape(this.particleStyle, (paintBrush) => {
                paintBrush.drawPoint(star.x, star.y, star.mass);
            });
        }
    }

    private drawBackground(ts: number, canvas: DrawingCanvas) {
        const interpColor = this.backgroundInterpolateFn(ts).toRgba();

        // Create a vertical linear gradient.
        const gradient = new GradientStyle({
            p1: new Point({ x: 0, y: 0 }),
            p2: new Point({ x: 0, y: canvas.height }),
        });
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, 'black');
        gradient.addColorStop(1, interpColor);

        const gradStyle = new ShapeBufferKey({
            priority: 0,
            drawType: DrawType.FILL,
            fillStyle: gradient,
        });

        canvas.bufferShape(gradStyle, (paintBrush) => {
            paintBrush.drawRectangle(new Rectangle(new Point({ x: 0, y: 0 }), canvas.width, canvas.height));
        });
    }
}
