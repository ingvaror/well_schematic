import * as React from "react"
import { CompletionContourFocus, CompletionContourHighlight } from "../completions/completionContour"
import { PressureSensors } from "../completions/pressureSensors"
import { WellHeadComponent } from "../completions/wellhead/wellHead"
import { WellNoiseTrajectoryComponent } from "../completions/wellNoiseTrajectory"
import { WellTrajectoryComponent } from "../completions/wellTrajectory"
import { RangesSimulationResults, ScheduleParameters, SchematicViewOptions } from "../resolver/schematicProps"
import { SchematicLateral } from "../resolver/wellSchematicData"
import { CompletionsSVG } from "./completionsSVG"
import { DefsSVG } from "./defsSVG"

interface Props {
    currentLateral: SchematicLateral
    viewOptions: SchematicViewOptions
    stateschedule: ScheduleParameters
    rangessimulationresults: Map<string, RangesSimulationResults>
}

export const SchematicSVG: React.FC<Props> = (props) => {

    return <>
        <DefsSVG viewDiameterWell={props.currentLateral.wellTrajectory.viewDiameterWell} />
        <CompletionContourHighlight viewDiameterWell={props.currentLateral.wellTrajectory.viewDiameterWell} completions={props.currentLateral.completions} key="completionContourHighlight" />
        <WellTrajectoryComponent {...props.currentLateral.wellTrajectory} />
        <WellNoiseTrajectoryComponent {...props.currentLateral.wellTrajectory} />
        <WellHeadComponent
            wellTrajectory={props.currentLateral.wellTrajectory}
            completions={props.currentLateral.completions}
            modeView={props.viewOptions.modeView}
            horizontalWell={props.currentLateral.horizontalWell}
        />
        <CompletionsSVG
            currentLateral={props.currentLateral}
            viewOptions={props.viewOptions}
            stateschedule={props.stateschedule}
            rangessimulationresults={props.rangessimulationresults}
        />
        <PressureSensors pressureSensors={props.currentLateral.pressureSensors} wellTrajectory={props.currentLateral.wellTrajectory} key="pressureSensors" />
        <CompletionContourFocus viewDiameterWell={props.currentLateral.wellTrajectory.viewDiameterWell} completions={props.currentLateral.completions} key="completionContourFocus" />
    </>
}