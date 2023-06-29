export const earthLevelTree = {
    offTier: {
        1: {
            name: "Earth Rend",
            type: "passive",
            desc: "Create a fissure in the earth in front of your feet to trap opponents underground.",
            execute(player) {}
        },
        2: {
            name: "Solid Punch",
            type: "passive",
            desc: "Make your punches stronger by using earth. Base damage is doubled, and critical hits are quadrupled.",
            execute(player) {
                player.triggerEvent("a:set_base_damage_2");
            }
        },
        5: {
            name: "Earth Pound",
            type: "passive",
            desc: "When hitting the ground, you will take a reduced amount of fall damage and transfer it into a powerfull shockwave! ",
            execute(player) {
                player.triggerEvent("a:set_special_fall_damage");
            }
        },
        10: {
            name: "Earth Spike Wave",
            type: "move",
            desc: "Send a shockwave of spikes out in every direction to push back opponents or just deal heavy damage.",
            execute(player) {}
        }
    },
    defTier: {
        1: {
            name: "Toph Armor",
            type: "passive",
            desc: "Earthbenders are solid. By mastering neutral jing, you can be almost invincible. Gain a permanent 10 extra hearts!",
            execute(player) {
                player.triggerEvent("a:set_health_20");
            }
        },
        2: {
            name: "Solid Skin",
            type: "move",
            desc: "Gain a passive level of bending resistance that reduces specific bending damage by up to 30%.",
            execute(player) {}
        },
        5: {
            name: "Topher Armor",
            type: "passive",
            desc: "Somehow, you didn't have enough health already? Gain a permanent extra 5 hearts, bringing the total up to 25!",
            execute(player) {
                player.triggerEvent("a:set_health_25");
            }
        },
        10: {
            name: "",
            type: "passive",
            desc: "",
            execute(player) {}
        }
    },
    utiTier: {
        1: {
            name: "Mining Dreams",
            type: "passive",
            desc: "When mining certain ores like iron or copper, receive bonus ore, or even mine without needing a pickaxe.",
            execute(player) {}
        },
        2: {
            name: "Iron Affinity",
            type: "passive",
            desc: "When breaking iron blocks, gain strength and saturation. This ability gets stronger if you unlock metal as a sub-bending ability.",
            execute(player) {}
        },
        5: {
            name: "Lava Affinity",
            type: "passive",
            desc: "You can smelt items in your hand just by right clicking! This ability gets stronger if you unlock lava as a sub-bending ability.",
            execute(player) {}
        },
        10: {
            name: "Seismic Sense",
            type: "move",
            desc: "Displays the basic stats of all players in a 150 block radius along with their location, and if they are sneaking or not.",
            execute(player) {}
        }
    },
    mobTier: {
        1: {
            name: "Nature Affinity",
            type: "passive",
            desc: "You are in tune with the natural world, allowing you to walk safely through magma blocks, berry bushes and cacti without taking damage.",
            execute(player) {
                player.triggerEvent("a:set_contact_damage_off");
            }
        },
        2: {
            name: "Solid Strength",
            type: "move",
            desc: "Because you have so much training punching earth, you can punch and break anything just a bit faster.",
            execute(player) {}
        },
        5: { 
            name: "Earth Sprint",
            type: "passive",
            desc: "If you sprint on earth bendable blocks long enough, you will gain a level of speed by pushing the dirt underneath your feet with bending.",
            execute(player) {}
        },
        10: { 
            name: "Earth Pushoff",
            type: "move",
            desc: "Jump higher by manipulating the earth beneath your feet. Gain a permanent level of Jump Boost.",
            execute(player) {}
        }
    }
};