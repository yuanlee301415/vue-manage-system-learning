import dayjs from "dayjs";

import {State, StateMap} from "@/enums/state";
import { Gender, GenderMap } from "@/enums/gender";

export function formatState(state: State) {
    return StateMap.get(state) || '-'
}

export function formatGender(gender: Gender) {
    return GenderMap.get(gender) || '-'
}

export function formatDate(date: number, type = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(type)
}
