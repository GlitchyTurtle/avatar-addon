import { Player } from "@minecraft/server";
import { setScore } from "../util.js";

export function beforeItemUseOn(eventData) {
    const { item, source } = eventData;
    if (!(source instanceof Player)) return;

    setScore(source, "detect_right", 1);
}