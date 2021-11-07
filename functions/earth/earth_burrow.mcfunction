#bridge-file-version: #47
HIDE 
tp @s ~ ~-4 ~
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bBurrow"}]}
scoreboard players add @s sub_level 1
playsound dig.grass
playsound dig.gravel
tag @s add burrow