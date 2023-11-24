import { system, world } from "@minecraft/server";
import { beforeChat } from "./events/beforeChat.js";
import { entityHitEntityEvent } from "./events/entityHitEntity.js";
import { entityHitBlockEvent } from './events/entityHitBlock.js'
import { blockBreakBefore } from "./events/blockBreakBefore.js";
import { beforeItemUse } from "./events/beforeItemUse.js";
import { itemCompleteUse } from "./events/itemCompleteUse.js";
import { playerSpawn } from "./events/playerSpawn.js";
import { entityHurt } from "./events/entityHurt.js";
import { tickEvent } from "./runtimes/main.js";

// Disable the function that terminates the game if it hangs on a tick for too long
system.beforeEvents.watchdogTerminate.subscribe(data => { data.cancel = true; });

// Main addon
world.beforeEvents.chatSend.subscribe(msg => beforeChat(msg));
world.beforeEvents.playerBreakBlock.subscribe(eventData => blockBreakBefore(eventData));

world.afterEvents.entityHitEntity.subscribe(eventData => entityHitEntityEvent(eventData));
world.afterEvents.entityHitBlock.subscribe(eventData => entityHitBlockEvent(eventData));
world.afterEvents.itemUse.subscribe(eventData => beforeItemUse(eventData));
world.afterEvents.itemCompleteUse.subscribe(eventData => itemCompleteUse(eventData));
world.afterEvents.playerSpawn.subscribe(eventData => playerSpawn(eventData));
world.afterEvents.entityHurt.subscribe(eventData => entityHurt(eventData), {entityTypes: ["minecraft:player"]});

system.run(function runnable() { 
    system.run(runnable);
    tickEvent();
});