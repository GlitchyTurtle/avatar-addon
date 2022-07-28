import { world, Player } from "mojang-minecraft";
const World = world;

export function ping(message) {
    message.cancel = true;
    let player = message.sender;
    let pingTick = world.events.tick.subscribe(({ deltaTime }) => {
        player.runCommand(`tellraw @s {"rawtext":[{"text":"§bPong! Current TPS: ${1/deltaTime}"}]}`);
        World.events.tick.unsubscribe(pingTick);
    })
}