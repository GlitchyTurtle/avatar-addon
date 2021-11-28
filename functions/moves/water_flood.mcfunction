#bridge-file-version: #34
HIDE 
tag @s add selfflood
fill ~1 ~1 ~1 ~-1 ~1 ~-1 flowing_water 0 keep
effect @e[r=4,tag=!selfflood] wither 1 2 true
scoreboard players set @s cooldown1 50
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bFlood"}]}
scoreboard players add @s sub_level 1
tag @s remove selfflood
playsound bucket.empty_water @a[r=3]