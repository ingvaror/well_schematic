import { WellTrajectory, SchematicCompletion, PressureSensor, ScheduleParameters, SchematicSimulationResults, UnitVariant, SchematicViewOptions, RangesSimulationResults } from "./schematicProps"

export interface SchematicLateral {
    title: string
    horizontalWell: boolean
    wellTrajectory: WellTrajectory
    completions: Array<SchematicCompletion>
	pressureSensors: Array<PressureSensor>
    simulationResults: Array<SchematicSimulationResults>
}

export interface WellSchematicData {
    /** All laterarls. It contains full information only for currentTitleLateral in pagination mode and only title for another */
    laterals: Array<SchematicLateral>
    /** First initialization for units */
    units: Map<string, UnitVariant>
    /** Vertical mode or 2D */
    viewOptions: SchematicViewOptions

    /** Current active lateral: mainbore, lateral1, etc...*/
    currentTitleLateral: string
    /** Containts information about current colorized (SCHEMATIC_RATES, SCEMATIC_PRESSURE, etc.) and `num` schedule (Day, Oil rate for IPR) */
    currentschedule: ScheduleParameters
    /** MAX/MIN for pressures, rates etc. */
    rangessimulationresults: Map<string, RangesSimulationResults>
    /** List of colorized simulation results: Pressure, Rates, Temperature etc. */
	availableColorized: Array<string>
}