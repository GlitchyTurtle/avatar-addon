import { world, World } from '@minecraft/server'

let startTick;

const command = {
    name: 'Air Push',
    description: 'Push the air around you to shoot back all nearby entities - up to 20 blocks away from you!',
    style: 'air',
    unlockable: 2,
    unlockable_for_avatar: 2,
    cooldown: 'slow',
    async execute(player) {
        await player.addTag("kbsafe");
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("particle a:air_push ~~~");
        player.runCommandAsync("particle minecraft:explosion_manual ~~~");
        player.runCommandAsync("summon a:knockback_instant ~~~");
        player.runCommandAsync("playsound random.explode @a[r=5]");
        try { player.runCommandAsync(`damage @e[r=10,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 8))} none entity @s`); } catch (error) {}
        let kbTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;        
			if (event.currentTick - startTick > 10) {
				world.events.tick.unsubscribe(kbTick);
				player.removeTag("kbsafe");
				startTick = undefined;
			}
        })
    }
}

export default command