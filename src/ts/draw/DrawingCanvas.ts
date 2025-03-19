import CanvasEventHandler, { CanvasEventHandlerOptions } from './CanvasEventHandler';
import { DrawType, GradientStyle, ShapeBuffer, ShapeBufferKey } from './DrawingUtils';
import PaintBrush from './PaintBrush';

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
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private buffer: ShapeBuffer = new ShapeBuffer();
    private paintBrush: PaintBrush;
    private canvasEventHandler: CanvasEventHandler;
    private options: DrawingCanvasOptions;

    public get width(): number {
        return this.canvas.width;
    }

    public get height(): number {
        return this.canvas.height;
    }

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

    public drawLoop(drawCallback: (ts: number) => void) {
        requestAnimationFrame((ts: number) => this.drawLoopInternal(ts, drawCallback));
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
        this.buffer.push(style, callback);
    }

    private drawLoopInternal(ts: number, drawCallback: (ts: number) => void) {
        this.clear();
        drawCallback(ts);
        this.flushBuffer();
        requestAnimationFrame((ts: number) => this.drawLoopInternal(ts, drawCallback));
    }

    private flushBuffer() {
        for (const [style, callbacks] of this.buffer.sortedIterator()) {
            if (this.ctx) {
                if (style.strokeStyle instanceof GradientStyle) {
                    this.ctx.strokeStyle = style.strokeStyle.toCanvasGradient(this.ctx);
                } else {
                    this.ctx.strokeStyle = style.strokeStyle;
                }

                if (style.fillStyle instanceof GradientStyle) {
                    this.ctx.fillStyle = style.fillStyle.toCanvasGradient(this.ctx);
                } else {
                    this.ctx.fillStyle = style.fillStyle;
                }

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
        }
        this.buffer.clear();
    }

    private clear() {
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
