import CanvasEventHandler, { CanvasEventHandlerOptions } from './CanvasEventHandler';
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

export class DrawingCanvasOptions {
    public width: number;
    public height: number;
    public backgroundColor: string | null;
    public canvasEventHandlerOptions: CanvasEventHandlerOptions;

    public constructor({
        width = null,
        height = null,
        backgroundColor = null,
        canvasEventHandlerOptions = new CanvasEventHandlerOptions({}),
    }) {
        this.width = width || document.documentElement.clientWidth;
        this.height = height || document.documentElement.clientHeight;
        this.backgroundColor = backgroundColor;
        this.canvasEventHandlerOptions = canvasEventHandlerOptions;
    }
}

class DrawingCanvas {
    private canvasId: string;
    public ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;
    private buffer: Map<string, ((paintBrush: PaintBrush) => void)[]> = new Map();
    private paintBrush: PaintBrush;
    private canvasEventHandler: CanvasEventHandler;
    private options: DrawingCanvasOptions;

    constructor(canvasId: string, options: DrawingCanvasOptions = new DrawingCanvasOptions({})) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
        this.options = options;
        this.canvasEventHandler = new CanvasEventHandler(this.canvas, this.options.canvasEventHandlerOptions);
        if (!this.canvas) throw new Error(`Canvas element with id ${this.canvasId} not found`);
        this.ctx = this.canvas.getContext('2d')!!;
        this.paintBrush = new PaintBrush(this.ctx!!);
        this.initOptions();
        this.clear();
    }

    private initOptions() {
        this.resizeCanvas(this.options.width, this.options.height);
    }

    public resizeCanvas(width: number, height: number): void {
        this.options.width = width;
        this.options.height = height;
        if (this.canvas) {
            this.canvas.width = width;
            this.canvas.height = height;
        } else {
            console.error('Canvas element is not initialized.');
        }
    }

    public onClick(callback: (event: MouseEvent) => void) {
        this.options.canvasEventHandlerOptions.singleClickCallback = callback;
    }

    public onDoubleClick(callback: (event: MouseEvent) => void) {
        this.options.canvasEventHandlerOptions.doubleClickCallback = callback;
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
            if (this.options.backgroundColor) {
                this.ctx.fillStyle = this.options.backgroundColor;
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
