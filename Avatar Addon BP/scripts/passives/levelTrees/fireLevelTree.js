export const fireLevelTree = {
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
            name: 'Flaming Fists',
            type: 'passive',
            desc: 'Make your punches stronger by using fire to burn on impact. Base damage is doubled, and critical hits are quadrupled.',
            execute(player) {
                player.triggerEvent('a:set_base_damage_2');
            }
        }
    },
    defTier: {
        1: {
            name: 'Durability Training',
            type: 'passive',
            desc: 'To make up for your lack of defensive moves, you trained until you never felt any pain. Gain a permanent 5 extra hearts!',
            execute(player) {
                player.triggerEvent('a:set_health_15');
            }
        },
        2: {
            name: 'Fire Redirection',
            type: 'move',
            desc: 'If you sneak and punch while moving your cursor down at the right moment, you can redirect incoming firebending attacks.',
            execute(player) {}
        },
        5: {
            name: 'Boiling Blood',
            type: 'passive',
            desc: 'Your firebending runs through your blood, and can boil out any negative effects you receive.',
            execute(player) {}
        },
        10: {
            name: 'Lightning Redirection',
            type: 'passive',
            desc: 'If you crouch at the right time while another player is using lightning related moves, you can negate all damage and redirect the lightning bolt onto all nearby foes.',
            execute(player) {}
        }
    },
    utiTier: {
        1: {
            name: 'Sunny Disposition',
            type: 'passive',
            desc: 'Being in high heats like the nether gives a huge status boost, making you almost unkillable!',
            execute(player) {}
        },
        2: {
            name: 'Engulf',
            type: 'passive',
            desc: 'Right clicking or long pressing swords will enchant them automatically with Fire Aspect I or Fire Aspect II depending on the blade.', 
            execute(player) {}
        },
        5: {
            name: 'Hot-Handed',
            type: 'passive',
            desc: 'You can smelt items in your hand just by right clicking! Raw Iron, Raw Beef, or any other furnace-able material!',
            execute(player) {}
        },
        10: {
            name: 'Firey Disposition',
            type: 'passive',
            desc: 'Gain resistance to fire, lava, and anything that could have burned you before. Go swimming in the nether lakes!',
            execute(player) {}
        },
    },
    mobTier: {
        1: {
            name: 'Hot-Footed',
            type: 'passive',
            desc: 'Your feet are immune to heat, allowing you to walk safely on magma blocks without crouching!',
            execute(player) {
                player.triggerEvent('a:set_contact_damage_off');
            }
        },
        2: {
            name: 'Best Bargainer',
            type: 'passive',
            desc: 'Firebenders are known to be charismatic, and are notoriously good hagglers. Gain a passive level of village hero.',
            execute(player) {}
        },
        5: { 
            name: 'Fast-Footed',
            type: 'passive',
            desc: 'Gain a passive level of speed that makes travelling so much easier.',
            execute(player) {}
        },
        10: { 
            name: 'Fast-Handed',
            type: 'passive',
            desc: 'Gain a passive level of haste that makes mining so much easier and faster.',
            execute(player) {}
        }
    }
};