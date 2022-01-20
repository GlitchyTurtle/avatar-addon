#bridge-file-version: #118
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
execute @s[scores={level=0..5}] ~ ~ ~ effect @e[tag=!selfearth,r=6] wither 2 2 true
execute @s[scores={level=6..10}] ~ ~ ~ effect @e[tag=!selfearth,r=6] wither 2 4 true
execute @s[scores={level=11..99}] ~ ~ ~ effect @e[tag=!selfearth,r=6] wither 2 6 true
execute @s[scores={level=100..}] ~ ~ ~ effect @e[tag=!selfearth,r=6] wither 2 15 true
effect @s resistance 1 255 true
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bEarth Shove"}]}
scoreboard players add @s sub_level 1
tag @s remove selfearth
playsound dig.grass
playsound dig.gravel