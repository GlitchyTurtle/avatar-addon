const setupScoreboards = [
    // Cooldown
    "cooldown",

    // Passives
    "water_loaded",
    "ground",
    "earth_sprint",

    // Leveling
    "level",
    "sub_level",

    // Skill Tree
    "skill_points",
    "skill_tree",

    // Combat
    "combo",
    "combat",
    "deaths",
    "kills",

    // Money
    "money",

    // Actions
    "detect_left",
    "detect_right",
    "detect_sneak",
    "sneak_time",
    "detect_dsneak",
    "detect_sneakTemp",
    "detect_dsneakSet",
    "detect_sprint",
    "detect_rhx",
    "detect_rhy",
    "detect_water",

    // Moveslots
    "moveslot1",
    "moveslot2",
    "moveslot3",
    "moveslot4",
    "moveslot5",
    "moveslot6",
    "moveslot7",
    "moveslot8",
    "moveslot9"
]

export function setup(player) {
    // Gamerules that make the addon look nicer
    player.runCommand('gamerule sendcommandfeedback false');
    player.runCommand('gamerule commandblockoutput false');
    player.runCommand('gamerule showtags false');

    // Add all the basic scoreboards
    for (const scoreboard of setupScoreboards) {
        player.runCommand(`scoreboard objectives add ${scoreboard} dummy`);
        player.runCommand(`scoreboard players add @a ${scoreboard} 0`);
    }
    
    // Settings is a special case, since it has no default value except for the first time
    player.runCommand("scoreboard players set @s detect_dsneakSet 25");
    player.runCommand('scoreboard objectives add settings dummy');
    let result = player.runCommand(`scoreboard players list avatar:config`).successCount;
    if (result) {
        player.runCommandAsync("scoreboard players operation @a settings = avatar:config settings");
    } else {
        player.runCommand("scoreboard players set avatar:config settings 13522211");
        player.runCommandAsync("scoreboard players operation @a settings = avatar:config settings");
    }

    // Give the scroll item that does everything
    player.runCommand('give @s a:bending_scroll 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}');

    // Add setup tag
    player.addTag('setup');
}