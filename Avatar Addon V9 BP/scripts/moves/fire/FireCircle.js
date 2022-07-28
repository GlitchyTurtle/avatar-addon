import { world, World } from 'mojang-minecraft'

let startTick;

const command = {
    name: 'Fire Circle',
    description: "Set the area around you on fire in the shape of a circle, and push back nearby players!",
    style: 'fire',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
		try { player.runCommand("fill ~2 ~ ~2 ~-2 ~ ~-2 fire 0 keep"); } catch (error) {}
		try { player.runCommand("fill ~3 ~ ~1 ~-1 ~ ~-1 fire 0 keep"); } catch (error) {}
		try { player.runCommand("fill ~1 ~ ~3 ~-1 ~ ~-1 fire 0 keep"); } catch (error) {}
		try { player.runCommand("fill ~-1 ~ ~1 ~-3 ~ ~-1 fire 0 keep"); } catch (error) {}
		try { player.runCommand("fill ~1 ~ ~-3 ~-1 ~ ~-1 fire 0 keep"); } catch (error) {}
		player.runCommand("particle a:fire_wave ~~~");
		player.runCommand("particle a:fire_blast_pop ~~~");
		player.runCommand("playsound bucket.fill_lava");
		player.addTag("kbsafe");
        player.runCommand("summon a:knockback_instant ~~~");
        player.runCommand("playsound random.explode @a[r=5]");
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