import { DrawType, GradientStyle, resolveStyle, ShapeBufferKey } from './DrawingUtils';
import { DrawingInstruction } from './PaintBrush';

class DrawingCanvasWorker {
    private mainCanvas: OffscreenCanvas;
    private mainCtx: OffscreenCanvasRenderingContext2D;
    private bufferCanvas: OffscreenCanvas;
    private bufferCtx: OffscreenCanvasRenderingContext2D;

    constructor(canvas: OffscreenCanvas) {
        this.mainCanvas = canvas;
        const mainContext = canvas.getContext('2d');
        if (!mainContext) {
            throw new Error('Failed to get 2D context from main canvas.');
        }
        this.mainCtx = mainContext;

        // Create a buffer OffscreenCanvas with the same dimensions as the main one.
        this.bufferCanvas = new OffscreenCanvas(canvas.width, canvas.height);
        const bufferContext = this.bufferCanvas.getContext('2d');
        if (!bufferContext) {
            throw new Error('Failed to get 2D context from buffer canvas.');
        }
        this.bufferCtx = bufferContext;
    }

    public draw(data: { drawingInstructions: DrawingInstruction[]; style: ShapeBufferKey }): void {
        // Instead of drawing directly on the main context,
        // draw on the buffer context.
        const ctx = this.bufferCtx;
        const { drawingInstructions, style } = data;

        // Set up stroke style
        const strokeStyle = resolveStyle(style.strokeStyle);
        if (strokeStyle instanceof GradientStyle) {
            ctx.strokeStyle = strokeStyle.toCanvasGradient(ctx);
        } else {
            ctx.strokeStyle = strokeStyle;
        }

        // Set up fill style
        const fillStyle = resolveStyle(style.fillStyle);
        if (fillStyle instanceof GradientStyle) {
            ctx.fillStyle = fillStyle.toCanvasGradient(ctx);
        } else {
            ctx.fillStyle = fillStyle;
        }

        // Apply shadow properties and line width
        ctx.shadowColor = style.shadow.color;
        ctx.shadowBlur = style.shadow.blur;
        ctx.shadowOffsetX = style.shadow.offsetX;
        ctx.shadowOffsetY = style.shadow.offsetY;
        ctx.lineWidth = style.lineWidth;

        // Begin a new path and execute drawing instructions
        ctx.beginPath();
        for (const instruction of drawingInstructions) {
            const { fn, args } = instruction;
            if (typeof (ctx as any)[fn] === 'function') {
                (ctx as any)[fn](...args);
            }
        }

        // Execute the appropriate drawing command
        if (style.drawType === DrawType.STROKE) {
            ctx.stroke();
        } else if (style.drawType === DrawType.FILL) {
            ctx.fill();
        } else if (style.drawType === DrawType.STROKE_AND_FILL) {
            ctx.stroke();
            ctx.fill();
        }

        // Once the frame is fully rendered on the buffer,
        // clear the main canvas and copy the buffer image over in one step.
        // this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.mainCtx.drawImage(this.bufferCanvas, 0, 0);
    }

    public clear(data: { backgroundColor?: string | null }): void {
        // Clear the buffer canvas first.
        if (data.backgroundColor !== undefined && data.backgroundColor !== null) {
            this.bufferCtx.fillStyle = data.backgroundColor;
            this.bufferCtx.fillRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
        } else {
            this.bufferCtx.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
        }
        // Optionally clear the main canvas as well.
        // this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    }
}

let drawingCanvas: DrawingCanvasWorker;

self.onmessage = (event: MessageEvent) => {
    // Assuming you're sending an array of messages
    for (const message of event.data) {
        const { command, data } = message;
        switch (command) {
            case 'init':
                console.log('init');
                drawingCanvas = new DrawingCanvasWorker(data.canvas);
                break;
            case 'draw':
                drawingCanvas.draw(data);
                break;
            case 'clear':
                drawingCanvas.clear(data);
                break;
            default:
                console.warn(`Unknown command: ${command}`);
        }
    }
};
