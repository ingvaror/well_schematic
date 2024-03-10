import { ZoomProps } from "../svg/zoomProps"
import { Observable } from "./observer"
import { PressureSensor, ScheduleParameters, SchematicCompletion, SchematicSimulationResults, UnitVariant, WellTrajectory } from "./schematicProps"
import { WellSchematicData } from "./wellSchematicData"

export interface ObservableScheduleType {
    simulationResults: Array<SchematicSimulationResults>
    currentschedule: ScheduleParameters
}

export interface ObservablePanZoomType {
    completions: Array<SchematicCompletion>
    pressureSensors: Array<PressureSensor>
    simulationResults: Array<SchematicSimulationResults>
}

export interface ObservableViewDiameterWellType {
    completions: Array<SchematicCompletion>
    pressureSensors: Array<PressureSensor>
    simulationResults: Array<SchematicSimulationResults>
    wellTrajectory: WellTrajectory
}

export interface AbstractResolver {
    /**
     * Method to check that initialization of resolver is completed
     * */
    isInitiated(): boolean

    /** App call this method after initialization to set current lateral */
    getFirstLateral()
    /** completionTable and colorizedScale call this method to get units which is saved in WEB_Schematic_View */
    getUnits()

    /**
     * Call this method when title of lateral is changed
     * @param titleLateral Title from combobox
     */
    onUpdateTitleLateral(titleLateral: string)
    // Callback when new data has received. That's all well schematic data
    observableLateral: Observable<WellSchematicData>

    /**
     * @param scheduleParameters It includes num which is number of schedule (days, oil rates, etc.) 
     * and visualized simulation parameter (temperature, pressure, etc.)
     */
    onUpdateSchedule(scheduleParameters: ScheduleParameters)
    // Callback when new data has received. It't only Simulation Results from selected lateral
    observableSchedule: Observable<ObservableScheduleType>

    /**
     * Call this method after Pan&Zoom in 2D view or scrolling in vertical view
     * @param zoomProps Client visible field
     */
    onUpdatePanZoom(zoomProps: ZoomProps)
    // Callback when new data has received
    observablePanZoom: Observable<ObservablePanZoomType>

    ///** Call this method after update units */
    // Callback when new units has received
    observableUnits: Observable<Map<string, UnitVariant>>

    /**
     * 
     * Call this method when view diameter well is changed by slider
     * @param viewDiameterWell new view diameter
     */
    onUpdateViewDiameterWell(viewDiameterWell: number)
    // Callback when new data has received from server about completions and well trajectory
    observableViewDiameterWell: Observable<ObservableViewDiameterWellType>
}