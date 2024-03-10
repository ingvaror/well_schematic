import * as React from "react"
import { ObservableViewDiameterWellType } from "../resolver/abstractResolver"
import { Listener } from "../resolver/observer"
import { ResolverFactory } from "../resolver/resolverFactory"
import { WellTrajectory, SchematicDirection, SchematicPoint } from "../resolver/schematicProps"
import { getPointOffset } from "../services/geometryUtilities"
import './wellTrajectory.css'

const onChangeViewDiameterWell: Listener<ObservableViewDiameterWellType> = { update: () => void {} }


export const WellTrajectoryComponent: React.FC<WellTrajectory> = (props) => {

    const [wellTrajectory, setWellTrajectory] = React.useState<WellTrajectory>({ ...props })

    React.useEffect(() => {
        ResolverFactory.getResolver().observableViewDiameterWell.attach(onChangeViewDiameterWell)

        onChangeViewDiameterWell.update = (updatedData: ObservableViewDiameterWellType) => {
            setWellTrajectory({ ...updatedData.wellTrajectory })
        }
    })


    const getTrajectory = (sortedPoints: Array<SchematicPoint>): string => {
        var trajectory = ""
        sortedPoints.forEach((point, index, self) => {
            if (index != 0 && trajectory != "") {
                const prevPoint = self[index - 1]
                if (prevPoint.Rwell != point.Rwell) {
                    const additionalPoint = getPointOffset(point, prevPoint.Rwell, SchematicDirection.RIGHT_HAND_SIDE)
                    trajectory += " L " + additionalPoint.X + " " + additionalPoint.Y
                }
            }
            const rightPoint = getPointOffset(point, point.Rwell, SchematicDirection.RIGHT_HAND_SIDE)
            if (trajectory == "")
                trajectory += "M " + rightPoint.X + " " + rightPoint.Y
            else
                trajectory += " L " + rightPoint.X + " " + rightPoint.Y
        })
        sortedPoints.slice().reverse().forEach((point, index, self) => {
            if (index != 0 && trajectory != "") {
                const prevPoint = self[index - 1]
                if (prevPoint.Rwell != point.Rwell) {
                    const additionalPoint = getPointOffset(prevPoint, point.Rwell, SchematicDirection.LEFT_HAND_SIDE)
                    trajectory += " L " + additionalPoint.X + " " + additionalPoint.Y
                }
            }
            const leftPoint = getPointOffset(point, point.Rwell, SchematicDirection.LEFT_HAND_SIDE)
            trajectory += " L " + leftPoint.X + " " + leftPoint.Y
        })
        trajectory += " Z"
        return trajectory
    }

    if (wellTrajectory.points != undefined && wellTrajectory.points.length > 0) {
        const sortedPoints = wellTrajectory.points.sort((p1, p2) => { return p1.MD - p2.MD })
        return <path fill="#E6E6E6" d={getTrajectory(sortedPoints)} />
    } else
        return <></>
}