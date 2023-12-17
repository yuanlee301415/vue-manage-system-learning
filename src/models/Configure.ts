/**
 * 配置 Model
 */
export default class Configure {
    _id: string

    // 显示名称
    label: string

    // 值
    value: string | number | boolean

    constructor(config: Configure = {} as Configure) {
        this._id = config._id
        this.label = config.label
        this.value = config.value
    }
}
