import DrawingCanvas from '../../draw/DrawingCanvas';
import { DrawType, ShapeBufferKey } from '../../draw/DrawingUtils';
import IDrawable from '../../draw/IDrawable';
import Body from '../../simulation/Body';
import MathUtils from '../../utils/MathUtils';

export class DrawableQuadTreeStar implements IDrawable {
    private body: Body;
    private interpolateShadowFn: (ts: number) => number;
    private possibleStarPulseOffset = [150, 180, 210, 240, 270, 300, 330];
    private possibleStarColors = ['white', 'rgb(255, 251, 172)', 'rgb(255, 201, 201)', 'rgb(195, 245, 255)'];
    private particleStyle: ShapeBufferKey;

    constructor(body: Body) {
        this.body = body;
        const randomDuration =
            this.possibleStarPulseOffset[Math.floor(Math.random() * this.possibleStarPulseOffset.length)];
        this.interpolateShadowFn = MathUtils.interpolateCycleFn(randomDuration, 0, 10);

        const randomColor = this.possibleStarColors[Math.floor(Math.random() * this.possibleStarColors.length)];
        this.particleStyle = new ShapeBufferKey({
            priority: 2,
            drawType: DrawType.FILL,
            fillStyle: randomColor,
            shadow: { color: randomColor },
        });
    }

    public draw(ts: number, canvas: DrawingCanvas): void {
        this.particleStyle.shadow.blur = this.interpolateShadowFn(ts);
        canvas.bufferShape(this.particleStyle, (paintBrush) => {
            return paintBrush.drawPoint(this.body.x, this.body.y, this.body.mass).flushInstructions();
        });
    }
}
