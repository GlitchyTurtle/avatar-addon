const command = {
    name: 'Elytra Boost',
    description: 'Speed yourself up in the air, just like a rocket!',
    style: 'air',
    unlockable: 12,
    unlockable_for_avatar: 12,
    cooldown: 'fast',
    execute(player) {
        try { player.runCommandAsync("testforblock ~~-3~ air"); } catch { return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou need to be in the air!"}]}`); }
        try { player.runCommandAsync("testforblock ~~-2~ air"); } catch { return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou need to be in the air!"}]}`); }
        try { player.runCommandAsync("testforblock ~~-1~ air"); } catch { return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou need to be in the air!"}]}`); }
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound random.explode @a[r=3]");
        player.runCommandAsync("particle a:air_vanish ~~~");
        player.runCommandAsync("summon a:knockback_instant ^^^-4");
    }
}

export default command