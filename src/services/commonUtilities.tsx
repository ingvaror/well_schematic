import { UnitVariant, SchematicSimulationResults, SCHEMATIC_FLUID_COMPOSITION, SCHEMATIC_PRESSURE, SCHEMATIC_RATES, SCHEMATIC_TEMPERATURE, SCHEMATIC_INFLUX_RATE } from "../resolver/schematicProps"


/// Function used in colorized component to extract array with simulation data from object

export function getSimulationDataArray(simulationResults: Array<SchematicSimulationResults>, colorized: string, inputNum: number): Array<any>
{
	const filtered = simulationResults.filter((_modelResult) => { return _modelResult.num == inputNum })
	if (filtered != null && filtered.length > 0) {
		const modelResult = filtered[0]

		if (colorized == SCHEMATIC_RATES && modelResult.flowRate != undefined && modelResult.flowRate.length > 0)
			return modelResult.flowRate
		else if (colorized == SCHEMATIC_INFLUX_RATE && modelResult.influxRate != undefined && modelResult.influxRate.length > 0)
			return modelResult.influxRate
		else if (colorized == SCHEMATIC_FLUID_COMPOSITION && modelResult.fractions != undefined && modelResult.fractions.length > 0)
			return modelResult.fractions
		else if (colorized == SCHEMATIC_PRESSURE && modelResult.pressure != undefined && modelResult.pressure.length > 0)
			return modelResult.pressure
		else if (colorized == SCHEMATIC_TEMPERATURE && modelResult.temperature != undefined && modelResult.temperature.length > 0)
			return modelResult.temperature
	}
	return null
}

/** Format label for axes */
export enum SchematicMarksType {
	SCHEMATIC_MARKS_EXPONENTIAL,
	SCHEMATIC_MARKS_FIXED
}

export interface SchematicMarks {
	marks: Array<{ value: number, label: string }>
	formatType: SchematicMarksType,
	count?: number
}

function getPrecisionMarks<SchematicSimulationType>(
	simulationResults: Array<SchematicSimulationType>,
	getValue: (value: SchematicSimulationType) => number,
	countFixed: number): Array<{ value: number, label: string }>
{
	return simulationResults.map((result) => {
		return {
			value: getValue(result),
			label: getValue(result).toFixed(countFixed)
		}
	})
}

function getExponentialMarks<SchematicSimulationType>(
	simulationResults: Array<SchematicSimulationType>,
	getValue: (value: SchematicSimulationType) => number): Array<{ value: number, label: string }>
{
	return simulationResults.map((result) => {
		return {
			value: getValue(result),
			label: getValue(result).toExponential()
		}
	})
}

/** check that there are no don't have */
const checkIdenticalMarks = (marks: Array<string>): boolean => {
	const unique = marks.filter((value, index, self): boolean => {
		return self.indexOf(value) === index
	})
	return unique.length == marks.length
}

const getMarksLength = (marks: Array<String>): number => {
	var countLetters = 0
	marks.forEach((mark) => countLetters = countLetters + mark.length)
	return countLetters
}

export function getMark(input: number, formatNumber: { formatType: SchematicMarksType, count?: number }): string {
	switch (formatNumber.formatType) {
		case SchematicMarksType.SCHEMATIC_MARKS_FIXED:
			return input.toFixed(formatNumber.count)
		case SchematicMarksType.SCHEMATIC_MARKS_EXPONENTIAL:
			return input.toExponential()
		default:
			console.error("Undefined type of formating number")
	}
}

export function getMarks<T>(
	inputValues: Array<T>,
	getValue: (value: T) => number): SchematicMarks
{
	var schematicMarks: SchematicMarks

	// try to find optimal marks with fixed numbers after point
	var currentMarksLength = Number.MAX_SAFE_INTEGER
	for (var i = 0; i < 10; i++) 
	{
		const newMarks = getPrecisionMarks<T>(inputValues, getValue, i)
		if (checkIdenticalMarks(newMarks.map((mark) => mark.label))) 
		{
			currentMarksLength = getMarksLength(newMarks.map((mark) => mark.label))
			schematicMarks = 
				{
					marks: newMarks,
					formatType: SchematicMarksType.SCHEMATIC_MARKS_FIXED,
					count: i
				}
			break
		}
	}

	// compare with exponential marks
	const newMarks = getExponentialMarks<T>(inputValues, getValue)
	if (checkIdenticalMarks(newMarks.map((mark) => mark.label))) 
	{
		const newMarksLength = getMarksLength(newMarks.map((mark) => mark.label))
		if (newMarksLength < currentMarksLength) 
		{
			currentMarksLength = newMarksLength
			schematicMarks = 
			{
				marks: newMarks,
				formatType: SchematicMarksType.SCHEMATIC_MARKS_EXPONENTIAL
			}
		}
	}
	
	if(schematicMarks != null)
		return schematicMarks
	else {
		const newMarks = getPrecisionMarks<T>(inputValues, getValue, 0)
		return {
			marks: newMarks,
			formatType: SchematicMarksType.SCHEMATIC_MARKS_FIXED			
		}
	}
}

export function getUnitName(units: Map<string, UnitVariant>,  unitType: string): string 
{
	if (units[unitType] != undefined)
		return units[unitType].name
	else {
		console.error("Well schematic: undefined units " + unitType)
		return ""
	}
}

export function fromInternal(input: number, units: Map<string, UnitVariant>, unitType: string): number 
{
	if (units != null)
	{
		if (units[unitType] != undefined)
		{
			const unitSystem = units[unitType]
			return (input - unitSystem.offset) / unitSystem.factor
		}
		else
		{
			console.error("Well schematic: undefined units " + unitType)
			return 1.0
		}
	}
	else
	{
		return 1.0
	}
}

// Color map

export const MATLAB_DEFAULT_COLOR_CODES = new Array(
	"#0000A0",
	"#0000B0",
	"#0000C0",
	"#0000D0",
	"#0000E0",
	"#0000F0",
	"#0000FF",
	"#0010FF",
	"#0020FF",
	"#0030FF",
	"#0040FF",
	"#0050FF",
	"#0060FF",
	"#0070FF",
	"#0080FF",
	"#0090FF",
	"#00A0FF",
	"#00B0FF",
	"#00C0FF",
	"#00D0FF",
	"#00E0FF",
	"#00F0FF",
	"#00FFFF",
	"#10FFFF",
	"#20FFF0",
	"#30FFE0",
	"#40FFD0",
	"#50FFC0",
	"#60FFB0",
	"#70FFA0",
	"#80FF90",
	"#90FF80",
	"#A0FF70",
	"#B0FF60",
	"#C0FF50",
	"#D0FF40",
	"#E0FF30",
	"#F0FF20",
	"#FFFF10",
	"#FFFF00",
	"#FFF000",
	"#FFE000",
	"#FFD000",
	"#FFC000",
	"#FFB000",
	"#FFA000",
	"#FF9000",
	"#FF8000",
	"#FF7000",
	"#FF6000",
	"#FF5000",
	"#FF4000",
	"#FF3000",
	"#FF2000",
	"#FF1000",
	"#FF0000",
	"#F00000",
	"#E00000",
	"#D00000",
	"#C00000",
	"#B00000",
	"#A00000",
	"#900000"
)

export function getColorFromMap(min: number, max: number, value: number): string {
	if(max == min)
		return MATLAB_DEFAULT_COLOR_CODES[0]
	else {
		const mapIndex = Math.round((MATLAB_DEFAULT_COLOR_CODES.length - 1) * (value - min) / (max - min))
		if (mapIndex < MATLAB_DEFAULT_COLOR_CODES.length)
			return MATLAB_DEFAULT_COLOR_CODES[mapIndex]
		else {
			console.error("Well schematic: Undefined color map: " + mapIndex)
			return "#900000"
		}
	}
}

export function makeid(prefix: String) {
	const dateString = Date.now().toString(18)
	const randomness = new Uint8Array(8)
	window.crypto.getRandomValues(randomness)
	var id = prefix + dateString
	randomness.forEach(b => id = id + b.toString())
	return id
}
