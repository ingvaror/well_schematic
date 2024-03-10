import { ZoomProps } from "../svg/zoomProps"
import { AbstractResolver, ObservablePanZoomType, ObservableScheduleType, ObservableViewDiameterWellType } from "./abstractResolver"
import { Observable } from "./observer"
import { PressureSensor, ScheduleParameters, SchematicCompletion, SchematicSimulationResults, UnitVariant } from "./schematicProps"
import { WellSchematicData } from "./wellSchematicData"

interface JavaConnector 
{
    getFirstLateral: () => void
    getUnits: () => void
    //setClipBoardData: (value: string) => void
    copyToClipboard: (text: string, content_type : string) => void
    onUpdateTitleLateral: (title: string) => void
    onUpdateSchedule: (num: number, colorized: string) => void
    onUpdatePanZoom: (leftUpCornerX: number, leftUpCornerY: number, rightDownCornerX: number, rightDownCornerY: number, realZoom: number) => void
    onUpdateViewDiameterWell: (viewDiameterWell: number) => void
}

export class JavaResolver implements AbstractResolver {
    // Use to call functions Java (uses by)
    private javaConnector: JavaConnector

    private updateJavaConnector() {
        this.javaConnector = (window as any).javaConnector
    }

    constructor() {
        this.javaConnector = (window as any).javaConnector
    }

    public isInitiated(): boolean {
        if (this.javaConnector != null)
            return true
        else {
            this.javaConnector = (window as any).javaConnector
            if (this.javaConnector != null)
                return true
            else
                return false
        }
    }

    public getFirstLateral() {
        if (this.javaConnector != null)
            this.javaConnector.getFirstLateral()
    }

    public getUnits() {
        if (this.javaConnector != null)
            this.javaConnector.getUnits()
    }

    public onUpdateUnits(newUnits: Map<string, UnitVariant>) {
        this.onUpdateUnits(newUnits)
    }

    public onUpdateTitleLateral(titleLateral: string) {
        this.updateJavaConnector()
        if (this.javaConnector != null)
            this.javaConnector.onUpdateTitleLateral(titleLateral)
    }
    public observableLateral: Observable<WellSchematicData> = new Observable<WellSchematicData>()

    public onUpdateSchedule(scheduleParameters: ScheduleParameters) {
        this.updateJavaConnector()
        if (this.javaConnector != null)
            this.javaConnector.onUpdateSchedule(scheduleParameters.num, scheduleParameters.colorized)
    }
    public observableSchedule: Observable<ObservableScheduleType> = new Observable<ObservableScheduleType>()

    public onUpdatePanZoom(zoomProps: ZoomProps) {
        this.updateJavaConnector()
        if (this.javaConnector != null)
            this.javaConnector.onUpdatePanZoom(zoomProps.leftUpCornerX, zoomProps.leftUpCornerY, zoomProps.rightDownCornerX, zoomProps.rightDownCornerY, zoomProps.realZoom)
    }
    public observablePanZoom: Observable<ObservablePanZoomType> = new Observable<ObservablePanZoomType>()

    public observableUnits: Observable<Map<string, UnitVariant>> = new Observable<Map<string, UnitVariant>>()

    public onUpdateViewDiameterWell(viewDiameterWell: number) {
        this.updateJavaConnector()
        if (this.javaConnector != null) {
            this.javaConnector.onUpdateViewDiameterWell(viewDiameterWell)
        }
    }

    public observableViewDiameterWell: Observable<ObservableViewDiameterWellType> = new Observable<ObservableViewDiameterWellType>()

    public getJavaConnector(): JavaConnector {
        this.updateJavaConnector()
        return this.javaConnector
    }

}
