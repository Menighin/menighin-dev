import Point from '../geometry/Point';

export default class Body extends Point {
    mass: number;

    constructor(body: { x: number; y: number; mass: number }) {
        super({ x: body.x, y: body.y });
        this.mass = body.mass;
    }
}
