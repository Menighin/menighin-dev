import DrawingCanvas from './DrawingCanvas';

export default interface IDrawable {
    draw(canvas: DrawingCanvas): void;
}
