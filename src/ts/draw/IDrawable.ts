import DrawingCanvas from './DrawingCanvas';

export default interface IDrawable {
    draw(ts: number, canvas: DrawingCanvas): void;
}
