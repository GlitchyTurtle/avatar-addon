export const avatarLevelTree = {
    offTier: {
        1: {
            name: 'Fire Spread',
            type: 'move',
            desc: 'Spreads a large amount of fire directly out from the player. It\'s a surefire way to damage your opponents.',
            execute(player) {}
        },
        2: {
            name: 'Fire Spear',
            type: 'move',
            desc: 'Summons a line of fire directly out in the direction you are looking.',
            execute(player) {}
        },
        5: {
            name: 'Flame Wave',
            type: 'move',
            desc: 'Send a line of fire out in every direction to push back opponents or just deal passive damage.',
            execute(player) {}
        },
        10: {
            name: 'Pressure Punch',
            type: 'passive',
            desc: 'Make your punches stronger by using air to speed them up. Base damage is doubled, and critical hits are quadrupled.',
            execute(player) {
                player.triggerEvent('a:set_base_damage_2');
            }
        }
    },
    defTier: {
        1: {
            name: 'Durability Training',
            type: 'passive',
            desc: 'Your durability as an airbender is not great compared to the other elements, but by focusing, you can maintain breathing that helps your body resist more damage. Gain a permanent 5 extra hearts!',
            execute(player) {
                player.triggerEvent('a:set_health_15');
            }
        },
        2: {
            name: 'Lightning Redirection',
            type: 'passive',
            desc: 'If you crouch at the right time while another player is using lightning related moves, you can negate all damage and redirect the lightning bolt onto all nearby foes.',
            execute(player) {}
        },
        5: {
            name: 'Disarming Presence',
            type: 'passive',
            desc: 'Your dedication to peace has payed off, and you can stop fights without killing. Enemies have a very small chance to drop their weapon when hit with your bare fist.',
            execute(player) {}
        },
        10: {
            name: 'Wind Master',
            type: 'passive',
            desc: 'You are able to maintain your balance even in the most challenging of situations, allowing you to avoid being knocked off your feet ever. Moves will still do damage, but all effects of knockback are negated.',
            execute(player) {
                player.addTag('permKbSafe');
            }
        }
    },
    utiTier: {
        1: {
            name: 'Peaceful Presence',
            type: 'passive',
            desc: 'Your calm spirit makes normally hostile mobs calm. They will not attack you.',
            execute(player) {
                player.triggerEvent('a:no_mob_agro');
            }
        },
        2: {
            name: 'Light-footed',
            type: 'passive',
            desc: 'Because you can use air to cushion your steps, your vibrations and sounds are reduced significantly. Unless you step on a skulk sensor, you won\'t trigger it.',
            execute(player) {
                player.triggerEvent('a:set_trigger_skulk_off');
            }
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
            name: 'Twinkle Toes',
            type: 'passive',
            desc: 'Your feet are immune to worldly damage, allowing you to walk safely on magma blocks and through berry vines without taking damage.',
            execute(player) {
                player.triggerEvent('a:set_contact_damage_off');
            }
        },
        2: {
            name: 'Sky\'s Grace',
            type: 'passive',
            desc: 'You move with the fluidity of the sky, allowing you to dodge and evade with ease. Speed and jump boost bonus!',
            execute(player) {}
        },
        5: { 
            name: 'Air Cushion',
            type: 'passive',
            desc: 'You can press down with air right before you hit the ground, so falling is no longer fatal. All fall damage is negated.',
            execute(player) {
                player.triggerEvent('a:set_fall_damage_off');
            }
        },
        10: { 
            name: 'Aerial Ascent',
            type: 'passive',
            desc: 'You gain the ability to double jump, allowing you to jump twice as high as before!',
            execute(player) {}
        }
    }
};