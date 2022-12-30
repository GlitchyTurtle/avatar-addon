const command = {
    name: 'Fireball',
    description: "Launch a fireball in the direction you're looking!",
    style: 'fire',
    unlockable: 4,
    unlockable_for_avatar: 65,
    cooldown: 'super_fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
        player.runCommandAsync("summon fireball ^ ^1 ^2");
        try { player.runCommandAsync("damage @e[r=10,c=1,type=fireball] 1 entity_attack entity @s"); } catch (error) {}
    }
}

export default command