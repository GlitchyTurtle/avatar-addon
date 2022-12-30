const command = {
    name: 'Concussive Pop',
    description: "Shoot enemies away with a small explosion or yourself up into the air!",
    style: 'fire',
    unlockable: 15,
    unlockable_for_avatar: 0,
    cooldown: 'super_fast',
    sub_bending_required: 'combustion',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
        player.runCommandAsync("effect @s resistance 1 1 true");
        player.runCommandAsync("summon a:explosion ^^^1");
    }
}

export default command