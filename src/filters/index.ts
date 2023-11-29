import {State, StateMap} from "@/enums/state";
import { Gender, GenderMap } from "@/enums/gender";

export function stateFilter(state: State) {
    return StateMap.get(state) || '-'
}

export function genderFilter(gender: Gender) {
    return GenderMap.get(gender) || '-'
}
