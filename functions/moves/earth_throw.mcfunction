#bridge-file-version: #81
HIDE 
summon armor_stand ^ ^ ^-1 huge_size earth_throw
tag @s add earth_throw
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bEarth Throw"}]}
scoreboard players add @s sub_level 1