import DrawingCanvas, { DrawType, ShapeBufferKey } from '../../draw/DrawingCanvas';
import IDrawable from '../../draw/IDrawable';
import Point from '../../simulation/Point';
import Body from '../../simulation/Body';
import QuadTree from '../../simulation/QuadTree';
import Color from '../../utils/Color';

export default class DrawableQuadTree extends QuadTree implements IDrawable {
    private stars: Body[] = [];

    private gridStyle = new ShapeBufferKey({
        priority: 0,
        drawType: DrawType.STROKE,
        strokeStyle: '#ccc',
        lineWidth: 1,
    });

    private particleStyle = new ShapeBufferKey({
        priority: 1,
        drawType: DrawType.FILL,
        fillStyle: 'rgba(255,255,255)',
    });

    private backgroundInterpolateFn = Color.interpolateFn(
        3000,
        new Color(0, 0, 139), // rgb(0, 0, 139)
        new Color(48, 25, 52), // rgb(48, 25, 52)
        new Color(139, 0, 0) // rgb(139, 0, 0)
    );

    public override insert(body: Body): void {
        super.insert(body);
        this.stars.push(body);
    }

    public draw(ts: number, canvas: DrawingCanvas): void {
        this.drawBackground(ts, canvas);
        for (const node of this.dfsIterator()) {
            canvas.bufferShape(this.gridStyle, (paintBrush) => {
                paintBrush.drawRectangle(node.boundary);
            });
        }

        for (const star of this.stars) {
            canvas.bufferShape(this.particleStyle, (paintBrush) => {
                paintBrush.drawPoint(star.x, star.y, star.mass);
            });
        }
    }

    private drawBackground(ts: number, canvas: DrawingCanvas) {
        const interpColor = this.backgroundInterpolateFn(ts).toRgba();

        // Create a vertical linear gradient.
        const gradient = canvas.ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, 'black');
        gradient.addColorStop(1, interpColor);

        // Fill the canvas with the gradient.
        canvas.ctx.fillStyle = gradient;
        canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
