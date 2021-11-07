#bridge-file-version: #115
HIDE 
tag @s add selfearth
setblock ~ ~ ~1 dirt
setblock ~ ~ ~-1 dirt
setblock ~1 ~ ~ dirt
setblock ~-1 ~ ~ dirt
setblock ~ ~ ~2 dirt
setblock ~ ~ ~-2 dirt
setblock ~2 ~ ~ dirt
setblock ~-2 ~ ~ dirt
setblock ~ ~ ~3 dirt
setblock ~ ~ ~-3 dirt
setblock ~3 ~ ~ dirt
setblock ~-3 ~ ~ dirt
execute @e[r=5,tag=!selfearth] ~ ~ ~ effect @s instant_damage 1 0 true
effect @s resistance 1 255 true
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bEarth Shove"}]}
scoreboard players add @s sub_level 1
tag @s remove selfearth
playsound dig.grass
playsound dig.gravel