import Rectangle from '../geometry/Rectangle';

export type DrawingInstruction = {
    fn: string;
    args: any[];
};

export default class PaintBrush {
    private drawingInstructions: DrawingInstruction[] = [];

    public moveTo(x: number, y: number): PaintBrush {
        this.drawingInstructions.push({ fn: 'moveTo', args: [x, y] });
        return this;
    }

    public drawPoint(x: number, y: number, size: number = 5): PaintBrush {
        this.moveTo(x, y);
        this.drawingInstructions.push({ fn: 'arc', args: [x, y, size, 0, Math.PI * 2, false] });
        return this;
    }

    public drawRectangle(rectangle: Rectangle): PaintBrush {
        this.moveTo(rectangle.topLeftCorner.x, rectangle.topLeftCorner.y);
        this.drawingInstructions.push({
            fn: 'rect',
            args: [rectangle.topLeftCorner.x, rectangle.topLeftCorner.y, rectangle.width, rectangle.height],
        });
        return this;
    }

    public flushInstructions(): DrawingInstruction[] {
        const instructions = this.drawingInstructions;
        this.drawingInstructions = [];
        return instructions;
    }
}
