const fail = 0
const success = 1

/**
 * 状态
 */
export enum State {
    FAIL = fail,
    SUCCESS = success
}

export const StateMap = new Map([
    [fail, '失败'],
    [success, '成功'],
])
