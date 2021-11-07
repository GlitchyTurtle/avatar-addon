#bridge-file-version: #33
HIDE 
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bAir Rush"}]}
scoreboard players add @s sub_level 1
tag @s add airrush