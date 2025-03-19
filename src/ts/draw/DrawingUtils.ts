import Point from '../simulation/Point';

export enum DrawType {
    NONE = 0,
    STROKE = 1,
    FILL = 2,
    STROKE_AND_FILL = 3,
}

export class GradientStyle {
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

    public toCanvasGradient(ctx: CanvasRenderingContext2D): CanvasGradient {
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
    public lineWidth: number;

    public constructor({
        priority = 0,
        drawType = DrawType.NONE,
        strokeStyle = 'black',
        fillStyle = 'black',
        lineWidth = 1,
    }: {
        priority?: number;
        drawType?: DrawType;
        strokeStyle?: string | GradientStyle;
        fillStyle?: string | GradientStyle;
        lineWidth?: number;
    }) {
        this.priority = priority;
        this.drawType = drawType;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth;
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    public static fromString(str: string): ShapeBufferKey {
        const parsed = JSON.parse(str);

        // Check if strokeStyle is an object and reconstruct GradientStyle if necessary
        if (
            parsed.strokeStyle &&
            typeof parsed.strokeStyle === 'object' &&
            'p1' in parsed.strokeStyle &&
            'p2' in parsed.strokeStyle
        ) {
            parsed.strokeStyle = new GradientStyle({
                p1: new Point(parsed.strokeStyle.p1),
                p2: new Point(parsed.strokeStyle.p2),
                colorStops: parsed.strokeStyle.colorStops,
            });
        }

        // Check if fillStyle is an object and reconstruct GradientStyle if necessary
        if (
            parsed.fillStyle &&
            typeof parsed.fillStyle === 'object' &&
            'p1' in parsed.fillStyle &&
            'p2' in parsed.fillStyle
        ) {
            parsed.fillStyle = new GradientStyle({
                p1: new Point(parsed.fillStyle.p1),
                p2: new Point(parsed.fillStyle.p2),
                colorStops: parsed.fillStyle.colorStops,
            });
        }

        return new ShapeBufferKey(parsed);
    }
}
