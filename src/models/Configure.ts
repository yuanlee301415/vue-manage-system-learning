export default class Configure {
    _id: string
    label: string
    value: string | number | boolean

    constructor(config: Configure = {} as Configure) {
        this._id = config._id
        this.label = config.label
        this.value = config.value
    }
}
