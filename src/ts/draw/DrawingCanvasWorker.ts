import { DrawType, GradientStyle, resolveStyle, ShapeBufferKey } from './DrawingUtils';
import { DrawingInstruction } from './PaintBrush';

class DrawingCanvasWorker {
    private ctx: OffscreenCanvasRenderingContext2D;
    private canvas: OffscreenCanvas;

    constructor(canvas: OffscreenCanvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!!;
    }

    public draw(data: { drawingInstructions: DrawingInstruction[]; style: ShapeBufferKey }): void {
        const { drawingInstructions, style } = data;

        const strokeStyle = resolveStyle(style.strokeStyle);
        if (strokeStyle instanceof GradientStyle) {
            this.ctx.strokeStyle = strokeStyle.toCanvasGradient(this.ctx);
        } else {
            this.ctx.strokeStyle = strokeStyle;
        }

        const fillStyle = resolveStyle(style.fillStyle);
        if (fillStyle instanceof GradientStyle) {
            this.ctx.fillStyle = fillStyle.toCanvasGradient(this.ctx);
        } else {
            this.ctx.fillStyle = fillStyle;
        }

        this.ctx.shadowColor = style.shadow.color;
        this.ctx.shadowBlur = style.shadow.blur;
        this.ctx.shadowOffsetX = style.shadow.offsetX;
        this.ctx.shadowOffsetY = style.shadow.offsetY;

        this.ctx.lineWidth = style.lineWidth;

        this.ctx.beginPath();

        for (const instruction of drawingInstructions) {
            const { fn, args } = instruction;
            if (typeof (this.ctx as any)[fn] === 'function') {
                (this.ctx as any)[fn](...args);
            }
        }

        if (style.drawType === DrawType.STROKE) {
            this.ctx.stroke();
        } else if (style.drawType === DrawType.FILL) {
            this.ctx.fill();
        } else if (style.drawType === DrawType.STROKE_AND_FILL) {
            this.ctx.stroke();
            this.ctx.fill();
        }
    }

    public clear(data: { backgroundColor?: string | null }): void {
        if (data.backgroundColor !== undefined && data.backgroundColor !== null) {
            this.ctx.fillStyle = data.backgroundColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

let drawingCanvas: DrawingCanvasWorker;

self.onmessage = (event: MessageEvent) => {
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
        }
    }
};
