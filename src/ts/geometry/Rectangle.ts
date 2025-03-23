import DrawingCanvas from '../draw/DrawingCanvas';
import IDrawable from '../draw/IDrawable';
import Point from './Point';

export default class Rectangle implements IDrawable {
    public constructor(public topLeftCorner: Point, public width: number, public height: number) {}

    public contains(point: Point): boolean {
        return (
            point.x >= this.topLeftCorner.x &&
            point.x <= this.topLeftCorner.x + this.width &&
            point.y >= this.topLeftCorner.y &&
            point.y <= this.topLeftCorner.y + this.height
        );
    }

    public draw(canvas: DrawingCanvas) {}
}
