const male = 0
const female = 1

/**
 * 性别
 */
export enum Gender {
    MALE = male,
    FEMALE = female
}

export const GenderMap = new Map([
    [male, '男'],
    [female, '女']
])
