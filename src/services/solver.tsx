
interface LinearIntersectionProps {
    X?: number
    Y?: number
    intersected: boolean
}

export function linearIntersection(a: number, b: number, c?: number, d?: number, x?: number): LinearIntersectionProps {
    if (a == b)
        return { intersected: false }
    else if (x != undefined)
        return { X: x, Y: a * x + b, intersected: true }
    else
        return { X: (d - c) / (a - b), Y: a * (d - c) / (a - b) + c, intersected: true }
}