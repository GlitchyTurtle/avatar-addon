import { ActionFormData } from "@minecraft/server-ui";
import { showWarning, getScore, getBendingStyle, setScore, playSound } from "./../util.js";

import { SkillTreeData } from "./../extensions/forms";

const addPrefixToArray = (array, prefix) => array.map(s => prefix + s);

const carriedOver = {
    "Chi Infusion": {
        title: "Chi Infusion",
        description: [
            'Channel your inner life force, \nchi, to boost your overall vitality!',
            '§r§8§oPassive regeneration effect'
        ],
        icon: "textures/ui/avatar/skill_tree/health",
        index: 0,
        unlocked: true,
        children: {
            "Chi Infusion+": {
                title: "Chi Infusion+",
                description: [
                    'Masterfully channel your chi to \nboost your base vitality tenfold!',
                    '§r§8§o+5 Base Health'
                ],
                icon: "textures/ui/avatar/skill_tree/health_plus",
                index: 9,
                unlocked: true,
                children: {}
            }
        }
    },
    "Bending Resistance": {
        title: "Bending Resistance",
        description: [
            'By training your bending against \nothers, you seem to build a \nnatural resistance to it.',
            '§r§8§o1.5x Bending Resistance'
        ],
        icon: "textures/ui/avatar/skill_tree/bending_resistance",
        index: 22,
        unlocked: true,
        children: {
            "Bending Resistance+": {
                title: "Bending Resistance+",
                description: [
                    'By focusing , your natural \nresistance to bending \nincreases.',
                    '§r§8§o2x Bending Resistance'
                ],
                icon: "textures/ui/avatar/skill_tree/bending_resistance_plus",
                index: 40,
                unlocked: true,
                children: {
                    "Bending Resistance++": {
                        title: "Bending Resistance++",
                        description: [
                            'By channeling your chi, \nyou can negate damage low \nchip damage under 1 heart!',
                            '§r§8§oRegenerative 2 Heart \nBending Shield'
                        ],
                        icon: "textures/ui/avatar/skill_tree/bending_resistance_plus_plus",
                        index: 58,
                        unlocked: true,
                        children: {}
                    }
                }
            }
        }
    },
    "Warrior's Spirit": {
        title: "Warrior's Spirit",
        description: [
            'Channeling the indomitable spirit \nof a true warrior, you can attack \njust that much more powerfully.',
            '§r§8§o2x Base Damage'
        ],
        icon: "textures/ui/avatar/skill_tree/damage",
        index: 8,
        unlocked: true,
        children: {
            "Warrior's Spirit+": {
                title: "Warrior's Spirit+",
                description: [
                    'See opponents weak points, and \ntarget them like a chi-blocker!',
                    '§r§8§o3x Base Damage'
                ],
                icon: "textures/ui/avatar/skill_tree/damage_plus",
                index: 17,
                unlocked: true,
                children: {}
            }
        }
    },
}

const skillTrees = {
    "Air": {
        title: "Core",
        description: ['The essence of your spirit, \nyour chi is centered here.'],
        icon: "textures/ui/avatar/skill_tree/core",
        index: 4,
        unlocked: true,
        children: {
            "Chi Infusion" : carriedOver["Chi Infusion"],
            "Bending Resistance" : carriedOver["Bending Resistance"],
            "Warrior's Spirit" : carriedOver["Warrior's Spirit"],
            "Twinkle Toes": {
                title: "Twinkle Toes",
                description: [
                    'Your steps are so light they don\'t \nmake any sound, and you can \nperfectly step across blocks \nthat normally damage you!',
                    '§r§8§oSkulk Sensors won\'t notice you, \nand you can move through berry \nbushes and magma blocks.'
                ],
                icon: "textures/ui/avatar/skill_tree/light_footed",
                index: 12,
                unlocked: true,
                children: {
                    "Sky's Grace": {
                        title: "Sky's Grace",
                        description: [
                            'You move with the fluidity of \nthe sky, allowing you to dodge \nand evade with ease.',
                            '§r§8§oPassive Speed I and Jump \nBoost I'
                        ],
                        icon: "textures/ui/avatar/skill_tree/skys_grace",
                        index: 20,
                        unlocked: true,
                        children: {
                            "Vortex Cushion": {
                                title: "Vortex Cushion",
                                description: [
                                    'You can press down with air right \nbefore you hit the ground, \nso falling is never a concern!',
                                    '§r§8§oNo Fall Damage'
                                ],
                                icon: "textures/ui/avatar/skill_tree/cushion",
                                index: 30,
                                unlocked: true,
                                children: {}
                            },
                            "Breathing": {
                                title: "Breathing",
                                description: [
                                    'By harnessing the power of air, \nyou can sense nearby players and \ncleanse impurities from your system.',
                                    '§r§8§oNew Move: clears wither, blindness, \nand posion.',
                                    '§r§8§oNew Move: find all players in a 100 \nblock radius'
                                ],
                                icon: "textures/ui/avatar/skill_tree/purifying_breath",
                                index: 28,
                                unlocked: true,
                                children: {
                                    "Whirlwind Redirection": {
                                        title: "Whirlwind Redirection",
                                        description: [
                                            'By by understanding the natural \ncurrents of the air, you can \nredirect arrows, snowballs, and \nmost other airborn projectiles!',
                                            '§r§8§oProjectile Redirection'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/redirection",
                                        index: 38,
                                        unlocked: true,
                                        children: {
                                            "Cyclone Master": {
                                                title: "Cyclone Master",
                                                description: [
                                                    'You are able to maintain perfect \nbalance even in the most \nchallenging of situations.',
                                                    '§r§8§oNo Knockback from Bending'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/cyclone_master",
                                                index: 48,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    },
                                    "Aerial Ascent": {
                                        title: "Aerial Ascent",
                                        description: [
                                            'Bend the air beneath your \nfeet to push yourself higher! ',
                                            '§r§8§oJump in the air (Double Jump)'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/double_jump",
                                        index: 36,
                                        unlocked: true,
                                        children: {
                                            "Wind Dash": {
                                                title: "Wind Dash",
                                                description: [
                                                    'Focus a directed blast of wind \nbehind you to dash forward \nquickly!',
                                                    '§r§8§oDouble Jump + Sneak to dash \nforward'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/wind_dash",
                                                index: 45,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "Air Plume": {
                title: "Air Plume",
                description: [
                    'Get the high ground on a \npillar of air!',
                    '§r§8§oNew Move: Air Plume'
                ],
                icon: "textures/ui/avatar/skill_tree/plume",
                index: 14,
                unlocked: true,
                children: {
                    "Air Puff": {
                        title: "Air Puff",
                        description: [
                            'Blow you opponents away with \na new move that blows a \ncontinuous burst of air!',
                            '§r§8§oNew Move: Air Puff'
                        ],
                        icon: "textures/ui/avatar/skill_tree/blow",
                        index: 24,
                        unlocked: true,
                        children: {
                            "Asphyxiation": {
                                title: "Asphyxiation",
                                description: [
                                    'Use airbending to rip the air \nfrom the lungs of your opponent.',
                                    '§r§8§oNew Move: chokes nearest opponent, \ndeals suffocation damage.'
                                ],
                                icon: "textures/ui/avatar/skill_tree/suffocation",
                                index: 32,
                                unlocked: true,
                                children: {}
                            },
                            "Peaceful Presence": {
                                title: "Peaceful Presence",
                                description: [
                                    'Your dedication as a monk has \nled you here - your inner\npeace extends to those\naround you.',
                                    '§r§8§oMobs won\'t attack you'
                                ],
                                icon: "textures/ui/avatar/skill_tree/peaceful_presence",
                                index: 34,
                                unlocked: true,
                                children: {
                                    "Onion & Banana Juice": {
                                        title: "Onion & Banana Juice",
                                        description: [
                                            'You have ascended to a higher \nplane of existence, where \ntroubles such as hunger can \nno longer bother you.',
                                            '§r§8§oNo Hunger'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/onion_banana_juice",
                                        index: 42,
                                        unlocked: true,
                                        children: {
                                            "Air Spirit": {
                                                title: "Air Spirit",
                                                description: [
                                                    'Being bound to the earth is \noverrated. Cast aside your \nearthly aspirations and \nascend to the spirit plane.',
                                                    '§r§8§oNew Move: Air Spirit'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/spirit",
                                                index: 50,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    },
                                    "Disarming Presence": {
                                        title: "Disarming Presence",
                                        description: [
                                            'Your dedication to peace \nhas payed off, and you can \nstop fights without killing.',
                                            '§r§8§o5% Chance to disarm when \nstriking with empty hands.'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/disarming_presence",
                                        index: 44,
                                        unlocked: true,
                                        children: {
                                            "Stealthly Presence": {
                                                title: "Stealthly Presence",
                                                description: [
                                                    'Tapping into your natural \nairbending stealth, you can \nturn semi-invisible!',
                                                    '§r§8§oSneaking for 6 seconds will \ngrant semi-invisibility'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/stealth",
                                                index: 53,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "Earth": {
        title: "Core",
        description: ['The essence of your spirit, \nyour chi is centered here.'],
        icon: "textures/ui/avatar/skill_tree/core",
        index: 4,
        unlocked: true,
        children: {
            "Chi Infusion" : carriedOver["Chi Infusion"],
            "Bending Resistance" : carriedOver["Bending Resistance"],
            "Warrior's Spirit" : carriedOver["Warrior's Spirit"],
            "Nature Affinity": {
                title: "Nature Affinity",
                description: [
                    'You are in tune with the natural \nworld, allowing you to walk safely \nthrough magma blocks, berry bushes \nand cacti without taking damage.',
                    '§r§8§oYou can move through berry \nbushes, cacti, and magma blocks.'
                ],
                icon: "textures/ui/avatar/skill_tree/nature",
                index: 12,
                unlocked: true,
                children: {
                    "Earth Sprint": {
                        title: "Earth Sprint",
                        description: [
                            'If you sprint on earth bendable \nblocks for a few seconds, \nthe earth underneath your feet \ncan propel you forward!',
                            '§r§8§oPassive Speed II when sprinting \non earth bendable blocks'
                        ],
                        icon: "textures/ui/avatar/skill_tree/sprint",
                        index: 20,
                        unlocked: true,
                        children: {
                            "Neutral Jing": {
                                title: "Neutral Jing",
                                description: [
                                    'Every time you successfully \nblock a move your chi \nbuilds up, and can be \nreleased in your next \nattack!',
                                    '§r§8§oDamage multiplier caps at 3x'
                                ],
                                icon: "textures/ui/avatar/skill_tree/neutral",
                                index: 30,
                                unlocked: true,
                                children: {}
                            },
                            "Toph Armor": {
                                title: "Toph Armor",
                                description: [
                                    'Earthbenders are solid, \nlike, really solid.',
                                    '§r§8§o+10 Hearts to base health'
                                ],
                                icon: "textures/ui/avatar/skill_tree/wall",
                                index: 28,
                                unlocked: true,
                                children: {
                                    "Magma Fissure": {
                                        title: "Magma Fissure",
                                        description: [
                                            'Summons a line of lava directly\n out in the direction you \nare looking.',
                                            '§r§8§oNew Move: Magma Fissure'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/magma_line",
                                        index: 38,
                                        unlocked: true,
                                        children: {
                                            "Magma Floor": {
                                                title: "Magma Floor",
                                                description: [
                                                    'Floods the floor around \nyou (a circle with a radius \nof 7 blocks) with lava!',
                                                    '§r§8§oNew Move: Magma Floor'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/magma_floor",
                                                index: 48,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    },
                                    "Metal Blast": {
                                        title: "Metal Blast",
                                        description: [
                                            'Shoots a focused beam of \nmetal that does good damage \n(with no max damage cap).',
                                            '§r§8§oNew Move: Metal Blast'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/metal",
                                        index: 36,
                                        unlocked: true,
                                        children: {
                                            "Metal Hook": {
                                                title: "Metal Hook",
                                                description: [
                                                    'Grapple onto trees and \nstructures and pull \nyourself towards them at \nrapid speed!',
                                                    '§r§8§oNew Move: Metal Hook'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/hook",
                                                index: 45,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "Earth Rend": {
                title: "Earth Rend",
                description: [
                    'Rip the ground apart in front \nof you to create a ravine \nthat will fill up a few seconds \nlater to bury opponents!',
                    '§r§8§oNew Move: Rend'
                ],
                icon: "textures/ui/avatar/skill_tree/rend",
                index: 14,
                unlocked: true,
                children: {
                    "Pillar Pound": {
                        title: "Pillar Pound",
                        description: [
                            'When you hit the grass with an \nopen fist, you can create a \npillar that can launch you up \ninto the air. If you sneak and \npunch grass it will drop back \ndown.',
                            '§r§8§oPunch the ground'
                        ],
                        icon: "textures/ui/avatar/skill_tree/earth_launch",
                        index: 24,
                        unlocked: true,
                        children: {
                            "Hot-Handed": {
                                title: "Hot-Handed",
                                description: [
                                    'Since you first learned \nlavabending, you\'ve been \nable to burn stuff in \nyour hand!',
                                    '§r§8§oLong press or right click \nto smelt most items in \nyour hand.'
                                ],
                                icon: "textures/ui/avatar/skill_tree/fire",
                                index: 32,
                                unlocked: true,
                                children: {}
                            },
                            "Earth Spikes": {
                                title: "Earth Spikes",
                                description: [
                                    'Summon spikes from the earth \nwhich can be steered by \nlooking in the direction of \ntravel!',
                                    '§r§8§oNew Move: Earth Spikes'
                                ],
                                icon: "textures/ui/avatar/skill_tree/homing",
                                index: 34,
                                unlocked: true,
                                children: {
                                    "Earth Spike Wave": {
                                        title: "Earth Spike Wave",
                                        description: [
                                            'Send a shockwave of spikes out \nin every direction to push \nback opponents or just deal \nheavy damage.',
                                            '§r§8§oNew Move: Earth Spike Wave'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/spike",
                                        index: 42,
                                        unlocked: true,
                                        children: {
                                            "Seismic Sense": {
                                                title: "Seismic Sense",
                                                description: [
                                                    'Displays the basic stats of \nall players in a 150 block \nradius along with their \nlocation!',
                                                    '§r§8§oNew Move: Seismic Sense'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/seismic_sense",
                                                index: 50,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    },
                                    "Super Smash": {
                                        title: "Super Smash",
                                        description: [
                                            'Use your earthbending to cushion \nyour fall by transfering all that \nspeed and energy into a shockwave!',
                                            '§r§8§oTaking fall damage is transfered \n(90%) into shockwave damage'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/pound",
                                        index: 44,
                                        unlocked: true,
                                        children: {
                                            "Metal Bullets": {
                                                title: "Metal Bullets",
                                                description: [
                                                    'Use your metalbending to \nlaunch iron nuggets like \nbullets and even change \ntheir trajectory midair!',
                                                    '§r§8§oLong press or right click \nto launch iron nuggets \nin your hand.'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/healing",
                                                index: 53,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "Fire": {
        title: "Core",
        description: ['The essence of your spirit, \nyour chi is centered here.'],
        icon: "textures/ui/avatar/skill_tree/core",
        index: 4,
        unlocked: true,
        children: {
            "Chi Infusion" : carriedOver["Chi Infusion"],
            "Bending Resistance" : carriedOver["Bending Resistance"],
            "Warrior's Spirit" : carriedOver["Warrior's Spirit"],
            "Fire Spread": {
                title: "Fire Spread",
                description: [
                    'Spreads a large amount of \nfire directly out from the \nplayer. It\'s a surefire way \nto damage your opponents.',
                    '§r§8§oNew Move: Fire Spread'
                ],
                icon: "textures/ui/avatar/skill_tree/flame",
                index: 12,
                unlocked: true,
                children: {
                    "Fire Spear": {
                        title: "Fire Spear",
                        description: [
                            'Summons a line of fire directly \nout in the direction you \nare looking.',
                            '§r§8§oNew Move: Fire Spear'
                        ],
                        icon: "textures/ui/avatar/skill_tree/hook",
                        index: 20,
                        unlocked: true,
                        children: {
                            "Hot-Handed": {
                                title: "Hot-Handed",
                                description: [
                                    'You can smelt items in your \nhand just by right clicking! \nRaw Iron, Raw Beef, or any \nother furnace-able material! ',
                                    '§r§8§oLong press or right click \nto smelt most items in \nyour hand.'
                                ],
                                icon: "textures/ui/avatar/skill_tree/fire",
                                index: 30,
                                unlocked: true,
                                children: {}
                            },
                            "Hot-Blooded": {
                                title: "Hot-Blooded",
                                description: [
                                    'Your firebending runs through \nyour blood, and can boil out \nany negative effects you receive.',
                                    '§r§8§oAll negative effects (not levitation) \nare cleared'
                                ],
                                icon: "textures/ui/avatar/skill_tree/healing",
                                index: 28,
                                unlocked: true,
                                children: {
                                    "Flame Wave": {
                                        title: "Flame Wave",
                                        description: [
                                            'Send a line of fire out \nin every direction to push \nback opponents or just deal \npassive damage.',
                                            '§r§8§oNew Move: Flame Wave'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/spikes",
                                        index: 38,
                                        unlocked: true,
                                        children: {
                                            "Firey Disposition": {
                                                title: "Firey Disposition",
                                                description: [
                                                    'Gain resistance to fire, lava, \nand anything that could have \nburned you before. Go swimming \nin the nether lakes! Also, \nget huge buffs in the nether!',
                                                    '§r§8§oPassive Fire Resistance I \nand Strength, Resistance, and \nRegeneration II in the nether'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/magma_floor",
                                                index: 48,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    },
                                    "Lightning Strike": {
                                        title: "Lightning Strike",
                                        description: [
                                            'Shoot an arc of lightning \ndirectly forward, which will \nstun the first 2 entities it \ntouches for 2 seconds.',
                                            '§r§8§oNew Move: Lightning Strike'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/magma_line",
                                        index: 36,
                                        unlocked: true,
                                        children: {
                                            "Thunderclap Bolt": {
                                                title: "Thunderclap Bolt",
                                                description: [
                                                    'A powerful move meant for only \nthe firebender royal family. \nChannel all your power into \none super powerful bolt \nof lightning!',
                                                    '§r§8§oNew Move: Thunderclap Bolt'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/lightning_blast",
                                                index: 45,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "Fast-Footed": {
                title: "Fast-Footed",
                description: [
                    'Gain a passive level of speed \nthat makes travelling so \nmuch easier.',
                    '§r§8§oPassive Speed I and Jump \nBoost I'
                ],
                icon: "textures/ui/avatar/skill_tree/plume",
                index: 14,
                unlocked: true,
                children: {
                    "Engulf": {
                        title: "Engulf",
                        description: [
                            'Right clicking or long pressing \nswords will enchant them \nautomatically with Fire Aspect I \nor Fire Aspect II depending \non the blade.',
                            '§r§8§oRight click or long press \nto enchant swords with \nFire Aspect'
                        ],
                        icon: "textures/ui/avatar/skill_tree/enchant",
                        index: 24,
                        unlocked: true,
                        children: {
                            "Dragon of the West": {
                                title: "Dragon of the West",
                                description: [
                                    'a',
                                    '§r§8§oNew Move: Dragon of the West'
                                ],
                                icon: "textures/ui/avatar/skill_tree/blow",
                                index: 32,
                                unlocked: true,
                                children: {}
                            },
                            "Best Bargainer": {
                                title: "Best Bargainer",
                                description: [
                                    'Firebenders are known to \nbe charismatic, and are \nnotoriously good hagglers!',
                                    '§r§8§oPassive level of Hero of \nthe Village II'
                                ],
                                icon: "textures/ui/avatar/skill_tree/emerald",
                                index: 34,
                                unlocked: true,
                                children: {
                                    "Concussive Pop": {
                                        title: "Concussive Pop",
                                        description: [
                                            'Shoot enemies away with a \nsmall explosion or yourself \nup into the air!',
                                            '§r§8§oNew Move: Concussive Pop'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/pop",
                                        index: 42,
                                        unlocked: true,
                                        children: {
                                            "Combustion Blast": {
                                                title: "Combustion Blast",
                                                description: [
                                                    'Shoots out a beam that \nexplodes when it hits either \nplayers or blocks!',
                                                    '§r§8§oNew Move: Combustion Blast'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/combustion",
                                                index: 50,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    },
                                    "Lightning Burst": {
                                        title: "Lightning Burst",
                                        description: [
                                            'Shoot a shotgun style blast of \nlightning good for close \nencounters and movement!',
                                            '§r§8§oNew Move: Lightning Burst'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/lightning_burst",
                                        index: 44,
                                        unlocked: true,
                                        children: {
                                            "Lightning Discharge": {
                                                title: "Lightning Discharge",
                                                description: [
                                                    'Charge and release a shockwave sphere \nof lightning on multiple enemies in \na radius of up to 8 blocks out!',
                                                    '§r§8§oNew Move: Lightning Discharge'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/aura",
                                                index: 53,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "Water": {
        title: "Core",
        description: ['The essence of your spirit, \nyour chi is centered here.'],
        icon: "textures/ui/avatar/skill_tree/core",
        index: 4,
        unlocked: true,
        children: {
            "Chi Infusion" : carriedOver["Chi Infusion"],
            "Bending Resistance" : carriedOver["Bending Resistance"],
            "Warrior's Spirit" : carriedOver["Warrior's Spirit"],
            "Water Jet Rush": {
                title: "Water Jet Rush",
                description: [
                    'After running for a certain amount \nof time with water equipped in \nyour circle, it will move behind \nyou and boost your speed greatly',
                    '§r§8§oRunning for 5 seconds will trigger \na boost'
                ],
                icon: "textures/ui/avatar/skill_tree/sprint",
                index: 12,
                unlocked: true,
                children: {
                    "Fire Extinguisher": {
                        title: "Fire Extinguisher",
                        description: [
                            'Walking into fire will put out \nnearby fire if you have water \nloaded, and effect you with \nfire resistance for a few \nseconds.',
                            '§r§8§oNew Passive: Fire Extinguisher'
                        ],
                        icon: "textures/ui/avatar/skill_tree/magma_floor",
                        index: 20,
                        unlocked: true,
                        children: {
                            "Waterwash": {
                                title: "Waterwash",
                                description: [
                                    'If you have water in your \ncircle, you will take a reduced \namount of fall damage, and \nsome of it will be consumed.',
                                    '§r§8§oTake reduced fall damage with \nwater'
                                ],
                                icon: "textures/ui/avatar/skill_tree/seismic_sense",
                                index: 30,
                                unlocked: true,
                                children: {}
                            },
                            "Squid Shield": {
                                title: "Squid Shield",
                                description: [
                                    'When hit and underwater, you\'ll \nemit ink into the water and \nturn invisible for a second. \nIt might not be enough time to \nescape, but it certainly makes \nit harder for an enemy \nto track you down.',
                                    '§r§8§oWhen hit underwater, you\ll emit \nink and turn invisible'
                                ],
                                icon: "textures/ui/avatar/skill_tree/squid",
                                index: 28,
                                unlocked: true,
                                children: {
                                    "Water Vortex": {
                                        title: "Water Vortex",
                                        description: [
                                            'Send a line of fire out \nin every direction to push \nback opponents or just deal \npassive damage.',
                                            '§r§8§oNew Move: Water Vortex'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/plume",
                                        index: 38,
                                        unlocked: true,
                                        children: {
                                            "Icy Aura": {
                                                title: "Icy Aura",
                                                description: [
                                                    'Your feet are immune to heat, \nallowing you to walk safely on \nmagma blocks without \ntaking damage.',
                                                    '§r§8§oMagma block immunity'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/magma_floor",
                                                index: 48,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    },
                                    "Healing Focus": {
                                        title: "Healing Focus",
                                        description: [
                                            'Heal just yourself, quickly \nwhenever you want in \ncombat.',
                                            '§r§8§oNew Move: Healing Focus'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/skys_grace",
                                        index: 36,
                                        unlocked: true,
                                        children: {
                                            "Healing Cloud": {
                                                title: "Healing Cloud",
                                                description: [
                                                    'Bend the water vapor \nin the air to heal \neverything around you.',
                                                    '§r§8§oNew Move: Healing Cloud'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/aura",
                                                index: 45,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "Water Conduit": {
                title: "Water Conduit",
                description: [
                    'When in water, get the power of a \nguardian conduit, which allows \nyou to see farther, break blocks \nfaster, and deal more damage.',
                    '§r§8§oGain Water Conduit II'
                ],
                icon: "textures/ui/avatar/skill_tree/plume",
                index: 14,
                unlocked: true,
                children: {
                    "Hydrated Shockwave": {
                        title: "Hydrated Shockwave",
                        description: [
                            'Blast out a powerful wave of water \nthat consumes all the water you have, \nwith the damage and range scaling \nthe more water you had.',
                            '§r§8§oNew Move: Hydrated Shockwave'
                        ],
                        icon: "textures/ui/avatar/skill_tree/magma_floor",
                        index: 24,
                        unlocked: true,
                        children: {
                            "Frost Breath": {
                                title: "Frost Breath",
                                description: [
                                    'Breath ice cold air that \nfreezes nearby opponents \nfor a few seconds. However, \nthey can still take damage. \nAre they about to mlg? \nYou can stop that.',
                                    '§r§8§oNew Move: Frost Breath'
                                ],
                                icon: "textures/ui/avatar/skill_tree/blow",
                                index: 32,
                                unlocked: true,
                                children: {}
                            },
                            "Vine Grapple": {
                                title: "Vine Grapple",
                                description: [
                                    'Use your vines to grapple \nonto nearby blocks and pull \nyourself toward them!',
                                    '§r§8§oNew Move: Vine Grapple'
                                ],
                                icon: "textures/ui/avatar/skill_tree/hook",
                                index: 34,
                                unlocked: true,
                                children: {
                                    "Moisture Drain": {
                                        title: "Moisture Drain",
                                        description: [
                                            'Pull the water out of grass \nand leaves. To use, punch \nthe block you want to \nabsorb water from.',
                                            '§r§8§oPunch grass to drain \nit and get water'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/pound",
                                        index: 42,
                                        unlocked: true,
                                        children: {
                                            "Blood Bending": {
                                                title: "Blood Bending",
                                                description: [
                                                    'During full moons, when your \nbending is at it\'s peak, \nyou can bend the blood \ninside others...',
                                                    '§r§8§oNew Move: Blood Bending'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/lunar",
                                                index: 50,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    },
                                    "Vine Hook": {
                                        title: "Vine Hook",
                                        description: [
                                            'Grab and drag nearby enemies \ntoward you with vines that \ndeal thorn damage!',
                                            '§r§8§oNew Move: Vine Hook'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/vine_hook",
                                        index: 44,
                                        unlocked: true,
                                        children: {
                                            "Plant Snare": {
                                                title: "Plant Snare",
                                                description: [
                                                    'Slow and posion your enemies in \na 15 block radius by trapping \nthem with vines that damage \nand prevent movement!',
                                                    '§r§8§oNew Move: Plant Snare'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/snare",
                                                index: 53,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "Avatar": {
        title: "Core",
        description: ['The essence of your spirit, \nyour chi is centered here.'],
        icon: "textures/ui/avatar/skill_tree/core",
        index: 4,
        unlocked: true,
        children: {
            "Chi Infusion" : carriedOver["Chi Infusion"],
            "Bending Resistance" : carriedOver["Bending Resistance"],
            "Warrior's Spirit" : carriedOver["Warrior's Spirit"],
            "Twinkle Toes": {
                title: "Twinkle Toes",
                description: [
                    'Your steps are so light they don\'t \nmake any sound, and you can \nperfectly step across blocks \nthat normally damage you!',
                    '§r§8§oSkulk Sensors won\'t notice you, \nand you can move through berry \nbushes and magma blocks.'
                ],
                icon: "textures/ui/avatar/skill_tree/light_footed",
                index: 12,
                unlocked: true,
                children: {
                    "Sky's Grace": {
                        title: "Sky's Grace",
                        description: [
                            'You move with the fluidity of \nthe sky, allowing you to dodge \nand evade with ease.',
                            '§r§8§oPassive Speed I and Jump \nBoost I'
                        ],
                        icon: "textures/ui/avatar/skill_tree/skys_grace",
                        index: 20,
                        unlocked: true,
                        children: {
                            "Neutral Jing": {
                                title: "Neutral Jing",
                                description: [
                                    'Every time you successfully \nblock a move your chi \nbuilds up, and can be \nreleased in your next \nattack!',
                                    '§r§8§oDamage multiplier caps at 3x'
                                ],
                                icon: "textures/ui/avatar/skill_tree/neutral",
                                index: 30,
                                unlocked: true,
                                children: {}
                            },
                            "Breathing": {
                                title: "Breathing",
                                description: [
                                    'By harnessing the power of air, \nyou can sense nearby players and \ncleanse impurities from your system.',
                                    '§r§8§oNew Move: clears wither, blindness, \nand posion.',
                                    '§r§8§oNew Move: find all players in a 100 \nblock radius'
                                ],
                                icon: "textures/ui/avatar/skill_tree/purifying_breath",
                                index: 28,
                                unlocked: true,
                                children: {
                                    "Lightning Strike": {
                                        title: "Lightning Strike",
                                        description: [
                                            'Shoot an arc of lightning \ndirectly forward, which will \nstun the first 2 entities it \ntouches for 2 seconds.',
                                            '§r§8§oNew Move: Lightning Strike'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/magma_line",
                                        index: 38,
                                        unlocked: true,
                                        children: {
                                            "Thunderclap Bolt": {
                                                title: "Thunderclap Bolt",
                                                description: [
                                                    'A powerful move meant for only \nthe firebender royal family. \nChannel all your power into \none super powerful bolt \nof lightning!',
                                                    '§r§8§oNew Move: Thunderclap Bolt'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/lightning_blast",
                                                index: 48,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    },
                                    "Metal Blast": {
                                        title: "Metal Blast",
                                        description: [
                                            'Shoots a focused beam of \nmetal that does good damage \n(with no max damage cap).',
                                            '§r§8§oNew Move: Metal Blast'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/metal",
                                        index: 36,
                                        unlocked: true,
                                        children: {
                                            "Metal Hook": {
                                                title: "Metal Hook",
                                                description: [
                                                    'Grapple onto trees and \nstructures and pull \nyourself towards them at \nrapid speed!',
                                                    '§r§8§oNew Move: Metal Hook'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/hook",
                                                index: 45,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "Air Plume": {
                title: "Air Plume",
                description: [
                    'Get the high ground on a \npillar of air!',
                    '§r§8§oNew Move: Air Plume'
                ],
                icon: "textures/ui/avatar/skill_tree/plume",
                index: 14,
                unlocked: true,
                children: {
                    "Dragon of the West": {
                        title: "Dragon of the West",
                        description: [
                            'a',
                            '§r§8§oNew Move: Dragon of the West'
                        ],
                        icon: "textures/ui/avatar/skill_tree/blow",
                        index: 24,
                        unlocked: true,
                        children: {
                            "Combustion Blast": {
                                title: "Combustion Blast",
                                description: [
                                    'Shoots out a beam that \nexplodes when it hits either \nplayers or blocks!',
                                    '§r§8§oNew Move: Combustion Blast'
                                ],
                                icon: "textures/ui/avatar/skill_tree/combustion",
                                index: 32,
                                unlocked: true,
                                children: {}
                            },
                            "Peaceful Presence": {
                                title: "Peaceful Presence",
                                description: [
                                    'Your dedication as a monk has \nled you here - your inner\npeace extends to those\naround you.',
                                    '§r§8§oMobs won\'t attack you'
                                ],
                                icon: "textures/ui/avatar/skill_tree/peaceful_presence",
                                index: 34,
                                unlocked: true,
                                children: {
                                    "Vine Hook": {
                                        title: "Vine Hook",
                                        description: [
                                            'Grab and drag nearby enemies \ntoward you with vines that \ndeal thorn damage!',
                                            '§r§8§oNew Move: Vine Hook'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/vine_hook",
                                        index: 42,
                                        unlocked: true,
                                        children: {
                                            "Plant Snare": {
                                                title: "Plant Snare",
                                                description: [
                                                    'Slow and posion your enemies in \na 15 block radius by trapping \nthem with vines that damage \nand prevent movement!',
                                                    '§r§8§oNew Move: Plant Snare'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/snare",
                                                index: 50,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    },
                                    "Disarming Presence": {
                                        title: "Disarming Presence",
                                        description: [
                                            'Your dedication to peace \nhas payed off, and you can \nstop fights without killing.',
                                            '§r§8§o5% Chance to disarm when \nstriking with empty hands.'
                                        ],
                                        icon: "textures/ui/avatar/skill_tree/disarming_presence",
                                        index: 44,
                                        unlocked: true,
                                        children: {
                                            "Spirit": {
                                                title: "Spirit",
                                                description: [
                                                    'Being bound to the earth is \noverrated. Cast aside your \nearthly aspirations and \nascend to the spirit plane.',
                                                    '§r§8§oNew Move: Air Spirit'
                                                ],
                                                icon: "textures/ui/avatar/skill_tree/spirit",
                                                index: 53,
                                                unlocked: true,
                                                children: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
}

function saveSkillTree(boolArray) {
    let result = 0;

    for (let i = 0; i < boolArray.length; i++) {
        if (boolArray[i]) {
            result |= (1 << i);
        }
    }

    return result;
}
  
function loadSkillTree(number) {
    let boolArray = [];

    for (let i = 0; i < 24; i++) {
        boolArray.push((number & (1 << i)) !== 0);
    }

    return boolArray;
}

function traverseTree(node, buttonArray) {
    buttonArray.push([
        node.index,
        node.title,
        node.description,
        node.icon
    ]);

    if (Object.keys(node.children).length == 0) return;
    
    for (const childKey in node.children) {
        if (node.children.hasOwnProperty(childKey)) {
            traverseTree(node.children[childKey], buttonArray);
        }
    }
}

function findNodeAndParentByIndex(node, index, parent = null) {
    if (node.index === index) {
        return {
            node: node,
            parent: parent
        };
    }

    if (Object.keys(node.children).length === 0) {
        return null;
    }

    for (const childKey in node.children) {
        const foundNode = findNodeAndParentByIndex(node.children[childKey], index, node);
        if (foundNode) {
            return foundNode;
        }
    }

    return null;
}

function previouslyUnlockedSibling(parent, index, allowList) {
    for (const childKey in parent.children) {
        const childIndex = parent.children[childKey].index;
        if (childIndex != index && allowList[childIndex].isLocked == true) {
            return true;
        }
    }
    return false;
}

export function playerHasSkill(player, skillName) {
    const styleTree = skillTrees[getBendingStyle(player)];

    const skillList = []; 
    traverseTree(styleTree, skillList);

    let skillIndex = null;
    for (let i = 0; i < skillList.length; i++) {
        const skillObj = skillList[i];
        if (skillObj[1].includes(skillName)) {
            skillIndex = i;
            break;
        }
    }

    if (!skillIndex) {
        return;
    }
    
    let skillTreeEv = getScore("skill_tree", player);
    if (!skillTreeEv ||  !parseInt(skillTreeEv) || skillTreeEv <= 0) {
        console.warn(`Encountered a minor error when trying to check if ${player.name} has the ${skillName} skill!`);
        setScore(player, "skill_tree", 1, false);
        skillTreeEv = 1;
    }

    const isLockedOrder = loadSkillTree(skillTreeEv);

    return isLockedOrder[skillIndex];
}

export function skillTreeMenu(source, errorMsg = undefined) {
    const form = new SkillTreeData()

    form.title('§rSkill Tree')

    const points = getScore("skill_points", source);
    form.body(` ${points}`)

    if (errorMsg) {
        form.body(errorMsg)
    }

    // Load the buttons from the filled-in skill tree
    const buttonArray = [];
    const styleTree = skillTrees[getBendingStyle(source)];
    traverseTree(styleTree, buttonArray);

    let skillTreeEv = getScore("skill_tree", source);
    if (!skillTreeEv ||  !parseInt(skillTreeEv) || skillTreeEv <= 0) {
        console.warn(`Encountered a minor error when parsing ${source.name}'s skill tree score!`);
        setScore(source, "skill_tree", 1, false);
        skillTreeEv = 1;
    }

    const refAllowedList = {};
    const isLockedOrder = loadSkillTree(skillTreeEv);
    for (let i = 0; i < buttonArray.length; i++) {
        const btn = buttonArray[i];
        const btnPositionIndex = btn[0];
        
        //  locked
        //  unlocked
        form.button(btnPositionIndex, "§b" + btn[1] + (isLockedOrder[i] ? " " : " "), addPrefixToArray(btn[2], "§r§7"), (btn[3] + (isLockedOrder[i] ? "" : "_locked")));
        refAllowedList[btnPositionIndex] = {
            isLocked: isLockedOrder[i],
            orignalIndex: i
        };
    }

    form.button(55, "§6How to Use", [`§r§7Click on any choice to read \nit's description and unlock it. \nIf you make a choice, the path \nyou did not choose becomes \nlocked forever!`], "textures/ui/avatar/skill_tree/info");
    form.button(61, "§6Reforge Tree", [`§r§7If you want to switch \nbuilds, you can just\nclick this button!`], "textures/ui/avatar/skill_tree/respec");

    form.show(source).then(async response => {
        const { selection } = response;
        if (selection === undefined) return source.sendMessage("§cYou exited the menu.");

        if (selection == 4) return skillTreeMenu(source);

        if (selection == 55) {
            return showWarning(source, "How to use?", `§6Choose Your Path:§r\n§7Progress outward by choosing unique skills along your path, each give you a boost in overall bending skill also.\n\n§6Commit to Mastery:§7\nBe cautious! Once you choose a branch from any node other than the start, the alternate paths from that node lock permanently. Choose wisely to specialize in specific abilities. Embrace your chosen path!\n `, skillTreeMenu);
        }

        if (selection == 61) {
            return resetSkillTree(source);
        }

        const { parent, node } = findNodeAndParentByIndex(styleTree, selection);


        source.sendMessage(parent.title);
        source.sendMessage(`${parent.index}`)

        const parentLocked = !refAllowedList[parent.index].isLocked;
        const permLocked = previouslyUnlockedSibling(parent, node.index, refAllowedList);
        const alreadyUnlocked = refAllowedList[node.index].isLocked;

        if (alreadyUnlocked) {
            return skillTreeMenu(source);
        }

        console.warn(refAllowedList[node.index].isLocked)

        if ((permLocked || parentLocked) && parent.index != 4) {
            return skillTreeMenu(source);
        }

        const warningMenu = new ActionFormData()
            .title("Warning!")
            .body(`Are you sure you want to unlock this skill?\n\n§b${node.title}§r: \n${node.description[0].replaceAll("\n", "")} \n${node.description[1].replaceAll("\n", "")}\n `)
            .button("Confirm")
            .button("Cancel");

        warningMenu.show(source).then((ActionFormResponse) => {
            const { selection } = ActionFormResponse;
            if (selection === undefined) return source.sendMessage("§cYou exited the menu, so your selection was not saved.");

            if (selection === 1) {
                return skillTreeMenu(source)
            } else {
                
                if (getScore("skill_points", source) <= 0) return source.sendMessage("§cYou cannot afford that!");
                playSound(source, 'random.levelup', 1, source.location, 1);
                const indexOfNodeInLockedArray = refAllowedList[node.index].orignalIndex
                isLockedOrder[indexOfNodeInLockedArray] = true;

                addNeededTags(source, node.title)
                addNeededEvents(source, node.title);

                setScore(source, "skill_tree", saveSkillTree(isLockedOrder));
                setScore(source, "skill_points", -1, true);
                skillTreeMenu(source)
            }
        });
    });
}

function addNeededTags(player, title) {
    const tagMap = {
        // Carried
        "Chi Infusion": "passive_regen",

        // Air
        "Wind Dash": "wind_dash",
        "Aerial Ascent": "double_jump",
        "Cyclone Master": "permKbSafe",
        "Sky's Grace": "passive_mobility",
        "Whirlwind Redirection": "sub_projectile",

        // Earth
        "Pillar Pound": "pillar_pound",
        "Earth Sprint": "earth_sprint",
        "Metal Bullets": "mtl_bullet",

        // Fire
        "Firey Disposition": "nether_buff",
        "Fast-Footed": "passive_mobility",
        "Best Bargainer": "village_hero",
        "Hot-Blooded": "hot_blood",
    }
    const possibleTag = tagMap[title];
    if (possibleTag) player.addTag(possibleTag);
}

function addNeededEvents(player, title) {
    const eventMap = {
        // Carried
        "Chi Infusion+": "a:set_health_15",
        "Warrior's Spirit": "a:set_base_damage_2",
        "Warrior's Spirit+": "a:set_base_damage_3",

        // Air
        "Peaceful Presence": "a:no_mob_agro",
        "Onion & Banana Juice": "a:no_hunger",
        "Twinkle Toes": "a:set_trigger_skulk_off",
        "Vortex Cushion": "a:set_fall_damage_off",

        // Earth
        "Nature Affinity": "a:set_contact_damage_off",
        "Toph Armor": "a:set_health_25",
        "Super Smash": "a:set_special_fall_damage",

        // Water
        "Waterwash": "a:set_special_fall_damage",
        "Icy Aura": "a:set_contact_damage_off"
    }
    const possibleEvent = eventMap[title];
    if (possibleEvent) player.triggerEvent(possibleEvent);
}

const removeTags = [
    // Carried
    "passive_regen",

    // Air
    "wind_dash",
    "double_jump",
    "passive_mobility",
    "sub_projectile",
    "permKbSafe",
    
    // Earth
    "pillar_pound",
    "earth_sprint",
    "mtl_bullet",

    // Fire
    "nether_buff",
    "passive_mobility",
    "village_hero",
    "hot_blood",
]

const resetEvents = [
	"a:set_trigger_skulk_on",
	"a:reset_damage_sensor",
	"a:normal_hunger",
	"a:set_base_damage_normal",
	"a:set_breath_normal",
	"a:set_health_normal",
	"a:mob_agro"
];

function resetSkillTree(player) {

    const warningMenu = new ActionFormData()
    .title("Warning!")
    .body(`§6Are you sure you want to do this?\n\n§7This will reset your skill tree and grant you back the essence you need, but costs 20 XP!\n `)
    .button("Confirm")
    .button("Cancel");

    warningMenu.show(player).then((ActionFormResponse) => {
        const { selection } = ActionFormResponse;
        if (selection === undefined) return player.sendMessage("§cYou exited the menu, so your selection was not saved.");

        if (selection === 1) {
            return skillTreeMenu(player);
        } else {

            if (player.level < 20) return player.sendMessage("§cYou need at least 20XP for this!");
            player.addLevels(-20)

            player.sendMessage("§7You reset your skill tree!");

            let skillTreeEv = getScore("skill_tree", player);
            if (!skillTreeEv ||  !parseInt(skillTreeEv) || skillTreeEv <= 0) {
                console.warn(`Encountered a minor error when parsing ${source.name}'s skill tree score!`);
                setScore(player, "skill_tree", 1, false);
                skillTreeEv = 1;
            }

            playSound(player, 'random.levelup', 1, player.location, 1);

            const isLockedOrder = loadSkillTree(skillTreeEv);
            const trueCount = isLockedOrder.filter(value => value === true).length - 1;

            setScore(player, "skill_points", trueCount, true);

            setScore(player, "skill_tree", 1, false);

            // find how mmany skill points and give back

            for (const tag of removeTags) {
                player.removeTag(tag);
            }

            for (const event of resetEvents) {
                player.triggerEvent(event);
            }

            return skillTreeMenu(player);
        }
    });
}