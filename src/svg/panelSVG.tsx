import * as React from "react"
import { JavaResolver } from "../resolver/javaResolver"
import { ResolverFactory } from "../resolver/resolverFactory"
import { NETOOL_WELLSCHEMATIC_DEVIATION, NETOOL_WELLSCHEMATIC_DEVIATION_WITH_AXES, NETOOL_WELLSCHEMATIC_VERTICAL } from "../resolver/schematicProps"
import { WebsocketResolver } from "../resolver/websocketResolver"
import { SchematicLateral, WellSchematicData } from "../resolver/wellSchematicData"
import { makeid } from "../services/commonUtilities"
import { SchematicSVG } from "./schematicSVG"
import { Stage } from "./stage"
import { ZoomContainer } from "./zoomContainer"
import { ZoomContainerWithAxes } from "./zoomContainerWithAxes"
import { ZoomProps } from "./zoomProps"

interface Props {
	wellSchematicData: WellSchematicData
	currentLateral: SchematicLateral
	widthLeftPanel: number
	plotHeight: number
}

export const PanelSVG: React.FC<Props> = (props) => {
	const zoomRef = React.useRef(null)

	React.useEffect(() => {
		window.addEventListener('resize', updateSize)
	})

	const updateSize = () => {
		if (ResolverFactory.getResolver().isInitiated()
			&& (ResolverFactory.getResolver() instanceof JavaResolver || ResolverFactory.getResolver() instanceof WebsocketResolver)
			&& props.wellSchematicData.viewOptions.modeView == NETOOL_WELLSCHEMATIC_VERTICAL) {
			// Special request for vertical view to get data in the beginning of the wellbore
			const zoomProps: ZoomProps = {
				leftUpCornerX: -window.innerWidth,
				leftUpCornerY: 0,
				rightDownCornerX: window.innerWidth,
				rightDownCornerY: window.innerHeight,
				realZoom: 1.0
			}
			ResolverFactory.getResolver().onUpdatePanZoom(zoomProps)
		}
	}

	switch (props.wellSchematicData.viewOptions.modeView) {
		case NETOOL_WELLSCHEMATIC_DEVIATION:
			return <Stage top={(100 - props.plotHeight) + '%'} height={props.plotHeight + '%'} width={props.widthLeftPanel + '%'} key={makeid("stageDeviation")}>
				<ZoomContainer ref={zoomRef}>
					<SchematicSVG currentLateral={props.currentLateral}
						viewOptions={props.wellSchematicData.viewOptions}
						stateschedule={props.wellSchematicData.currentschedule}
						rangessimulationresults={props.wellSchematicData.rangessimulationresults}
					/>
				</ZoomContainer>
			</Stage>
		case NETOOL_WELLSCHEMATIC_DEVIATION_WITH_AXES:
			return <Stage top={(100 - props.plotHeight) + '%'} height={props.plotHeight + '%'} width={props.widthLeftPanel + '%'} key={makeid("stageDeviationWithAxes")}>
				<ZoomContainerWithAxes {...props.wellSchematicData.units}>
					<SchematicSVG currentLateral={props.currentLateral}
						viewOptions={props.wellSchematicData.viewOptions}
						stateschedule={props.wellSchematicData.currentschedule}
						rangessimulationresults={props.wellSchematicData.rangessimulationresults}
					/>
				</ZoomContainerWithAxes>
			</Stage>
		case NETOOL_WELLSCHEMATIC_VERTICAL:
			const sortedPoints = props.currentLateral.wellTrajectory.points
			return <svg key={makeid("stageVertical")} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: (sortedPoints[sortedPoints.length - 1].TVD + 10).toString() + 'px' }}>
				<SchematicSVG currentLateral={props.currentLateral}
					viewOptions={props.wellSchematicData.viewOptions}
					stateschedule={props.wellSchematicData.currentschedule}
					rangessimulationresults={props.wellSchematicData.rangessimulationresults}
				/>
			</svg>
	}
}