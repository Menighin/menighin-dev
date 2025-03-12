import DrawingCanvas, { DrawType, ShapeBufferKey } from '../../draw/DrawingCanvas';
import IDrawable from '../../draw/IDrawable';
import QuadTree from '../../simulation/QuadTree';

export default class DrawableQuadTree extends QuadTree implements IDrawable {
    private static gridStyle = new ShapeBufferKey({
        priority: 0,
        drawType: DrawType.STROKE,
        strokeStyle: '#ccc',
        lineWidth: 1,
    });

    private static particleStyle = new ShapeBufferKey({
        priority: 1,
        drawType: DrawType.FILL,
        fillStyle: '#777',
    });

    public draw(canvas: DrawingCanvas): void {
        for (const node of this.dfsIterator()) {
            canvas.bufferShape(DrawableQuadTree.gridStyle, (paintBrush) => {
                paintBrush.drawRectangle(node.boundary);
            });

            canvas.bufferShape(DrawableQuadTree.particleStyle, (paintBrush) => {
                if (node.body) {
                    paintBrush.drawPoint(node.body.x, node.body.y, node.body.mass);
                }
            });
        }
    }
}
