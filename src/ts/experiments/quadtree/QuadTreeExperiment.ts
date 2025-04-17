import Rectangle from '../../geometry/Rectangle';
import DrawingCanvas from '../../draw/DrawingCanvas';
import Body from '../../simulation/Body';
import Point from '../../geometry/Point';
import IExperiment from '../IExperiment';
import DrawableQuadTree from './DrawableQuadTree';
import FnUtils from '../../utils/FnUtils';
import MathUtils from '../../utils/MathUtils';

export default class QuadTreeExperiment implements IExperiment {
    public get title(): string {
        return 'QuadTree Experiment';
    }

    public get helpHtml(): string {
        return `
            <p style="color: purple;">
                How big of a QuadTree is necessary to simulate the universe?
            </p>
        `;
    }

    public render(): void {
        const canvas = new DrawingCanvas('canvas');
        let canvasArea = new Rectangle(
            new Point({ x: 0, y: 0 }),
            document.documentElement.clientWidth,
            document.documentElement.clientHeight
        );

        const qt = new DrawableQuadTree(canvasArea);

        canvas.drawLoop((ts) => {
            qt.draw(ts, canvas);
        });

        canvas.onClick((e) => {
            const randomMass = Math.floor(Math.random() * 4) + 1;
            qt.insert(new Body({ x: e.clientX, y: e.clientY, mass: randomMass }));
        });

        const throtledDrag = FnUtils.throttleFn((e) => {
            const randomMass = Math.floor(Math.random() * 4) + 1;
            const randomizedX = MathUtils.randomizeAround(e.clientX, 100, 100);
            const randomizedY = MathUtils.randomizeAround(e.clientY, 100, 100);
            qt.insert(new Body({ x: randomizedX, y: randomizedY, mass: randomMass }));
        }, 10);
        canvas.onDrag(throtledDrag);

        canvas.resizeCanvas(canvasArea.width, canvasArea.height);
        window.addEventListener('resize', () => {
            canvasArea = new Rectangle(
                new Point({ x: 0, y: 0 }),
                document.documentElement.clientWidth,
                document.documentElement.clientHeight
            );
            canvas.resizeCanvas(canvasArea.width, canvasArea.height);
        });
    }
}
