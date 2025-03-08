enum EventState {
    IDLE,
    DOWN,
    HOLDING,
    DRAGGING,
}

enum EventInput {
    DOWN,
    UP,
    MOVE,
    HOLD,
}

const DRAG_THRESHOLD = 10;
const SEQUENTIAL_CLICK_THRESHOLD = 200;
const HOLD_THRESHOLD = 500;
const HOLD_BEAT = 100;

class EventStateMachine {
    private _state: EventState = EventState.IDLE;
    private clickEvent: MouseEvent | null = null;

    public get state() {
        return this._state;
    }

    public handleInput(input: EventInput, e: MouseEvent) {
        if (input === EventInput.DOWN) {
            this.clickEvent = e;
        }

        switch (this._state) {
            case EventState.IDLE:
                if (input === EventInput.DOWN) {
                    this._state = EventState.DOWN;
                }
                break;
            case EventState.DOWN:
                if (input === EventInput.UP) {
                    this._state = EventState.IDLE;
                } else if (input === EventInput.MOVE && this.clickDistance(e) > DRAG_THRESHOLD) {
                    this._state = EventState.DRAGGING;
                } else if (input === EventInput.HOLD) {
                    this._state = EventState.HOLDING;
                }
                break;
            case EventState.DRAGGING:
                if (input === EventInput.UP) {
                    this._state = EventState.IDLE;
                }
                break;
            case EventState.HOLDING:
                if (input === EventInput.UP) {
                    this._state = EventState.IDLE;
                }
                break;
        }
        console.log('New state: ', EventState[this._state]);
    }

    private clickDistance(e: MouseEvent): number {
        if (this.clickEvent) {
            return Math.sqrt(
                Math.pow(e.clientX - this.clickEvent.clientX, 2) + Math.pow(e.clientY - this.clickEvent.clientY, 2)
            );
        }
        return 0;
    }
}

export class CanvasEventHandlerOptions {
    public singleClickCallback: ((e: MouseEvent) => void) | null;
    public doubleClickCallback: ((e: MouseEvent) => void) | null;
    public holdCallback: ((e: MouseEvent) => void) | null;
    public dragCallback: ((e: MouseEvent) => void) | null;

    public constructor({
        singleClickCallback = null,
        doubleClickCallback = null,
        holdCallback = null,
        dragCallback = null,
    }) {
        this.singleClickCallback = singleClickCallback;
        this.doubleClickCallback = doubleClickCallback;
        this.holdCallback = holdCallback;
        this.dragCallback = dragCallback;
    }
}

export default class CanvasEventHandler {
    private canvas: HTMLCanvasElement;
    private stateMachine: EventStateMachine;
    private holdTimeout: number | undefined;
    private clickTimeout: number | undefined;
    private holdBeatInterval: number | undefined;
    private clickCount: number = 0;

    public singleClickCallback: ((e: MouseEvent) => void) | null = null;
    public doubleClickCallback: ((e: MouseEvent) => void) | null = null;
    public holdCallback: ((e: MouseEvent) => void) | null = null;
    public dragCallback: ((e: MouseEvent) => void) | null = null;

    public constructor(
        canvas: HTMLCanvasElement,
        options: CanvasEventHandlerOptions = new CanvasEventHandlerOptions({})
    ) {
        this.canvas = canvas;
        this.stateMachine = new EventStateMachine();
        this.attachEventListeners();
    }

    private attachEventListeners() {
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    private onMouseDown(e: MouseEvent) {
        this.stateMachine.handleInput(EventInput.DOWN, e);
        if (this.holdCallback) {
            this.holdTimeout = window.setTimeout(() => {
                this.stateMachine.handleInput(EventInput.HOLD, e);
                this.holdBeatInterval = window.setInterval(() => {
                    this.stateMachine.handleInput(EventInput.HOLD, e);
                    this.holdCallback && this.holdCallback(e);
                    console.log('Holding');
                }, HOLD_BEAT);
            }, HOLD_THRESHOLD);
        }
    }

    private onMouseMove(e: MouseEvent) {
        if (this.dragCallback) {
            this.stateMachine.handleInput(EventInput.MOVE, e);
            switch (this.stateMachine.state) {
                case EventState.DRAGGING:
                    console.log('Dragging');
                    this.dragCallback && this.dragCallback(e);
                    clearInterval(this.holdBeatInterval);
                    clearTimeout(this.holdTimeout);
                    clearTimeout(this.clickTimeout);
                    this.clickCount = 0;
                    break;
            }
        }
    }

    private onMouseUp(e: MouseEvent) {
        if (this.stateMachine.state === EventState.DOWN) {
            if (this.doubleClickCallback === null && this.singleClickCallback) {
                this.singleClickCallback(e);
            } else if (this.doubleClickCallback) {
                this.clickCount++;

                if (this.clickCount === 2) {
                    this.handleClickCount(e);
                } else {
                    this.clickTimeout = window.setTimeout(() => {
                        console.log(`Clicked ${this.clickCount} times`);
                        this.handleClickCount(e);
                    }, SEQUENTIAL_CLICK_THRESHOLD);
                }
            }
        }

        this.stateMachine.handleInput(EventInput.UP, e);
        clearInterval(this.holdBeatInterval);
        clearTimeout(this.holdTimeout);
    }

    private handleClickCount(e: MouseEvent) {
        switch (this.clickCount) {
            case 1:
                this.singleClickCallback && this.singleClickCallback(e);
                break;
            default:
                this.doubleClickCallback && this.doubleClickCallback(e);
                break;
        }
        this.clickCount = 0;
        if (this.clickTimeout) clearTimeout(this.clickTimeout);
    }
}
