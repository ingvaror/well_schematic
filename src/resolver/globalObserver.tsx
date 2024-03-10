import { Observable } from "./observer"


export class GlobalObserver {
    private static instance: GlobalObserver

    public static getInstance(): GlobalObserver {
        if (this.instance == null) {
            this.instance = new GlobalObserver()
            this.instance.observableShowTable.data = true;
        }
        return this.instance
    }

    private scrolling: boolean = false;

    public observableResolverInit: Observable<boolean> = new Observable<boolean>()

    public observableZoomIn: Observable<void> = new Observable<void>()
    public observableZoomOut: Observable<void> = new Observable<void>()
    public observableZoomReset: Observable<void> = new Observable<void>()
    public observableShowTable: Observable<boolean> = new Observable<boolean>()
    public observableScrollingSVG: Observable<number> = new Observable<number>()
    public observableScrollingTable: Observable<number> = new Observable<number>()
    public isScrolling(): boolean {
        return this.scrolling;
    }
    public setScrolling(_scrolling: boolean) {
        this.scrolling = _scrolling;
    }

    public observableSetCompletionFromTable: Observable<string> = new Observable<string>()
    public observableSetCompletionFromSVG: Observable<string> = new Observable<string>()
    public observableUnsetCompletionFromTable: Observable<string> = new Observable<string>()
    public observableUnsetCompletionFromSVG: Observable<string> = new Observable<string>()
}