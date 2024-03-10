/** Observable pattern from https://refactoring.guru/design-patterns/observer/typescript/example 
 It's little modified to provide Generic Data from udpate function (not Subject) and it's more observable than observer
 */

/**
 * The Observer interface declares the update method, used by subjects.
 */
export interface Listener<DataType> {
    // Receive update from observable.
    update(data: DataType): void
}

/**
 * The Observable owns some important state and notifies observers when the state
 * changes.
 */
export class Observable<DataType> {
    /**
    * @type {number} For the sake of simplicity, the Subject's state, essential
    * to all subscribers, is stored in this variable.
    */
    public data: DataType

    /**
     * @type {Listener[]} List of subscribers. In real life, the list of
     * subscribers can be stored more comprehensively (categorized by event
     * type, etc.).
     */
    private listeners: Listener<DataType>[] = []

    /**
     * The subscription management methods.
     */
    public attach(listener: Listener<DataType>): void {
        const isExist = this.listeners.includes(listener)
        if (!isExist)
            this.listeners.push(listener)
    }

    public detach(listener: Listener<DataType>): void {
        const observerIndex = this.listeners.indexOf(listener)
        if (observerIndex === -1) {
            alert('Observable: Nonexistent observer.')
        }

        this.listeners.splice(observerIndex, 1)
    }

    /**
     * Trigger an update in each subscriber.
     */
    public notify(newData: DataType): void {
        this.data = newData
        for (const listener of this.listeners) {
            listener.update(newData)
        }
    }
}