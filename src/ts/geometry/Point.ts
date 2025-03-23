export default class Point {
    x: number;
    y: number;

    constructor(point: { x: number; y: number }) {
        this.x = point.x;
        this.y = point.y;
    }

    distanceTo(other: Point): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
