export const waterLevelTree = {
    offTier: {
        1: {
            name: "Water Conduit",
            type: "passive",
            desc: "When in water, get the power of a guardian conduit, which allows you to see farther, break blocks faster, and deal more damage.",
            execute(player) {}
        },
        2: {
            name: "Frost Breath",
            type: "move",
            desc: "Breath ice cold air that freezes nearby opponents for a few seconds, however, they can still take damage. Are they about to mlg? You can stop that.",
            execute(player) {}
        },
        5: {
            name: "Hydrated Shockwave",
            type: "move",
            desc: "Blast out a powerful wave of water that consumes all the water you have, with the damage and range scaling the more water you had.",
            execute(player) {}
        },
        10: {
            name: "Icy Punch",
            type: "passive",
            desc: "Make your punches stronger by using water to speed them up and freeze the impact zone. Base damage is doubled, and critical hits are quadrupled.",
            execute(player) {
                player.triggerEvent("a:set_base_damage_2");
            }
        }
    },
    defTier: {
        1: {
            name: "Durability Training",
            type: "passive",
            desc: "Waterbenders are versatile, and by training to take damage, you can become stronger! Gain a permanent 5 extra hearts!",
            execute(player) {
                player.triggerEvent("a:set_health_15");
            }
        },
        2: {
            name: "Squid Shield",
            type: "move",
            desc: "When hit and underwater, you'll emit ink into the water and turn invisible for a second. It might not be enough time to escape, but it certainly makes it harder for an enemy to track you down.",
            execute(player) {}
        },
        5: {
            name: "Steel Submarine",
            type: "passive",
            desc: "While being seated inside a boat, gain a level of resistance to incoming attacks. Useful for battling in water.",
            execute(player) {}
        },
        10: {
            name: "Waterwash",
            type: "passive",
            desc: "If you have water in your circle, you will take a reduced amount of fall damage, and some of it will be consumed.",
            execute(player) {
                player.triggerEvent("a:set_special_fall_damage");
            }
        }
    },
    utiTier: {
        1: {
            name: "Fire Extinguisher",
            type: "passive",
            desc: "Walking into fire will put out nearby fire if you have water loaded, and effect you with fire resistance for a few seconds.",
            execute(player) {}
        },
        2: {
            name: "Water Absorption",
            type: "passive",
            desc: "When in water, you feel less hungry. Whilst in or near water, you will never lose saturation.",
            execute(player) {}
        },
        5: {
            name: "Moisture Drain",
            type: "passive",
            desc: "This ability will allow you to quickly convert grass and leaves to water. To use, punch the block you want to absorb water from.",
            execute(player) {}
        },
        10: {
            name: "Lunar Energy",
            type: "move",
            desc: "During full moons, your bending and physicality are buffed immensely.",
            execute(player) {}
        }
    },
    mobTier: {
        1: {
            name: "Icy Aura",
            type: "passive",
            desc: "Your feet are immune to heat, allowing you to walk safely on magma blocks without taking damage.",
            execute(player) {
                player.triggerEvent("a:set_contact_damage_off");
            }
        },
        2: {
            name: "Water Grapple",
            type: "move",
            desc: "You move with the fluidity of the sky, allowing you to dodge and evade with ease. Speed and jump boost bonus!",
            execute(player) {}
        },
        5: { 
            name: "Water Jet Rush",
            type: "passive",
            desc: "After running for a certain amount of time with water equipped in your circle, it will move behind you and boost your speed greatly.",
            execute(player) {}
        },
        10: { 
            name: "Water Grapple Plus",
            type: "move",
            desc: "Increase the range of Water Grapple and allows you to grapple onto entities as well as blocks.",
            execute(player) {}
        }
    }
};