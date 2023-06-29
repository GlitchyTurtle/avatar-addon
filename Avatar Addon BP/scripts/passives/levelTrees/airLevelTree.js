export const airLevelTree = {
    offTier: {
        1: {
            name: 'Air Finder',
            type: 'move',
            desc: 'Unlocks a new move called Air Finder. Shoots a blast of air that locks on to the closest entity and shows their location. It doesn\'t do damage, but it looks scary!',
            execute(player) {}
        },
        2: {
            name: 'Air Pulse',
            type: 'move',
            desc: 'Unlocks a new move called Air Pulse. Explodes a small shockwave of air a few blocks in front of you that does damage.',
            execute(player) {}
        },
        5: {
            name: 'Sniper Shot',
            type: 'move',
            desc: 'Unlocks a new move called Sniper Shot. It only does damage for perfect aim and far range, but it does 4 times the damage!',
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
            name: 'Purifying Breath',
            type: 'move',
            desc: 'Unlocks a new move, Purifying Breath. By harnessing the power of air, you can rid yourself of harmful substances and maintain your physical health and well-being: wither, blindness, and posion.',
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
            name: 'Onion & Banana Juice',
            type: 'passive',
            desc: 'You have ascended to a higher plane of existence, where troubles such as hunger can no longer bother you. Your hunger will never decrease, only stay at it\'s current level.',
            execute(player) {
                player.triggerEvent('a:no_hunger');
            }
        },
        10: {
            name: 'Sensory Breath',
            type: 'move',
            desc: 'Displays the basic stats of all players in a 100 block radius, but also lets them know that you checked them.',
            execute(player) {}
        },
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