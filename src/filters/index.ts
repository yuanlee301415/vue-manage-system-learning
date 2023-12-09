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


export function formatFileSize(size: number): string {
    const units = ['', 'K', 'M', 'G', 'T']
    function _(size: number, idx = 0) {
        if (size < 1024) return Number(size.toFixed(2)) + units[idx] + 'B'
        return _(size / 1024, idx + 1)
    }
    return _(size)
}
