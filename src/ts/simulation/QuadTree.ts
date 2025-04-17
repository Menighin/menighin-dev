import Rectangle from '../geometry/Rectangle';
import Point from '../geometry/Point';
import Body from './Body';

const MINIMUM_DISTANCE = 3;

export default class QuadTree {
    public boundary: Rectangle;
    public mass: number;
    public centerOfMass: Point | null = null;
    public body: Body | null = null;
    protected isLeaf: boolean;
    protected nw: QuadTree | null = null;
    protected ne: QuadTree | null = null;
    protected sw: QuadTree | null = null;
    protected se: QuadTree | null = null;
    protected level: number;

    public constructor(boundary: Rectangle, level = 0) {
        this.boundary = boundary;
        this.mass = 0;
        this.isLeaf = true;
        this.level = level;
    }

    public insert(newBody: Body): void {
        // If it is an empty leaf, just set it and move on
        if (this.isLeaf && this.body === null) {
            this.body = newBody;
            this.updateMass(newBody);
        }
        // If its a leaf with a body, subdivide and insert recursively
        else if (this.isLeaf && this.body !== null) {
            this.checkMinimumDistance(newBody);
            this.subdivide();
            const oldBody = this.body;
            this.emptyNode();
            this.insert(oldBody);
            this.insert(newBody);
        }
        // If its not a leaf, update and find which child to insert into
        else if (!this.isLeaf) {
            this.updateMass(newBody);
            if (this.nw && this.nw.boundary.contains(newBody)) {
                this.nw.insert(newBody);
            } else if (this.ne && this.ne.boundary.contains(newBody)) {
                this.ne.insert(newBody);
            } else if (this.sw && this.sw.boundary.contains(newBody)) {
                this.sw.insert(newBody);
            } else if (this.se && this.se.boundary.contains(newBody)) {
                this.se.insert(newBody);
            } else {
                console.error('This shouldnt happen 🤔');
            }
        } else {
            console.error('This shouldnt happen 🤔');
        }
    }

    public *dfsIterator(): IterableIterator<QuadTree> {
        yield this;
        if (this.nw) yield* this.nw.dfsIterator();
        if (this.ne) yield* this.ne.dfsIterator();
        if (this.sw) yield* this.sw.dfsIterator();
        if (this.se) yield* this.se.dfsIterator();
    }

    public *bfsIterator(): IterableIterator<QuadTree> {
        const queue: QuadTree[] = [this];
        while (queue.length > 0) {
            const node = queue.shift()!;
            yield node;
            if (node.nw) queue.push(node.nw);
            if (node.ne) queue.push(node.ne);
            if (node.sw) queue.push(node.sw);
            if (node.se) queue.push(node.se);
        }
    }

    private get isRoot(): boolean {
        return this.level === 0;
    }

    private subdivide(): void {
        const x = this.boundary.topLeftCorner.x;
        const y = this.boundary.topLeftCorner.y;
        const w = this.boundary.width / 2;
        const h = this.boundary.height / 2;

        const nw = new Rectangle(new Point({ x: x, y: y }), w, h);
        this.nw = new QuadTree(nw, this.level + 1);

        const ne = new Rectangle(new Point({ x: x + w, y: y }), w, h);
        this.ne = new QuadTree(ne, this.level + 1);

        const sw = new Rectangle(new Point({ x: x, y: y + h }), w, h);
        this.sw = new QuadTree(sw, this.level + 1);

        const se = new Rectangle(new Point({ x: x + w, y: y + h }), w, h);
        this.se = new QuadTree(se, this.level + 1);

        this.isLeaf = false;
    }

    private updateMass(newBody: Body): void {
        const totalMass = this.mass + newBody.mass;

        if (this.centerOfMass === null) {
            this.centerOfMass = new Point({ x: newBody.x, y: newBody.y });
        } else {
            const x = (this.centerOfMass.x * this.mass + newBody.x * newBody.mass) / totalMass;
            const y = (this.centerOfMass.y * this.mass + newBody.y * newBody.mass) / totalMass;
            this.centerOfMass = new Point({ x, y });
        }
        this.mass = totalMass;
    }

    private emptyNode(): void {
        this.mass = 0;
        this.centerOfMass = null;
        this.body = null;
    }

    private checkMinimumDistance(body: Body): void {
        for (const node of this.dfsIterator()) {
            if (node.body && node.body !== body) {
                const distance = body.distanceTo(node.body);
                if (distance < MINIMUM_DISTANCE) {
                    throw new Error(`Body is too close to another body in the QuadTree. Distance: ${distance}`);
                }
            }
        }
    }

    public print(lvl = 0, label = 'root'): void {
        console.log(lvl, label, this.boundary, this.mass, this.centerOfMass, this.isLeaf);
        if (this.nw) {
            this.nw.print(lvl + 1, 'nw');
        }
        if (this.ne) {
            this.ne.print(lvl + 1, 'ne');
        }
        if (this.sw) {
            this.sw.print(lvl + 1, 'sw');
        }
        if (this.se) {
            this.se.print(lvl + 1, 'se');
        }
    }
}
