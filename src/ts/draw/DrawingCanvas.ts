import CanvasEventHandler from './CanvasEventHandler';
import PaintBrush from './PaintBrush';

export enum DrawType {
    NONE = 0,
    STROKE = 1,
    FILL = 2,
    STROKE_AND_FILL = 3,
}

export class ShapeBufferKey {
    public priority: number;
    public drawType: DrawType;
    public strokeStyle: string;
    public fillStyle: string;
    public lineWidth: number;

    public constructor({
        priority = 0,
        drawType = DrawType.NONE,
        strokeStyle = 'black',
        fillStyle = 'black',
        lineWidth = 1,
    }) {
        this.priority = priority;
        this.drawType = drawType;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth;
    }

    public toString(): string {
        return `${this.priority}|${this.drawType}|${this.strokeStyle}|${this.fillStyle}|${this.lineWidth}`;
    }

    public static fromString(str: string): ShapeBufferKey {
        const [priority, drawType, strokeStyle, fillStyle, lineWidth] = str.split('|');
        return new ShapeBufferKey({
            priority: Number(priority),
            drawType: Number(drawType),
            strokeStyle,
            fillStyle,
            lineWidth: Number(lineWidth),
        });
    }
}

class DrawingCanvas {
    private canvasId: string;
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private buffer: Map<string, ((paintBrush: PaintBrush) => void)[]> = new Map();
    private paintBrush: PaintBrush;
    private backgroundColor: string | null;
    private canvasEventHandler: CanvasEventHandler;

    constructor(canvasId: string, backgroundColor: string | null = null) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
        this.canvasEventHandler = new CanvasEventHandler(this.canvas);
        if (!this.canvas) throw new Error(`Canvas element with id ${this.canvasId} not found`);
        this.ctx = this.canvas.getContext('2d')!!;
        this.paintBrush = new PaintBrush(this.ctx!!);
        this.backgroundColor = backgroundColor;
        this.clear();
    }

    public resizeCanvas(width: number, height: number): void {
        if (this.canvas) {
            this.canvas.width = width;
            this.canvas.height = height;
        } else {
            console.error('Canvas element is not initialized.');
        }
    }

    public onClick(callback: (clickCount: number, event: MouseEvent) => void) {
        this.canvasEventHandler.clickCallback = callback;
    }

    public bufferShape(style: ShapeBufferKey, callback: (paintBrush: PaintBrush) => void) {
        if (this.buffer.has(style.toString())) {
            this.buffer.get(style.toString())?.push(callback);
        } else {
            this.buffer.set(style.toString(), [callback]);
        }
    }

    public flushBuffer() {
        const sortedBuffer = Array.from(this.buffer.entries())
            .map(
                ([key, value]) =>
                    [ShapeBufferKey.fromString(key), value] as [ShapeBufferKey, ((paintBrush: PaintBrush) => void)[]]
            )
            .sort(([a], [b]) => a.priority - b.priority);

        sortedBuffer.forEach(([style, callbacks]) => {
            if (this.ctx) {
                this.ctx.strokeStyle = style.strokeStyle;
                this.ctx.fillStyle = style.fillStyle;
                this.ctx.lineWidth = style.lineWidth;

                this.ctx.beginPath();
                callbacks.forEach((callback) => {
                    callback(this.paintBrush);
                });
                if (style.drawType === DrawType.STROKE) {
                    this.ctx.stroke();
                } else if (style.drawType === DrawType.FILL) {
                    this.ctx.fill();
                } else if (style.drawType === DrawType.STROKE_AND_FILL) {
                    this.ctx.stroke();
                    this.ctx.fill();
                }
            } else {
                console.error('Canvas context is not initialized.');
            }
        });
        this.buffer.clear();
    }

    public clear() {
        if (this.ctx) {
            if (this.backgroundColor) {
                this.ctx.fillStyle = this.backgroundColor;
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            } else {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        } else {
            console.error('Canvas context is not initialized.');
        }
    }
}

export default DrawingCanvas;
