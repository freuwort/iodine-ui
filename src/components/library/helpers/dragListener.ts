export type CallbackArgument = {
    event: MouseEvent,
    x: number,
    y: number,
    deltaX: number,
    deltaY: number,
    stepX: number,
    stepY: number
}
export type CallbackFunction = (_arg: CallbackArgument) => void

export type InitialArguments = {
    event: MouseEvent,
    callback: CallbackFunction,
    endCallback?: () => void,
    stepSizeX?: number,
    stepSizeY?: number,
    onlyCallbackOnStep?: boolean,
    onlyCallbackOnStepX?: boolean,
    onlyCallbackOnStepY?: boolean
}

export function initiateDragListening (args: InitialArguments): void {
    let dragStartX = args.event.clientX
    let dragStartY = args.event.clientY
    let dragStepStartX = args.event.clientX
    let dragStepStartY = args.event.clientY
    const handleDragMouseMove = (event: MouseEvent): void => {
        const currentX = event.clientX
        const currentY = event.clientY
        const deltaX = currentX - dragStartX;
        const deltaY = currentY - dragStartY;
        let stepX = currentX - dragStepStartX;
        let stepY = currentY - dragStepStartY;

        if(args.stepSizeX) {
            //change the dragStepStartX to the currentX minus the remainder of the steps
            dragStepStartX = currentX - (stepX % args.stepSizeX)
            //calculate how much x steps have been made
            if(stepX < 0) stepX = Math.ceil(stepX / args.stepSizeX)
            if(stepX > 0) stepX = Math.floor(stepX / args.stepSizeX)
        }
        if(args.stepSizeY) {
            //change the dragStepStartY to the currentY minus the remainder of the steps
            dragStepStartY = currentY - (stepY % args.stepSizeY)
            //calculate how much y steps have been made

            if(stepY < 0) stepY = Math.ceil(stepY / args.stepSizeY)
            if(stepY > 0) stepY = Math.floor(stepY / args.stepSizeY)
        }
        if(args.onlyCallbackOnStep && stepX === 0 && stepY === 0) return
        if(args.onlyCallbackOnStepX && stepX === 0) return
        if(args.onlyCallbackOnStepY && stepY === 0) return


        args.callback({
            event: event,
            x: currentX,
            y: currentY,
            deltaX: deltaX,
            deltaY: deltaY,
            stepX: stepX,
            stepY: stepY
        })
    }
    const handleDragMouseUp = (): void => {
        window.removeEventListener('mousemove', handleDragMouseMove)
        window.removeEventListener('mouseup', handleDragMouseUp)
        args.endCallback?.()
    }

    window.addEventListener('mousemove', handleDragMouseMove)
    window.addEventListener('mouseup', handleDragMouseUp)

    dragStartX = args.event.clientX
    dragStartY = args.event.clientY

}