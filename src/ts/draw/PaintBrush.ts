import Rectangle from '../commons/Rectangle';

export default class PaintBrush {
    public ctx: CanvasRenderingContext2D;
    public constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public drawPoint(x: number, y: number, size: number = 5): void {
        this.ctx.moveTo(x, y);
        this.ctx.arc(x, y, size, 0, Math.PI * 2, false);
    }

    public drawRectangle(rectangle: Rectangle): void {
        this.ctx.moveTo(rectangle.topLeftCorner.x, rectangle.topLeftCorner.y);
        this.ctx.rect(rectangle.topLeftCorner.x, rectangle.topLeftCorner.y, rectangle.width, rectangle.height);
    }
}
