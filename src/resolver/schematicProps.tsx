
export enum SchematicDirection {
    RIGHT_HAND_SIDE,
    LEFT_HAND_SIDE
}

export class SchematicPoint {
    X: number
    Y: number
    TVD: number
    MD: number
    MDH: number
    sinInclination: number
    cosInclination: number
    Rwell: number
}

export interface WellTrajectory {
    viewDiameterWell: number
	radiusFactor: number
    points: Array<SchematicPoint>
}

export interface SchematicLayer {
    key: string
    layerName: string
    description: string
    completionName: string
    inner: number
    outer: number
    gravelInAnnulus: boolean
    packerLeaking: boolean
}

export interface SchematicCompletionDevice {
    completionName: string
    layerName: string
    outer: number
    x1: number
    y1: number
    rotate: number
    scaleWidth: number
    scaleHeight: number
}

export interface SchematicCompletionPipe {
    completionName: string
    layerName: string
}

export interface SchematicCompletion {
    key: string
    item: string
    userNotes: string
	MD: number
	TVD: number
	length: number
    viewDiameterWell: number
    layers?: Array<SchematicLayer>
    points: Array<SchematicPoint>
    devices: Array<SchematicCompletionDevice>
    pipes: Array<SchematicCompletionPipe>
}

export interface PressureSensor {
	key: string
	MD: number
    radiuses: Array<number>
}

export interface SchematicFluidComposition {
    layerName: string
    Q: number
    Qoil: number
    Qgas: number
    Qwater: number
    inner: number
    outer: number
    MD: number
}

export interface SchematicSimulationData {
    layerName: string
    value: number
    inner: number
    outer: number
    MD: number
}

export interface SchematicSimulationResults {
    num: number    //here can be time or Qoil for IPR
    title: string
    unitType: string
    influxRate: Array<SchematicSimulationData>
    flowRate: Array<SchematicSimulationData>
    fractions: Array<SchematicFluidComposition>
    pressure: Array<SchematicSimulationData>
    temperature: Array<SchematicSimulationData>
}

export interface RangesSimulationResults
{
	minValue: number
	maxValue: number
}

export interface UnitVariant {
    name: string
    factor: number
	offset: number
}

export interface SchematicViewOptions {
    modeView: string
}

export interface ScheduleParameters {
    num?: number
    colorized: string
}

export const SCHEMATIC_RATES = "Flow rate"
export const SCHEMATIC_FLUID_COMPOSITION = "Phase flow fractions"
export const SCHEMATIC_PRESSURE = "Pressure"
export const SCHEMATIC_TEMPERATURE = "Temperature"
export const SCHEMATIC_NOTHING = "Nothing"
export const SCHEMATIC_INFLUX_RATE = "Influx rate"

export const SCHEMATIC_UNIT_LENGTH = "length"
export const SCHEMATIC_UNIT_DIAMETER_LENGTH = "length-diameters"
export const SCHEMATIC_UNIT_FLOWRATE = "flowrate-reservoir"
export const SCHEMATIC_UNIT_FLUXRATE = "flux-reservoir"
export const SCHEMATIC_UNIT_PRESSURE = "pressure"
export const SCHEMATIC_UNIT_TEMPERATURE = "temperature"

export const NETOOL_WELLSCHEMATIC_VERTICAL = "NETOOL_WELLSCHEMATIC_VERTICAL"
export const NETOOL_WELLSCHEMATIC_DEVIATION = "NETOOL_WELLSCHEMATIC_DEVIATION"
export const NETOOL_WELLSCHEMATIC_DEVIATION_WITH_AXES = "NETOOL_WELLSCHEMATIC_DEVIATION_WITH_AXES"

export enum CompletionType {
    BLANK_PIPE_HTML = "BLANK_PIPE_HTML",
    CEMENTED_BLANK_PIPE_HTML = "CEMENTED_BLANK_PIPE_HTML",
    ICD_HTML = "ICD_HTML",
    ICV_HTML = "ICV_HTML",
    JUNCTION_HTML = "JUNCTION_HTML",
    MISSED_COMPLETION_HTML = "MISSED_COMPLETION_HTML",
    
    PACKER_HTML = "PACKER_HTML",

    CHOKE_HTML = "CHOKE_HTML",
    PLUG_HTML = "PLUG_HTML",
    PUMP_ESP_HTML = "PUMP_ESP_HTML",
    PUMP_PCP_HTML = "PUMP_PCP_HTML",
    PUMP_SRP_HTML = "PUMP_SRP_HTML",

    OPEN_HOLE_HTML = "OPEN_HOLE_HTML",
    PERF_CEMENTED_HTML = "PERF_CEMENTED_HTML",
    SCREEN_HTML = "SCREEN_HTML",
    SLOTTED_HTML = "SLOTTED_HTML",

    SECTION_ICD_HTML = "SECTION_ICD_HTML",
    SECTION_ICV_HTML = "SECTION_ICV_HTML",
    SECTION_PACKER_HTML = "SECTION_PACKER_HTML"
}
