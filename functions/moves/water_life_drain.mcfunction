#bridge-file-version: #83
HIDE 
execute @s ~~~ detect ~~-1~ grass 0 effect @s instant_health 2 2 true
execute @s ~~~ detect ~~-1~ grass 0 effect @s saturation 2 2 true
particle a:water_healing ~~~
fill ~4 ~-3 ~ ~-4 ~3 ~ dirt 1 replace grass 0
fill ~ ~-3 ~-4 ~ ~3 ~4 dirt 1 replace grass 0
fill ~3 ~-3 ~3 ~-3 ~3 ~-3 dirt 1 replace grass 0
effect @e[r=10,rm=0.1] wither 1 2
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bLife Drain"}]}
scoreboard players add @s sub_level 1
tag @s remove selfwater
playsound bucket.fill_water