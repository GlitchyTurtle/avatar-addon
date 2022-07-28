const command = {
    name: 'Fire Charge',
    description: "Invograte yourself mid fight with fire to get a few extra hearts.!",
    style: 'fire',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.shulker.shoot @a[r=3]");
        player.runCommand("effect @s regeneration 2 5 true");
        player.runCommand("particle a:fire_charge_quick ~~~");
        player.runCommand("effect @s absorption 60 1 true");
        player.runCommand("effect @s speed 1 5 true");
        player.runCommand("camerashake add @s 0.4 0.1 positional");
        player.runCommand("damage @e[r=10,c=1,type=fireball] 1 entity_attack entity @s");
    }
}

export default command