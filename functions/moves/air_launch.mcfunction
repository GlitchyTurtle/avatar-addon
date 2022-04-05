#bridge-file-version: #17
HIDE 
particle minecraft:explosion_particle ~ ~ ~
particle minecraft:egg_destroy_emitter ~ ~ ~
effect @s levitation 1 50 true
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Launch"}]}
scoreboard players add @s sub_level 1
playsound firework.launch @s