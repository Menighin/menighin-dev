import CanvasEventHandler, { CanvasEventHandlerOptions } from './CanvasEventHandler';
import { DrawType, GradientStyle, ShapeBuffer, ShapeBufferKey } from './DrawingUtils';
import PaintBrush, { DrawingInstruction } from './PaintBrush';

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
    }: {
        width?: number | null;
        height?: number | null;
        backgroundColor?: string | null;
        canvasEventHandlerOptions?: CanvasEventHandlerOptions;
    }) {
        this.width = width || document.documentElement.clientWidth;
        this.height = height || document.documentElement.clientHeight;
        this.backgroundColor = backgroundColor;
        this.canvasEventHandlerOptions = canvasEventHandlerOptions;
    }
}

class DrawingCanvas {
    private canvasId: string;
    private canvas: HTMLCanvasElement;
    private buffer: ShapeBuffer = new ShapeBuffer();
    private paintBrush: PaintBrush;
    private canvasEventHandler: CanvasEventHandler;
    private options: DrawingCanvasOptions;
    private drawingCanvasWorker: Worker;

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
        // if (!this.canvas) throw new Error(`Canvas element with id ${this.canvasId} not found`);
        // this.ctx = this.canvas.getContext('2d')!!;
        this.paintBrush = new PaintBrush();
        this.initOptions();
        // this.clear();

        const offscreen = this.canvas.transferControlToOffscreen();
        this.drawingCanvasWorker = new Worker(new URL('./DrawingCanvasWorker.ts', import.meta.url), { type: 'module' });
        this.drawingCanvasWorker.postMessage([{ command: 'init', data: { canvas: offscreen } }], [offscreen]);
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

    public onHoldClick(callback: (event: MouseEvent) => void) {
        this.options.canvasEventHandlerOptions.holdCallback = callback;
    }

    public onDrag(callback: (event: MouseEvent) => void) {
        this.options.canvasEventHandlerOptions.dragCallback = callback;
    }

    public bufferShape(style: ShapeBufferKey, callback: (paintBrush: PaintBrush) => DrawingInstruction[]) {
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
            const drawingInstructions = callbacks.flatMap((callback) => callback(this.paintBrush));
            this.drawingCanvasWorker.postMessage([{ command: 'draw', data: { drawingInstructions, style } }]);
        }
        this.buffer.clear();
    }

    private clear() {
        this.drawingCanvasWorker.postMessage([
            { command: 'clear', data: { backgroundColor: this.options.backgroundColor } },
        ]);
    }
}

export default DrawingCanvas;
