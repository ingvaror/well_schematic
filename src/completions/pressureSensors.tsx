import * as React from "react"
import { ObservablePanZoomType, ObservableViewDiameterWellType } from "../resolver/abstractResolver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"
import { WellTrajectory, PressureSensor, SchematicDirection } from "../resolver/schematicProps"
import { getPointOffset, getPointOffsetMD } from "../services/geometryUtilities"
import './pressureSensor.css'

interface Props {
	pressureSensors: Array<PressureSensor>
	wellTrajectory: WellTrajectory
	key: string
}

interface State {
	pressureSensors: Array<PressureSensor>
	wellTrajectory: WellTrajectory
}

const onChangeCompletions: Listener<ObservablePanZoomType> = { update: () => void {} }
const onChangeViewDiameterWell: Listener<ObservableViewDiameterWellType> = { update: () => void {} }

export const PressureSensors: React.FC<Props> = (props) => {
	const [pressureSensorsState, setPressureSensorsState] = React.useState<State>({ ...props })

	React.useEffect(() => {
		ResolverFactory.getResolver().observablePanZoom.attach(onChangeCompletions)
		ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWell)
		onChangeCompletions.update = (updatedData: ObservablePanZoomType) => {
			setPressureSensorsState({ pressureSensors: updatedData.pressureSensors, wellTrajectory: pressureSensorsState.wellTrajectory })
		}
		onChangeViewDiameterWell.update = (updatedData: ObservableViewDiameterWellType) => {
			setPressureSensorsState({ ...updatedData })
		}
	})

	return <>
		{
			pressureSensorsState.pressureSensors
				.map((pressureSensor, pressureSensorIndex) => {
					return pressureSensor.radiuses.map((radiusPressure, radiusIndex) => {
						const point =
							pressureSensorsState.wellTrajectory.points
								.filter(point => { return point.MD < pressureSensor.MD })
								.sort((point1, point2) => { return point1.MD - point2.MD })
								.find((_, index, self) => index == self.length - 1)

						const scaleValue = pressureSensorsState.wellTrajectory.viewDiameterWell / 6 / 50
						const upperPoint = getPointOffsetMD(point, point.MD - pressureSensor.MD + 25 * scaleValue)
						const pointOffset = getPointOffset(upperPoint, radiusPressure, SchematicDirection.RIGHT_HAND_SIDE)
						const transform = "translate(" + pointOffset.X + ", " + pointOffset.Y + ") " +
							"scale(" + scaleValue + ", " + scaleValue + ")"

						return <g key={"group_pressure_sensor_" + pressureSensorIndex + "_" + radiusIndex} transform={transform}>
							<circle key={"circle_pressure_sensor_" + pressureSensorIndex + "_" + radiusIndex} cx={25} cy={25} r={25} fill="transparent" strokeWidth={3.0} stroke="black" />
							<text key={"text_pressure_sensor_" + pressureSensorIndex + "_" + radiusIndex} className="pressureSensor" x={11} y={32} >PT</text>
						</g>
					})
            })
		}
		</>
}