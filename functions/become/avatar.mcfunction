#bridge-file-version: #31
HIDE 
tag @s remove fire
tag @s remove air
tag @s remove water
tag @s remove earth
tag @s add avatar
scoreboard players set @s moveslot1 0
scoreboard players set @s moveslot2 0
scoreboard players set @s moveslot3 0
scoreboard players set @s moveslot4 0
event entity @s become_avatar
tag @s remove choose
tellraw @s {"rawtext":[{"text":"§r"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bAvatar§r"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bStarter Abilities:"}]}
tellraw @s {"rawtext":[{"text":"§bAir Launch §r- Launch yourself into the air by looking at the ground and punching!"}]}
tellraw @s {"rawtext":[{"text":"§bEarth Pillar §r- Double sneak, and you will lift the earth under you 4 blocks up."}]}
tellraw @s {"rawtext":[{"text":"§bIce Cage §r- Look up and punch to freeze nearby (4 blocks away) mobs and players in an ice cage. It can destroy blocks, so be carefull."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bLevel 1 Abilities:"}]}
tellraw @s {"rawtext":[{"text":"§bBending Wipe §r- Removes the bending of the nearest player in 20 blocks. Double sneak to charge this move."}]}
tellraw @s {"rawtext":[{"text":"§bBending Restore §r- Restores the bending of the nearest player in 20 blocks. Double sneak and drop an item named restore"}]}
tellraw @s {"rawtext":[{"text":"§bFire Blast §r- Shoots lava 5 blocks in front of you! To use, sneak then punch."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bAvatar State:"}]}
tellraw @s {"rawtext":[{"text":"§bHow to enter/exit §r- After getting to level 10, drop an item named: §benter_avatar_state§r, or §bexit_avatar_state§r."}]}
tellraw @s {"rawtext":[{"text":"§bEnergy Beam §r- Shoots a beam of pure energy when you  sneak in avatar state. Range of 20 blocks, instant kill."}]}
tellraw @s {"rawtext":[{"text":"§bEnergy Shield §r- Circles you with a beam of pure energy when you  sneak and look down in avatar state. No one can come near you."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bPassive:"}]}
tellraw @s {"rawtext":[{"text":"§bLight Bend §r- After sneaking for a certain time, you will become invisible."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bImmunity and Health:"}]}
tellraw @s {"rawtext":[{"text":"§bHealth §r- Your health is the above average 20 hearts."}]}
tellraw @s {"rawtext":[{"text":"§bImmunity §r- You are immune to any kind of fall damage, fire damage, water damage, and suffocation damage."}]}