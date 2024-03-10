import { ZoomProps } from "../svg/zoomProps"
import { AbstractResolver, ObservablePanZoomType, ObservableScheduleType, ObservableViewDiameterWellType } from "./abstractResolver"
import { Observable } from "./observer"
import { ScheduleParameters, UnitVariant } from "./schematicProps"
import { SchematicLateral, WellSchematicData } from "./wellSchematicData"


export class StandaloneResolver implements AbstractResolver {
    private wellSchematicData: WellSchematicData = {
        laterals: new Array,
        units: new Map,
        viewOptions: null,
        currentTitleLateral: "",
        currentschedule: null,
        rangessimulationresults: null,
        availableColorized: new Array
    }

    private currentLateral: SchematicLateral

    public setWellSchematicData(_wellSchematicData): void {
        this.wellSchematicData = _wellSchematicData
    }

    public isInitiated(): boolean {
        return true
    }

    public getFirstLateral(): void {
        this.currentLateral = this.wellSchematicData != null && this.wellSchematicData.laterals.length > 0 ? this.wellSchematicData.laterals[0] : null
        if (this.currentLateral != null) {
            this.wellSchematicData.currentTitleLateral = this.currentLateral.title
            this.observableLateral.notify(this.wellSchematicData)
        }
    }

    public getUnits(): void {
        // Nothing changed. We don't have special units from some specific place like for Java Desktop UI
    }

    public onUpdateTitleLateral(titleLateral: string) {
        this.currentLateral = this.wellSchematicData.laterals.find((lateral) => { return lateral.title == titleLateral })
        if (this.currentLateral != null) {
            this.wellSchematicData.currentTitleLateral = this.currentLateral.title
            this.observableLateral.notify({ ...this.wellSchematicData })
        }
    }

    public observableLateral: Observable<WellSchematicData> = new Observable<WellSchematicData>()

    public onUpdateSchedule(scheduleParameters: ScheduleParameters) {
        this.wellSchematicData.currentschedule = scheduleParameters
        this.currentLateral.simulationResults
        this.observableSchedule.notify({ simulationResults: this.currentLateral.simulationResults, currentschedule: scheduleParameters })
    }

    public observableSchedule: Observable<ObservableScheduleType> = new Observable<ObservableScheduleType>()

    public onUpdatePanZoom(_: ZoomProps) {
        throw new Error("Method not implemented.")
    }

    public observablePanZoom: Observable<ObservablePanZoomType> = new Observable<ObservablePanZoomType>()

    public observableUnits: Observable<Map<string, UnitVariant>> = new Observable<Map<string, UnitVariant>>()

    public onUpdateViewDiameterWell(_: number) {
        throw new Error("Method not implemented.")
    }

    public observableViewDiameterWell: Observable<ObservableViewDiameterWellType> = new Observable<ObservableViewDiameterWellType>()

}