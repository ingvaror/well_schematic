import * as React from "react"
import { GlobalObserver } from "../resolver/globalObserver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"
import { NETOOL_WELLSCHEMATIC_VERTICAL } from "../resolver/schematicProps"
import { StandaloneResolver } from "../resolver/standaloneResolver"
import { SchematicLateral, WellSchematicData } from "../resolver/wellSchematicData"
import { makeid } from "../services/commonUtilities"
import { CompletionTable } from "../table/completionTable"

interface Props {
	wellSchematicData: WellSchematicData
	currentLateral: SchematicLateral
	widthLeftPanel: number
}

export const DivTable: React.FC<Props> = (props) => {
	const onScrollSVG: Listener<number> = { update: (_: number) => void {} }

	React.useEffect(() => {
		GlobalObserver.getInstance().observableScrollingSVG.attach(onScrollSVG)

		onScrollSVG.update = (procentage: number) => {
			divTableRef.current.scrollTop = procentage * divTableRef.current.scrollHeight
		}

		return function cleanup() {
			GlobalObserver.getInstance().observableScrollingSVG.detach(onScrollSVG)
		}
	})

	const divTableRef = React.useRef<HTMLDivElement>(null)

	const onScrollTable = (_: React.UIEvent<HTMLDivElement, UIEvent>) => {
		if (ResolverFactory.getResolver() instanceof StandaloneResolver) {
			if (!GlobalObserver.getInstance().isScrolling()) {
				if (props.wellSchematicData.viewOptions.modeView == NETOOL_WELLSCHEMATIC_VERTICAL) {
					GlobalObserver.getInstance().setScrolling(true)
					if (divTableRef.current.offsetHeight + divTableRef.current.scrollTop >= divTableRef.current.scrollHeight) {
						GlobalObserver.getInstance().observableScrollingTable.notify(100)
					}
					else {
						const procentage = divTableRef.current.scrollTop / divTableRef.current.scrollHeight
						GlobalObserver.getInstance().observableScrollingTable.notify(procentage)
					}
				}
			} else
				GlobalObserver.getInstance().setScrolling(false)
		}
	}

	return <div key="divCompletionTable" ref={divTableRef} style={{ position: 'fixed', top: '2%', left: (props.widthLeftPanel + 3) + '%', width: (100 - props.widthLeftPanel - 4) + '%', height: '96%', overflow: 'auto' }} onScroll={onScrollTable}>
		<CompletionTable
			completions={props.currentLateral.completions}
			units={props.wellSchematicData.units}
			radiusFactor={props.currentLateral.wellTrajectory.radiusFactor}
			modeView={props.wellSchematicData.viewOptions.modeView}
			key={makeid("completionTable")}
		/>
	</div>
}