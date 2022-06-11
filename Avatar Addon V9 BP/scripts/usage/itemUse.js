import { world, Player } from "mojang-minecraft";
import { ActionFormData, ModalFormData } from "mojang-minecraft-ui"

export let betaTesters = ["GlitchyTurtle32", "IBklolpop1", ];

export function getScore(objective, player, { minimum, maximum } = {}) {
    try {
        const data = player.runCommand(`scoreboard players test "${player.nameTag}" ${objective} ${minimum ? minimum : "*"} ${maximum ? maximum : "*"}`);
        return parseInt(data.statusMessage.match(/-?\d+/));
    } catch (error) {
        return;
    }
}

export function scrollMenu(eventData) {
    let { item, source } = eventData;

    if (!(source instanceof Player)) {
        return;
    }

    if (item.id === "a:bending_scroll") {

        let air = ["Leave Empty", "Air Blast", "Air Launch", "Air Scooter", "Air Push", "Air Vanish", "Air Rush", "Air Shockwave", "Air Blade", "Air Artillery", "Air Pull", "Air Dodge"];
        let earth = ["Leave Empty", "Earth Headbutt", "Earth Pillar", "Earth Shove", "Earth Lift", "Earth Shield", "Earth Spikes", "Earth Burrow", "Earth Throw", "Earth Search", "Earth Focus Build", "Earth Scaffold"];
        let water = ["Leave Empty", "Flood", "Ice Cage", "Ice Throw", "Water Spear", "Water Spike", "Water Rush", "Fountain", "Water Healing", "Life Drain", "Splash", "Water Wake"];
        let fire = ["Leave Empty", "Fire Blast", "Fire Circle", "Fire Sprint", "Fire Boosters", "Lightning", "Fire Shield", "Fireball", "Boosted Jump", "Last Ditch Effort", "Fire Smite", "Fire Finder"];
        let avatar = ["Leave Empty", "Air Blast", "Air Launch", "Air Scooter", "Air Push", "Air Vanish", "Air Rush", "Air Shockwave", "Air Blade", "Air Artillery", "Air Pull", "Air Dodge", "Earth Headbutt", "Earth Pillar", "Earth Shove", "Earth Lift", "Earth Shield", "Earth Spikes", "Earth Burrow", "Earth Throw", "Earth Search", "Earth Focus Build", "Earth Scaffold", "Flood", "Ice Cage", "Ice Throw", "Water Spear", "Water Spike", "Water Rush", "Fountain", "Water Healing", "Life Drain", "Splash", "Water Wake", "Fire Blast", "Fire Circle", "Fire Sprint", "Fire Boosters", "Lightning", "Fire Shield", "Fireball", "Boosted Jump", "Last Ditch Effort", "Fire Smite", "Fire Finder"];

        if (getScore("level", source) >= 10) {
            air.push("Triple Air Blast [Combo]")
            earth.push("Ultimate Rock Blast [Combo]")
            water.push("Water Blade Boost [Combo]")
            fire.push("Firewall [Combo]")

            avatar.push("Triple Air Blast [Combo]")
            avatar.push("Ultimate Rock Blast [Combo]")
            avatar.push("Water Blade Boost [Combo]")
            avatar.push("Firewall [Combo]")
        }

        let prevscore1 = getScore("moveslot1", source)
        let prevscore2 = getScore("moveslot2", source)
        let prevscore3 = getScore("moveslot3", source)
        let prevscore4 = getScore("moveslot4", source)
        let prevscore5 = getScore("moveslot5", source)
        let prevscore6 = getScore("moveslot6", source)

        let chooseSlot = new ModalFormData();

        let bendingstyle; let movelist;
        if (source.hasTag('air')) {
	bendingstyle = "Air";
	movelist = air;
        } else if (source.hasTag('earth')) {
	bendingstyle = "Earth";
	movelist = earth;
        } else if (source.hasTag('water')) {
	bendingstyle = "Water";
	movelist = water;
        } else if (source.hasTag('fire')) {
	bendingstyle = "Fire";
	movelist = fire;
        } else if (source.hasTag('avatar')) {
	bendingstyle = "Avatar";
	movelist = avatar;
        } else {
            return;
        }

        chooseSlot.title(`Slot Choice Menu: ${bendingstyle}`);
        chooseSlot.dropdown(`${bendingstyle} Move Slot #1`, movelist, prevscore1);
        chooseSlot.dropdown(`${bendingstyle} Move Slot #2`, movelist, prevscore2);
        chooseSlot.dropdown(`${bendingstyle} Move Slot #3`, movelist, prevscore3);
        chooseSlot.dropdown(`${bendingstyle} Move Slot #4`, movelist, prevscore4);
        if (getScore("level", source) >= 20) {
            chooseSlot.dropdown(`${bendingstyle} Move Slot #5`, movelist, prevscore5);
        }
        if (getScore("level", source) >= 30) {
            chooseSlot.dropdown(`${bendingstyle} Move Slot #6`, movelist, prevscore6);
        }

        let settingMenu = new ModalFormData();
        settingMenu.title("Settings");
        settingMenu.toggle("Show Move Messages", true);
        settingMenu.toggle("Enable Bending", true);
        settingMenu.toggle("Public Stats", true);

        let chooseStyle = new ActionFormData();
        chooseStyle.title("Bending Style Menu");
        chooseStyle.body("Choose your bending style here! Your level will be reset upon choosing though.");
        chooseStyle.button("Air", "textures/ui/air");
        chooseStyle.button("Water", "textures/ui/water");
        chooseStyle.button("Fire", "textures/ui/fire");
        chooseStyle.button("Earth", "textures/ui/earth");
        if (!getScore("aas", source)) {
            chooseStyle.button("Avatar", "textures/ui/avatar");
        }

        let infoPage = new ActionFormData();
        infoPage.title("Info Menu");
        infoPage.body("Clicking on any of the types below can show you how to use them, what moves they have, and how to trigger those moves!");
        infoPage.button("Air Info", "textures/ui/air");
        infoPage.button("Water Info", "textures/ui/water");
        infoPage.button("Fire Info", "textures/ui/fire");
        infoPage.button("Earth Info", "textures/ui/earth");
        if (!getScore("aas", source)) {
            infoPage.button("Avatar Info", "textures/ui/avatar");
        }

        let mainMenu = new ActionFormData();
        let bendingdisabled;
        mainMenu.title("Main Menu");
        if (!source.hasTag('antimagic')) {
	bendingdisabled = false
            mainMenu.button("Choose Bending", "textures/ui/avatar");
            mainMenu.button("Choose Slots", "textures/ui/avatar");
            mainMenu.button("Info", "textures/ui/info");
            mainMenu.button("Settings", "textures/ui/settings");
            mainMenu.button("Stats", "textures/ui/stats");
        } else {
	bendingdisabled = true
            mainMenu.body("Please enable bending to use this menu. Type §b!bending§r in chat.")
	mainMenu.button("Enable Bending", "textures/ui/avatar");
        }

        let players = ["None"];

        for (let player of world.getPlayers()) {
            players.push(player.name);
        }
        players = players.splice(1, )

        let statsMenu = new ModalFormData();
        statsMenu.title("See Player Stats");
        statsMenu.dropdown("Player Name:", players, 0);


        mainMenu.show(source).then((ActionFormResponse) => {
            const { selection } = ActionFormResponse;
            console.warn(`mainMenu : ${selection}`)
	if (bendingdisabled && selection === 0) {
	    source.runCommand(`tellraw @s {"rawtext":[{"text":"§aYou have your bending now!§r"}]}`);
	    source.runCommand(`tag @s remove antimagic`);
	    return;
	}
            if (selection === 0) {
                chooseStyle.show(source).then((ActionFormResponse) => {
                    const { selection } = ActionFormResponse;
                    console.warn(`chooseStyle : ${selection}`)
                    if (selection === 0 && !source.hasTag('antimagic')) {
                        source.runCommand(`function assets/reset_self`)
                        source.runCommand(`function become/air`);
                    } else if (selection === 1 && !source.hasTag('antimagic')) {
                        source.runCommand(`function assets/reset_self`)
                        source.runCommand(`function become/water`);
                    } else if (selection === 2 && !source.hasTag('antimagic')) {
                        source.runCommand(`function assets/reset_self`)
                        source.runCommand(`function become/fire`);
                    } else if (selection === 3 && !source.hasTag('antimagic')) {
                        source.runCommand(`function assets/reset_self`)
                        source.runCommand(`function become/earth`);
                    } else if (selection === 4 && !source.hasTag('antimagic')) {
                        source.runCommand(`function assets/reset_self`)
                        source.runCommand(`function become/avatar`);
                    }
                })
            } else if (selection === 1) {
                chooseSlot.show(source).then((ModalFormResponse) => {
                    const { formValues } = ModalFormResponse;
                    let [slotchoice1, slotchoice2, slotchoice3, slotchoice4, slotchoice5, slotchoice6] = formValues;
                    console.warn(`chooseSlot : ${slotchoice1} : ${slotchoice2} : ${slotchoice3} : ${slotchoice4} : ${slotchoice5} : ${slotchoice6}`);
                    source.runCommand(`scoreboard players set @s moveslot1 ${slotchoice1}`);
                    source.runCommand(`scoreboard players set @s moveslot2 ${slotchoice2}`);
                    source.runCommand(`scoreboard players set @s moveslot3 ${slotchoice3}`);
                    source.runCommand(`scoreboard players set @s moveslot4 ${slotchoice4}`);
                    if (getScore("level", source) >= 20) {
                        source.runCommand(`scoreboard players set @s moveslot5 ${slotchoice5}`);
	        }
	        if (getScore("level", source) >= 30) {
                        source.runCommand(`scoreboard players set @s moveslot6 ${slotchoice6}`);
	        }
                })
            } else if (selection === 2) {
                infoPage.show(source).then((ActionFormResponse) => {
                    const { selection } = ActionFormResponse;
                    console.warn(`infoPage : ${selection}`)
                    if (selection === 0) {
                        source.runCommand("function become/movelist_air");
                    } else if (selection === 1) {
                        source.runCommand("function become/movelist_water");
                    } else if (selection === 2) {
                        source.runCommand("function become/movelist_fire");
                    } else if (selection === 3) {
                        source.runCommand("function become/movelist_earth");
                    } else if (selection === 4) {
                        source.runCommand("function become/movelist_avatar");
                    }
                })
            } else if (selection === 3) {
                settingMenu.show(source).then((ModalFormResponse) => {
                    const { formValues } = ModalFormResponse;
                    let [moveMessages, enableBending, publicStats] = formValues;
                    console.warn(`infoPage : ${moveMessages} : ${enableBending} : ${publicStats}`);
                    if (moveMessages === true) {
                        source.removeTag('chatmsgoff');
                    } else {
                        source.addTag('chatmsgoff');
                    }
                    if (enableBending === true) {
                        source.removeTag('antimagic');
                    } else {
                        source.addTag('antimagic');
                    }
                    if (publicStats === true) {
                        source.removeTag('hide_stats');
                    } else {
                        source.addTag('hide_stats');
                    }
                })
            } else if (selection === 4) {
                statsMenu.show(source).then((ModalFormResponse) => {
                    const { formValues } = ModalFormResponse;
                    let [target] = formValues;
                    console.warn(`statsPage : ${players[target]} -> ${source.nameTag}`);
                    let extraMsgs = "";
                    if (betaTesters.includes(players[target])) {
                        extraMsgs = "\nThey helped out to create this addon as a §dbeta tester!§r"
                    } else {
                        extraMsgs = ""
                    };
                    try {
                        source.runCommand(`execute @a[name=${players[target]},tag=!hide_stats] ~~~ tellraw ${source.nameTag} {"rawtext":[{"text":"---------------------\n§b"},{"selector":"@s"},{"text":"§r is a level §b"},{"score":{"name": "@s","objective": "level"}},{"text":"§r ${bendingstyle}bender. \nThey have §c"},{"score":{"name": "@s","objective": "deaths"}},{"text":"§r deaths, and §a"},{"score":{"name": "@s","objective": "kills"}},{"text":"§r kills."},{"text":"\nTheir build is: §b"},{"score":{"name": "@s","objective": "moveslot1"}},{"text":":"},{"score":{"name": "@s","objective": "moveslot2"}},{"text":":"},{"score":{"name": "@s","objective": "moveslot3"}},{"text":":"},{"score":{"name": "@s","objective": "moveslot4"}},{"text":":"},{"score":{"name": "@s","objective": "moveslot5"}},{"text":":"},{"score":{"name": "@s","objective": "moveslot6"}},{"text":"§r${extraMsgs}\n---------------------"}]}`);
                    } catch (e) {
                        source.runCommand(`tellraw ${source.nameTag} {"rawtext":[{"text":"§cThey are not online, or have their stats privated."}]}`);
                    }
                })
            }
        })
    }
}