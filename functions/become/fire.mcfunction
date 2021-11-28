#bridge-file-version: #31
HIDE 
tag @s add fire
tag @s remove air
tag @s remove water
tag @s remove earth
tag @s remove avatar
scoreboard players set @s moveslot1 0
scoreboard players set @s moveslot2 0
scoreboard players set @s moveslot3 0
scoreboard players set @s moveslot4 0
event entity @s become_fire
tag @s remove choose
tellraw @s {"rawtext":[{"text":"§r"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bFirebender§r"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bSlot Choice:"}]}
tellraw @s {"rawtext":[{"text":"§bSlot 1 §r- Look down and sneak to trigger whatever move you have for slot 1."}]}
tellraw @s {"rawtext":[{"text":"§bSlot 2 §r- Look up and sneak to trigger whatever move you have for slot 2."}]}
tellraw @s {"rawtext":[{"text":"§bSlot 3 §r- Sneak and punch to trigger whatever move you have for slot 3."}]}
tellraw @s {"rawtext":[{"text":"§bSlot 4 §r- Double sneak to trigger whatever move you have for slot 4."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bAbilities:"}]}
tellraw @s {"rawtext":[{"text":"§bFire Blast §r- Shoots lava 5 blocks in front of you! To use, sneak then punch."}]}
tellraw @s {"rawtext":[{"text":"§bFire Sprint §r- Look up and sneak to give yourself speed and leave a fire trail untill the cooldown is over."}]}
tellraw @s {"rawtext":[{"text":"§bFire Circle §r- Look at the ground and sneak to set the area around you on fire in the shape of a circle."}]}
tellraw @s {"rawtext":[{"text":"§bFire Boosters §r- Lets you fly by shooting out fire. Double sneak to use."}]}
tellraw @s {"rawtext":[{"text":"§bLightning §r- Makes lightning strike 5 blocks out where you look."}]}
tellraw @s {"rawtext":[{"text":"§bMagma Floor §r- Makes the area around you magma blocks."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bPassive:"}]}
tellraw @s {"rawtext":[{"text":"§bFast Fire §r- When in or touching fire or lava, you will get a speed effect."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bImmunity and Health:"}]}
tellraw @s {"rawtext":[{"text":"§bHealth §r- Your health is 15 hearts, slightly more than the normal 10 hearts."}]}
tellraw @s {"rawtext":[{"text":"§bImmunity §r- You are immune to any kind of lava or fire damage."}]}