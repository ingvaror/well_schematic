import * as React from "react"
import { ObservableViewDiameterWellType } from "../../resolver/abstractResolver"
import { Listener } from "../../resolver/observer"
import { ResolverFactory } from "../../resolver/resolverFactory"
import { CompletionType, SchematicCompletion, WellTrajectory } from "../../resolver/schematicProps"
import { PumpingSystemSRP } from "./pumpingSystemSRP"
import { TreeHeadComponent } from "./treeHead"

interface Props {
    wellTrajectory: WellTrajectory
    completions: Array<SchematicCompletion>
    modeView: string
    horizontalWell: boolean
}

const onChangeViewDiameterWell: Listener<ObservableViewDiameterWellType> = { update: () => void {} }

export const WellHeadComponent: React.FC<Props> = (props) => {

    const [wellTrajectory, setWellTrajectory] = React.useState<WellTrajectory>(props.wellTrajectory)

    React.useEffect(() => {
        ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWell)
        onChangeViewDiameterWell.update = (updatedData: ObservableViewDiameterWellType) => {
            setWellTrajectory({ ...updatedData.wellTrajectory })
        }
    })

    if (props.completions != undefined && props.completions.some(completion => { return completion.devices != undefined && completion.devices.some(device => { return device.completionName == CompletionType.PUMP_SRP_HTML }) })) {
        return <PumpingSystemSRP
            wellTrajectory={wellTrajectory}
            modeView={props.modeView}
            completionSRP={props.completions.find(completion => { return completion.devices != undefined && completion.devices.some(device => { return device.completionName == CompletionType.PUMP_SRP_HTML }) })}
            horizontalWell={props.horizontalWell}
        />
    } else
        return <TreeHeadComponent
            wellTrajectory={wellTrajectory}
            modeView={props.modeView}
            horizontalWell={props.horizontalWell}
        />
}