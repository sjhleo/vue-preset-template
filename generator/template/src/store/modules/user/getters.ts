import { GetterTree } from "vuex";
import State from "./state";

export function id(state: State): string {
    return state.id;
}
export function name(state: State): string {
    return state.name;
}

export default <GetterTree<State, any>> {
    id,
    name,
};
