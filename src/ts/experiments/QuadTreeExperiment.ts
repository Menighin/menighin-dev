import Rectangle from '../commons/Rectangle';
import DrawingCanvas from '../draw/DrawingCanvas';
import Body from '../simulation/Body';
import Point from '../simulation/Point';
import QuadTree from '../simulation/QuadTree';
import IExperiment from './IExperiment';

export default class QuadTreeExperiment implements IExperiment {
    public get title(): string {
        return 'QuadTree Experiment';
    }

    public get helpHtml(): string {
        return `
            <p>
                This experiment shows the QuadTree data structure used in the simulation.
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

        const qt = new QuadTree(canvasArea);
        qt.insert(new Body({ x: 100, y: 100, mass: 10 }));

        function draw() {
            canvas.clear(); // Clear the canvas before drawing
            qt.draw(canvas);
            canvas.flushBuffer();
            requestAnimationFrame(draw); // Schedule the next frame
        }

        // Start the drawing loop
        draw();

        canvas.onClick((e) => {
            qt.insert(new Body({ x: e.clientX, y: e.clientY, mass: 3 }));
        });

        // canvas.onDoubleClick((e) => {
        //     console.log('Double click at: ', e.clientX, e.clientY);
        // });

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
