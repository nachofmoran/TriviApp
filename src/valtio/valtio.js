import { proxy, useSnapshot } from "valtio";

const state = proxy({ count: 0, player: "" });

export { state };
