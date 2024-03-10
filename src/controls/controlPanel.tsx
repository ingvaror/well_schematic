import * as React from "react"

import { NETOOL_WELLSCHEMATIC_VERTICAL, RangesSimulationResults, ScheduleParameters, SchematicSimulationResults, SchematicViewOptions, UnitVariant } from "../resolver/schematicProps"

import { ScheduleControl } from "./scheduleControl"
import { ColorizedControl } from "./colorizedControl"
import { SchematicLateral } from "../resolver/wellSchematicData"
import { LateralControl } from "./lateralContol"
import { ShowTableControl } from "./showTableControl"
import { ResolverFactory } from "../resolver/resolverFactory"
import { ViewDiameterControl } from "./viewDiameterControl"
import { JavaResolver } from "../resolver/javaResolver"
import { WebsocketResolver } from "../resolver/websocketResolver"

interface Props {
    laterals: Array<SchematicLateral>
    simulationResults: Array<SchematicSimulationResults>
    units: Map<string, UnitVariant>
    height: string
	
    availableColorized: Array<string>	
    rangessimulationresults: Map<string, RangesSimulationResults>
    currentschedule: ScheduleParameters

    viewOptions: SchematicViewOptions
    viewDiameterWell: number
	
	key: string
}

export const CONTROL_LEFT_MARGIN = "8%"
export const CONTROL_WIDTH = "8%"
export const DIV_LEFT_MARGIN = "0.2%"

export const ControlPanel: React.FC<Props> = (props) => {

    const [scheduleParameters, setScheduleParameters] = React.useState<ScheduleParameters>(props.currentschedule)

    const onSetNum = (newNum: number) => {
        ResolverFactory.getResolver().onUpdateSchedule({
            num: newNum,
            colorized: scheduleParameters.colorized
        })
        setScheduleParameters({ ...scheduleParameters, num: newNum })
    }

    const onSetColorized = (newColorized: string) => {
        ResolverFactory.getResolver().onUpdateSchedule({
            num: scheduleParameters.num,
            colorized: newColorized
        })
        setScheduleParameters({ ...scheduleParameters, colorized: newColorized })
    }

    const getViewDiameterControl = (): React.ReactNode => {
        if (ResolverFactory.getResolver().isInitiated()
            && (ResolverFactory.getResolver() instanceof JavaResolver || ResolverFactory.getResolver() instanceof WebsocketResolver)
            && props.viewOptions.modeView != NETOOL_WELLSCHEMATIC_VERTICAL) {
            return <ViewDiameterControl
                key="viewDiameterControl"
                viewDiameterWell={props.viewDiameterWell}
                modeView={props.viewOptions.modeView}
                top={getTopInProcentage()}
            />
        } else
            return null
    }

    const getShowTableControl = (): React.ReactNode => {
        if (props.viewOptions.modeView != NETOOL_WELLSCHEMATIC_VERTICAL) {
            return <ShowTableControl
                key="showTableContol"
                top={getTopInProcentage()}
                />
        } else {
            return null
        }
    }

    var topInProcentage = 0
    const getTopInProcentage = (): number => {
        if (topInProcentage == 0)
            topInProcentage = 1
        else
            topInProcentage += 3
        return topInProcentage
    }

    const getColorizedControl = (): React.ReactNode => {
        if (props.simulationResults != null && props.simulationResults.length > 0) {
            return <ColorizedControl
                key="colorizedControl"
                onSetColorized={onSetColorized}
                availableColorized={props.availableColorized}
                top={getTopInProcentage()}
                currentschedule={props.currentschedule}
                rangessimulationresults={props.rangessimulationresults}
                units={props.units}
            />
        } else
            return null
    }

    const getScheduleControl = (): React.ReactNode => {
        if (props.simulationResults != null && props.simulationResults.length > 1) {
            return <ScheduleControl
                key="scheduleControl"
                simulationResults={props.simulationResults}
                num={props.currentschedule.num}
                unitType={props.simulationResults[0].unitType}
                onSetNum={onSetNum}
                top={getTopInProcentage()}
                units={props.units}
            />
        } else
            return null
    }

    const getLateralControl = (): React.ReactNode => {
        if (props.laterals.length > 1 && props.simulationResults != null && props.simulationResults.length > 0) {
            return <LateralControl
                key="lateralControl"
                laterals={props.laterals}
                top={getTopInProcentage()}
            />
        } else
            return null
    }

    return <div key="controlPanel" style={{ position: 'fixed', top: '0%', left: '0%', width: '100%', height: props.height }}>
        {getViewDiameterControl()}
        {getShowTableControl()}
        {getColorizedControl()}
        {getScheduleControl()}
        {getLateralControl()}
    </div>
}