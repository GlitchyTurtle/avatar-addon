#bridge-file-version: #23
HIDE 
effect @s resistance 3 255 true
particle minecraft:mobflame_single ~ ~ ~
particle minecraft:egg_destroy_emitter ~ ~ ~
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFire Shield"}]}
scoreboard players add @s sub_level 1