import { world, Player } from "mojang-minecraft";
import { ActionFormData, ModalFormData } from "mojang-minecraft-ui"

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

    if (item.id === "minecraft:warped_fungus_on_a_stick") {

        let air = ["Leave Empty", "Air Blast", "Air Launch", "Air Scooter", "Air Push", "Air Vanish", "Air Rush", "Air Shockwave", "Air Blade", "Air Artillery", "Air Pull", "Air Dodge"];
        let earth = ["Leave Empty", "Earth Headbutt", "Earth Pillar", "Earth Shove", "Earth Lift", "Earth Shield", "Earth Spikes", "Earth Burrow", "Earth Throw", "Earth Search", "Earth Focus Build", "Earth Scaffold"];
        let water = ["Leave Empty", "Flood", "Ice Cage", "Ice Throw", "Water Spear", "Water Spike", "Water Rush", "Fountain", "Water Healing", "Life Drain", "Splash", "Water Wake"];
        let fire = ["Leave Empty", "Fire Blast", "Fire Circle", "Fire Sprint", "Fire Boosters", "Lightning", "Fire Shield", "Fireball", "Boosted Jump", "Last Ditch Effort", "Fire Smite", "Fire Finder"];
        let avatar = ["Leave Empty", "Air Blast", "Air Launch", "Air Scooter", "Air Push", "Air Vanish", "Air Rush", "Air Shockwave", "Air Blade", "Air Artillery", "Air Pull", "Air Dodge", "Earth Headbutt", "Earth Pillar", "Earth Shove", "Earth Lift", "Earth Shield", "Earth Spikes", "Earth Burrow", "Earth Throw", "Earth Search", "Earth Focus Build", "Earth Scaffold", "Flood", "Ice Cage", "Ice Throw", "Water Spear", "Water Spike", "Water Rush", "Fountain", "Water Healing", "Life Drain", "Splash", "Water Wake", "Fire Blast", "Fire Circle", "Fire Sprint", "Fire Boosters", "Lightning", "Fire Shield", "Fireball", "Boosted Jump", "Last Ditch Effort", "Fire Smite", "Fire Finder"];

        if (getScore("unlocked", source) >= 1) {
            air.push("Triple Air Blast")
        }


        let prevscore1 = getScore("moveslot1", source)
        let prevscore2 = getScore("moveslot2", source)
        let prevscore3 = getScore("moveslot3", source)
        let prevscore4 = getScore("moveslot4", source)

        let chooseSlot = new ModalFormData();

        if (source.hasTag('air')) {
            chooseSlot.title("Slot Choice Menu: Air");
            chooseSlot.dropdown("Air Move Slot #1", air, prevscore1);
            chooseSlot.dropdown("Air Move Slot #2", air, prevscore2);
            chooseSlot.dropdown("Air Move Slot #3", air, prevscore3);
            chooseSlot.dropdown("Air Move Slot #4", air, prevscore4);
        } else if (source.hasTag('earth')) {
            chooseSlot.title("Slot Choice Menu: Earth");
            chooseSlot.dropdown("Earth Move Slot #1", earth, prevscore1);
            chooseSlot.dropdown("Earth Move Slot #2", earth, prevscore2);
            chooseSlot.dropdown("Earth Move Slot #3", earth, prevscore3);
            chooseSlot.dropdown("Earth Move Slot #4", earth, prevscore4);
        } else if (source.hasTag('water')) {
            chooseSlot.title("Slot Choice Menu: Water");
            chooseSlot.dropdown("Water Move Slot #1", water, prevscore1);
            chooseSlot.dropdown("Water Move Slot #2", water, prevscore2);
            chooseSlot.dropdown("Water Move Slot #3", water, prevscore3);
            chooseSlot.dropdown("Water Move Slot #4", water, prevscore4);
        } else if (source.hasTag('fire')) {
            chooseSlot.title("Slot Choice Menu: Fire");
            chooseSlot.dropdown("Fire Move Slot #1", fire, prevscore1);
            chooseSlot.dropdown("Fire Move Slot #2", fire, prevscore2);
            chooseSlot.dropdown("Fire Move Slot #3", fire, prevscore3);
            chooseSlot.dropdown("Fire Move Slot #4", fire, prevscore4);
        } else if (source.hasTag('avatar')) {
            chooseSlot.title("Slot Choice Menu: Avatar");
            chooseSlot.dropdown("Avatar Move Slot #1", avatar, prevscore1);
            chooseSlot.dropdown("Avatar Move Slot #2", avatar, prevscore2);
            chooseSlot.dropdown("Avatar Move Slot #3", avatar, prevscore3);
            chooseSlot.dropdown("Avatar Move Slot #4", avatar, prevscore4);
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
        chooseStyle.button("Avatar", "textures/ui/avatar");

        let infoPage = new ActionFormData();
        infoPage.title("Info Menu");
        infoPage.body("Welcome to avatar addon! This addon can seem pretty complicated at first, but this menu show show you the basics! Clicking on any of the types below can show you how to use them, what moves they have, and how to trigger those moves!");
        infoPage.button("Air Info", "textures/ui/air");
        infoPage.button("Water Info", "textures/ui/water");
        infoPage.button("Fire Info", "textures/ui/fire");
        infoPage.button("Earth Info", "textures/ui/earth");
        infoPage.button("Avatar Info", "textures/ui/avatar");

        let mainMenu = new ActionFormData();
        mainMenu.title("Main Menu");
        mainMenu.button("Choose Bending", "textures/items/apple_golden");
        mainMenu.button("Choose Slots", "textures/items/apple");
        mainMenu.button("Info", "textures/items/book_normal");
        mainMenu.button("Settings", "textures/items/comparator");


        mainMenu.show(source).then((ActionFormResponse) => {
            const { selection } = ActionFormResponse;
            source.runCommand(`say A: ${selection}`)

            if (selection === 0) {
                chooseStyle.show(source).then((ActionFormResponse) => {
                    const { selection } = ActionFormResponse;
                    if (selection === 0 && !source.hasTag('antimagic')) {
                        source.runCommand(`function assets/reset_self`)
                        source.runCommand(`function become/air`)
                    } else if (selection === 1 && !source.hasTag('antimagic')) {
                        source.runCommand(`function assets/reset_self`)
                        source.runCommand(`function become/water`)
                    } else if (selection === 2 && !source.hasTag('antimagic')) {
                        source.runCommand(`function assets/reset_self`)
                        source.runCommand(`function become/fire`)
                    } else if (selection === 3 && !source.hasTag('antimagic')) {
                        source.runCommand(`function assets/reset_self`)
                        source.runCommand(`function become/earth`)
                    } else if (selection === 4 && !source.hasTag('antimagic')) {
                        source.runCommand(`function assets/reset_self`)
                        source.runCommand(`function become/avatar`)
                    }
                })
            } else if (selection === 1) {
                chooseSlot.show(source).then((ModalFormResponse) => {
                    const { formValues } = ModalFormResponse;
                    let [slotchoice1, slotchoice2, slotchoice3, slotchoice4] = formValues;
                    source.runCommand(`scoreboard players set @s moveslot1 ${slotchoice1}`)
                    source.runCommand(`scoreboard players set @s moveslot2 ${slotchoice2}`)
                    source.runCommand(`scoreboard players set @s moveslot3 ${slotchoice3}`)
                    source.runCommand(`scoreboard players set @s moveslot4 ${slotchoice4}`)
                })
            } else if (selection === 2) {
                infoPage.show(source).then((ActionFormResponse) => {
                    const { subSelection } = ActionFormResponse;
                    source.runCommand(`say ${subSelection}`);
                    if (subSelection === 0) {
                        source.runCommand("say air");
                    } else if (subSelection === 1) {
                        source.runCommand("say water");
                    } else if (subSelection === 2) {
                        source.runCommand("say fire");
                    } else if (subSelection === 3) {
                        source.runCommand("say earth");
                    } else if (subSelection === 4) {
                        source.runCommand("say avatar");
                    }
                })
            } else if (selection === 3) {
                settingMenu.show(source).then((ModalFormResponse) => {
                    const { formValues } = ModalFormResponse;
                    let [moveMessages, enableBending, publicStats] = formValues;
                    if (moveMessages === true) {
                        source.removeTag('chatmsgoff')
                    } else {
                        source.addTag('chatmsgoff')
                    }
                    if (enableBending === true) {
                        source.removeTag('antimagic')
                    } else {
                        source.addTag('antimagic')
                    }
                    if (publicStats === true) {
                        source.removeTag('hide_stats')
                    } else {
                        source.addTag('hide_stats')
                    }
                })
            }
        })
    }
}
