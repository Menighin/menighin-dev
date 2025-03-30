import Point from '../geometry/Point';
import PaintBrush, { DrawingInstruction } from './PaintBrush';

export enum DrawType {
    NONE = 0,
    STROKE = 1,
    FILL = 2,
    STROKE_AND_FILL = 3,
}

export const resolveStyle = (style: any): string | GradientStyle => {
    if (style.typeName === 'GradientStyle') {
        return new GradientStyle(style);
    } else {
        return style.toString();
    }
};

export class GradientStyle {
    private typeName = 'GradientStyle';
    private p1: Point;
    private p2: Point;
    private colorStops: [number, string][];

    public constructor({ p1, p2, colorStops = [] }: { p1: Point; p2: Point; colorStops?: [number, string][] }) {
        this.p1 = p1;
        this.p2 = p2;
        this.colorStops = colorStops;
    }

    public addColorStop(offset: number, color: string): void {
        this.colorStops.push([offset, color]);
    }

    public toCanvasGradient(ctx: OffscreenCanvasRenderingContext2D): CanvasGradient {
        const gradient = ctx.createLinearGradient(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        this.colorStops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
        return gradient;
    }
}

export class ShapeBufferKey {
    public priority: number;
    public drawType: DrawType;
    public strokeStyle: string | GradientStyle;
    public fillStyle: string | GradientStyle;
    public shadow: { color: string; blur: number; offsetX: number; offsetY: number };
    public lineWidth: number;

    private static readonly DEFAULT_SHADOW = { color: 'black', blur: 0, offsetX: 0, offsetY: 0 };

    public constructor({
        priority = 0,
        drawType = DrawType.NONE,
        strokeStyle = 'black',
        fillStyle = 'black',
        shadow = {},
        lineWidth = 1,
    }: {
        priority?: number;
        drawType?: DrawType;
        strokeStyle?: string | GradientStyle;
        fillStyle?: string | GradientStyle;
        shadow?: { color?: string; blur?: number; offsetX?: number; offsetY?: number };
        lineWidth?: number;
    }) {
        this.priority = priority;
        this.drawType = drawType;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.shadow = { ...ShapeBufferKey.DEFAULT_SHADOW, ...shadow };
        this.lineWidth = lineWidth;
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    public static fromString(str: string): ShapeBufferKey {
        return JSON.parse(str);
    }
}

export class ShapeBuffer {
    private buffer: Map<string, [ShapeBufferKey, ((paintBrush: PaintBrush) => DrawingInstruction[])[]]>;

    public constructor() {
        this.buffer = new Map();
    }

    public has(key: ShapeBufferKey): boolean {
        return this.buffer.has(key.toString());
    }

    public push(key: ShapeBufferKey, callback: (paintBrush: PaintBrush) => DrawingInstruction[]): void {
        if (this.buffer.has(key.toString())) {
            const entry = this.buffer.get(key.toString());
            entry?.[1].push(callback);
        } else {
            this.buffer.set(key.toString(), [key, [callback]]);
        }
    }

    public *sortedIterator(): IterableIterator<[ShapeBufferKey, ((paintBrush: PaintBrush) => DrawingInstruction[])[]]> {
        const sortedBuffer = Array.from(this.buffer.values()).sort(([a], [b]) => a.priority - b.priority);
        for (const entry of sortedBuffer) {
            yield entry;
        }
    }

    public clear(): void {
        this.buffer.clear();
    }
}
