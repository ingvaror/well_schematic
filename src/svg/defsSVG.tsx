import * as React from "react"
import { DefsICDComponent } from "../completions/devices/defsICD"
import { DefsICVComponent } from "../completions/devices/defsICV"
import { DefsPackerComponent } from "../completions/devices/defsPacker"
import { DefsPumpComponent } from "../completions/devices/defsPump"
import { CEMENTED_SPOTTED_PATTERN, DefsSpotted, SAND_SPOTTED_PATTERN } from "../completions/pipes/defsSpotted"
import { ObservableViewDiameterWellType } from "../resolver/abstractResolver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"

interface Props {
    viewDiameterWell: number
}

const onChangeViewDiameterWell: Listener<ObservableViewDiameterWellType> = { update: (_: ObservableViewDiameterWellType) => void {} }

export const DefsSVG: React.FC<Props> = (props) => {
    const [viewDiameterWell, setViewDiameterWell] = React.useState<number>(props.viewDiameterWell)

    React.useEffect(() => {
        ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWell)

        onChangeViewDiameterWell.update = (data: ObservableViewDiameterWellType) => {
            setViewDiameterWell(data.wellTrajectory.viewDiameterWell)
        }
    })

    return <>
        <DefsSpotted key="defsSpottedCemeneted" viewDiameterWell={viewDiameterWell} uniquePatternName={CEMENTED_SPOTTED_PATTERN} backgroundColor={"#8F8783"} />
        <DefsSpotted key="defsSpottedSand" viewDiameterWell={viewDiameterWell} uniquePatternName={SAND_SPOTTED_PATTERN} backgroundColor={"#EECC88"} />
        <DefsPumpComponent key="defsPipe" />
        <DefsICDComponent key="defsICDComponent" />
        <DefsICVComponent key="DefsICVComponent" />
        <DefsPackerComponent key="DefsPackerComponent" />
        </>
}