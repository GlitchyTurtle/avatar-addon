#bridge-file-version: #63
HIDE 
tellraw @s {"rawtext":[{"text":"----------"}]}
tellraw @s[tag=air] {"rawtext":[{"text":"§b"},{"selector":"@s"},{"text":"§r is a level "},{"score":{"name": "@s","objective": "level"}},{"text":" Airbender. They have "},{"score":{"name": "@s","objective": "deaths"}},{"text":" deaths, and "},{"score":{"name": "@s","objective": "kills"}},{"text":" kills. "}]}
tellraw @s[tag=earth] {"rawtext":[{"text":"§b"},{"selector":"@s"},{"text":"§r is a level "},{"score":{"name": "@s","objective": "level"}},{"text":" Earthbender. They have "},{"score":{"name": "@s","objective": "deaths"}},{"text":" deaths, and "},{"score":{"name": "@s","objective": "kills"}},{"text":" kills. "}]}
tellraw @s[tag=fire] {"rawtext":[{"text":"§b"},{"selector":"@s"},{"text":"§r is a level "},{"score":{"name": "@s","objective": "level"}},{"text":" Firebender. They have "},{"score":{"name": "@s","objective": "deaths"}},{"text":" deaths, and "},{"score":{"name": "@s","objective": "kills"}},{"text":" kills. "}]}
tellraw @s[tag=water] {"rawtext":[{"text":"§b"},{"selector":"@s"},{"text":"§r is a level "},{"score":{"name": "@s","objective": "level"}},{"text":" Waterbender. They have "},{"score":{"name": "@s","objective": "deaths"}},{"text":" deaths, and "},{"score":{"name": "@s","objective": "kills"}},{"text":" kills. "}]}
tellraw @s[tag=avatar] {"rawtext":[{"text":"§b"},{"selector":"@s"},{"text":"§r is a level "},{"score":{"name": "@s","objective": "level"}},{"text":" Avatar. They have "},{"score":{"name": "@s","objective": "deaths"}},{"text":" deaths, and "},{"score":{"name": "@s","objective": "kills"}},{"text":" kills. "}]}
tellraw @s[scores={level=0..5}] {"rawtext":[{"text":"Progression to next level: "},{"score":{"name": "@s","objective": "sub_level"}},{"text":"/20"}]}
tellraw @s[scores={level=6..10}] {"rawtext":[{"text":"Progression to next level: "},{"score":{"name": "@s","objective": "sub_level"}},{"text":"/30"}]}
tellraw @s[scores={level=11..15}] {"rawtext":[{"text":"Progression to next level: "},{"score":{"name": "@s","objective": "sub_level"}},{"text":"/40"}]}
tellraw @s[scores={level=50..}] {"rawtext":[{"text":"Progression to next level: "},{"score":{"name": "@s","objective": "sub_level"}},{"text":"/80"}]}
tellraw @s[scores={kills=..-1}] {"rawtext":[{"text":"Their strength level is impossible, so they are likely a hacker"}]}
tellraw @s[scores={kills=0..9}] {"rawtext":[{"text":"Their strength level is §cLow§r"}]}
tellraw @s[scores={kills=10..19}] {"rawtext":[{"text":"Their strength level is §cBelow Average§r"}]}
tellraw @s[scores={kills=20..29}] {"rawtext":[{"text":"Their strength level is §cFine§r"}]}
tellraw @s[scores={kills=30..49}] {"rawtext":[{"text":"Their strength level is §aGood§r"}]}
tellraw @s[scores={kills=40..49}] {"rawtext":[{"text":"Their strength level is §aHigh§r"}]}
tellraw @s[scores={kills=50..1000}] {"rawtext":[{"text":"Their strength level is §aSuper High§r"}]}
tellraw @s[scores={kills=1000..}] {"rawtext":[{"text":"Their strength level is §bGOD§r"}]}
tellraw @s {"rawtext":[{"text":"----------"}]}