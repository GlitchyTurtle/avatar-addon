const command = {
    name: 'Air Bubble',
    description: 'Defend yourself from projectiles',
    style: 'air',
    unlockable: 6,
    unlockable_for_avatar: 6,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("effect @s resistance 1 255 true");
        player.runCommandAsync("particle a:air_blast_pop ~~1~")
        player.runCommandAsync("particle a:air_bubble ~~~")
        try { player.runCommandAsync(`execute as @e[r=8,name=!${player.nameTag}] at @s run tp @s ^^^-5 facing ${player.nameTag}`); } catch (error) {}
        try { player.runCommandAsync("event entity @e[r=10] instant_despawn"); } catch (error) {}
        try { player.runCommandAsync("event entity @e[r=10] minecraft:despawn"); } catch (error) {}
        try { player.runCommandAsync("event entity @e[r=10] minecraft:explode"); } catch (error) {}
    }
}

export default command