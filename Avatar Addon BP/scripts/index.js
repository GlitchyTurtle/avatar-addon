import { system, world } from "@minecraft/server";
import { beforeChat } from "./events/beforeChat.js";
import { hitEvent } from "./events/hitEvent.js";
import { blockBreak } from "./events/blockBreak.js";
import { beforeItemUse } from "./events/beforeItemUse.js";
import { beforeItemUseOn } from "./events/beforeItemUseOn.js";
import { itemCompleteCharge } from "./events/itemCompleteCharge.js";
import { playerSpawn } from "./events/playerSpawn.js";
import { entityHurt } from "./events/entityHurt.js";
import { tickEvent } from "./runtimes/main.js";

// Disable the function that terminates the game if it hangs on a tick for too long
system.events.beforeWatchdogTerminate.subscribe(data => { data.cancel = true; });

// Main addon
world.beforeEvents.chatSend.subscribe(msg => beforeChat(msg));
world.afterEvents.entityHit.subscribe(eventData => hitEvent(eventData));
world.afterEvents.blockBreak.subscribe(eventData => blockBreak(eventData));
world.afterEvents.itemUse.subscribe(eventData => beforeItemUse(eventData));
world.afterEvents.itemUseOn.subscribe(eventData => beforeItemUseOn(eventData));
world.afterEvents.itemCompleteCharge.subscribe(eventData => itemCompleteCharge(eventData));
world.afterEvents.playerSpawn.subscribe(eventData => playerSpawn(eventData));
world.afterEvents.entityHurt.subscribe(eventData => entityHurt(eventData), {entityTypes: ["minecraft:player"]});

system.run(function runnable() { 
    system.run(runnable);
    tickEvent();
});