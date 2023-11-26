import {State, StateMap} from "@/enums/state";

export function stateFilter(state: State) {
    return StateMap.get(state) || '-'
}
