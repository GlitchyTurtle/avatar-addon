const command = {
    name: 'Fireball',
    description: "Launch a fireball in the direction you're looking!",
    style: 'fire',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.shulker.shoot @a[r=3]");
        player.runCommand("summon fireball ^ ^1 ^2");
        try { player.runCommand("damage @e[r=10,c=1,type=fireball] 1 entity_attack entity @s"); } catch (error) {}
    }
}

export default command