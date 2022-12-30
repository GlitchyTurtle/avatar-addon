import { world } from '@minecraft/server'

let startTick;

const command = {
    name: 'Supercharged Air Shove',
    description: 'Push the air around you to damage and shoot back all nearby entities - up to 150 blocks away from you!',
    style: 'avatar',
    unlockable: 100,
    unlockable_for_avatar: 100,
    cooldown: 'slow',
    async execute(player) {
        if (!player.hasTag("avatar_state")) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou must be in avatar state to use this move!"}]}`);
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("particle a:supercharged_air_push ~~~");
        await player.addTag("kbsafe");
        player.runCommandAsync("summon a:knockback_avatar ~~~");
        let kbTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
            player.runCommandAsync("playsound random.explode @a[r=5]");  
			if (event.currentTick - startTick > 10) {
				world.events.tick.unsubscribe(kbTick);
				player.removeTag("kbsafe");
				startTick = undefined;
			}
        })
    }
}

export default command