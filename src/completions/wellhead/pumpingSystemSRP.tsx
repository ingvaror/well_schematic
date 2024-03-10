import * as React from "react"
import { SchematicCompletion, WellTrajectory } from "../../resolver/schematicProps"
import { PumpingUnitSRP } from "./pumpingUnitSRP"
import { RodSRP } from "./rod"

interface Props {
    wellTrajectory: WellTrajectory
    modeView: string
    completionSRP: SchematicCompletion
    horizontalWell: boolean
}

export const PumpingSystemSRP: React.FC<Props> = (props) => {

    const verifyIntersection = (): boolean => {
        var error = .0
        var prevMD = Number.NaN
        var prevCosInclination = Number.NaN
        props.wellTrajectory.points
            .filter((_, index) => { return index != 0 })
            .forEach((point) => {
                if (!Number.isNaN(prevMD) && !Number.isNaN(prevCosInclination))
                    error += (point.MD - prevMD) * (point.cosInclination - prevCosInclination)
                prevMD = point.MD
                prevCosInclination = point.cosInclination
            })
        return error < props.wellTrajectory.viewDiameterWell / 2
    }

    if (props.horizontalWell)
        return null

    if (verifyIntersection())
        return <>
            <PumpingUnitSRP
                viewDiameterWell={props.wellTrajectory.viewDiameterWell}
                wellTrajectory={props.wellTrajectory}
                modeView={props.modeView}
            />
            <RodSRP
                viewDiameterWell={props.wellTrajectory.viewDiameterWell}
                surfaceSchematicPoint={props.wellTrajectory.points[0]}
                plungerSchematicPoint={props.completionSRP.points[0]}
                key="rodSRP" />
        </>
    else
        return <PumpingUnitSRP
            viewDiameterWell={props.wellTrajectory.viewDiameterWell}
            wellTrajectory={props.wellTrajectory}
            modeView={props.modeView}
        />
}