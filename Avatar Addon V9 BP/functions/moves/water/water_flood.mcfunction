#bridge-file-version: #39
HIDE 
tag @s add selfflood
fill ~1 ~1 ~1 ~-1 ~1 ~-1 flowing_water 0 keep
particle a:water_wave ~~~
particle a:water_shield ~~~
damage @e[r=4,rm=0.1] 5 none
scoreboard players set @s cooldown1 50
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFlood"}]}
scoreboard players add @s sub_level 1
tag @s remove selfflood
playsound bucket.empty_water @a[r=3]