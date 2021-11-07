#bridge-file-version: #53
HIDE 
tag @s add air
tag @s remove water
tag @s remove fire
tag @s remove earth
tag @s remove avatar
event entity @s become_air
tag @s remove choose
tellraw @s {"rawtext":[{"text":"§r"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§k111§r §l§bAirbender§r §k111§r"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bSlot Choice:"}]}
tellraw @s {"rawtext":[{"text":"§bSlot 1 §r- Look up and sneak to trigger whatever move you have for slot 1."}]}
tellraw @s {"rawtext":[{"text":"§bSlot 2 §r- Look down and punch to trigger whatever move you have for slot 2."}]}
tellraw @s {"rawtext":[{"text":"§bSlot 3 §r- Double sneak (sneak twice quickly) to trigger whatever move you have for slot 3."}]}
tellraw @s {"rawtext":[{"text":"§bSlot 4 §r- Sneak and punch to trigger whatever move you have for slot 4."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bAbilities:"}]}
tellraw @s {"rawtext":[{"text":"§bAir Launch §r- Launch yourself into the air!"}]}
tellraw @s {"rawtext":[{"text":"§bAirscooter §r- Jump on a bubble of air you can control! If you ram into entities, it does damage."}]}
tellraw @s {"rawtext":[{"text":"§bAir Escape §r- Launch all entities near you 20 blocks away."}]}
tellraw @s {"rawtext":[{"text":"§bAir Blast §r- Shoots a focused beam of air that does damage and knockback."}]}
tellraw @s {"rawtext":[{"text":"§bAir Vanish §r- Allows you to vanish in a cloud of smoke."}]}
tellraw @s {"rawtext":[{"text":"§bAir Rush §r- Shoots you forward fast."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bPassive:"}]}
tellraw @s {"rawtext":[{"text":"§bLight Bend §r- After sneaking for a certain time, you will become invisible."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bImmunity and Health:"}]}
tellraw @s {"rawtext":[{"text":"§bHealth §r- Your health is the normal 10 hearts."}]}
tellraw @s {"rawtext":[{"text":"§bImmunity §r- You are immune to any kind of fall damage, including fall damage wearing an elytra (not wall hits though)."}]}