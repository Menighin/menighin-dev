import DrawingCanvas, { ShapeBufferKey } from './draw/DrawingCanvas';
import QuadTree from './simulation/QuadTree';
import Rectangle from './commons/Rectangle';

const canvas = new DrawingCanvas('canvas');
let canvasArea = new Rectangle(
    { x: 0, y: 0 },
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
);

const qt = new QuadTree(canvasArea);
qt.insert({ x: 100, y: 100, mass: 10 });

function draw() {
    canvas.clear(); // Clear the canvas before drawing
    qt.draw(canvas);
    canvas.flushBuffer();
    requestAnimationFrame(draw); // Schedule the next frame
}

// Start the drawing loop
draw();

canvas.onClick((qnt, e) => {
    qt.insert({ x: e.clientX, y: e.clientY, mass: 10 });

    // for (const node of qt.dfsIterator()) {
    //     console.log(node);
    // }
});

canvas.resizeCanvas(canvasArea.width, canvasArea.height);
window.addEventListener('resize', () => {
    canvasArea = new Rectangle(
        { x: 0, y: 0 },
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
    );
    canvas.resizeCanvas(canvasArea.width, canvasArea.height);
});

const a = new Map<ShapeBufferKey, number>();
const b = new ShapeBufferKey({ priority: 1, drawType: 2, strokeStyle: 'red', fillStyle: 'blue', lineWidth: 1 });
const c = new ShapeBufferKey({ priority: 1, drawType: 2, strokeStyle: 'blue', fillStyle: 'red', lineWidth: 1 });
const d = new ShapeBufferKey({ priority: 1, drawType: 2, strokeStyle: 'red', fillStyle: 'blue', lineWidth: 1 });
