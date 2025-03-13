import DrawingCanvas, { DrawType, ShapeBufferKey } from '../../draw/DrawingCanvas';
import IDrawable from '../../draw/IDrawable';
import Point from '../../simulation/Point';
import Body from '../../simulation/Body';
import QuadTree from '../../simulation/QuadTree';

export default class DrawableQuadTree extends QuadTree implements IDrawable {
    private stars: Body[] = [];

    private static gridStyle = new ShapeBufferKey({
        priority: 0,
        drawType: DrawType.STROKE,
        strokeStyle: '#ccc',
        lineWidth: 1,
    });

    private static particleStyle = new ShapeBufferKey({
        priority: 1,
        drawType: DrawType.FILL,
        fillStyle: '#777',
    });

    public override insert(body: Body): void {
        super.insert(body);
        this.stars.push(body);
    }

    public draw(canvas: DrawingCanvas): void {
        this.drawBackground(canvas);
        for (const node of this.dfsIterator()) {
            canvas.bufferShape(DrawableQuadTree.gridStyle, (paintBrush) => {
                paintBrush.drawRectangle(node.boundary);
            });
        }

        for (const star of this.stars) {
            canvas.bufferShape(DrawableQuadTree.particleStyle, (paintBrush) => {
                paintBrush.drawPoint(star.x, star.y, star.mass);
            });
        }
    }

    private drawBackground(canvas: DrawingCanvas) {
        const colorsHex = ['#00008B', '#301934', '#8B0000'];
        const colors = colorsHex.map(this.hexToRgb);

        // Use time (in seconds) to drive the animation.
        const time = Date.now() / 1000;

        // Cycle through our colors.
        const colorCount = colors.length;
        // Total cycle duration in seconds (adjust to control speed)
        const cycleDuration = 1;
        // Determine which two colors to interpolate between.
        const cyclePosition = (time % cycleDuration) / cycleDuration;
        const currentIndex = Math.floor(time / cycleDuration) % colorCount;
        const nextIndex = (currentIndex + 1) % colorCount;

        // Get the interpolated color for the bottom part.
        const interpColor = this.interpolateColor(colors[currentIndex], colors[nextIndex], cyclePosition);
        const bottomColor = `rgb(${interpColor[0]}, ${interpColor[1]}, ${interpColor[2]})`;

        // Create a vertical linear gradient.
        const gradient = canvas.ctx.createLinearGradient(0, 0, 0, canvas.canvas.height);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, 'black');
        gradient.addColorStop(1, bottomColor);

        // Fill the canvas with the gradient.
        canvas.ctx.fillStyle = gradient;
        canvas.ctx.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    }

    private hexToRgb(hex: string): number[] {
        hex = hex.replace('#', '');
        return [
            parseInt(hex.substring(0, 2), 16),
            parseInt(hex.substring(2, 4), 16),
            parseInt(hex.substring(4, 6), 16),
        ];
    }

    private interpolateColor(color1: number[], color2: number[], factor: number): number[] {
        return color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
    }
}
