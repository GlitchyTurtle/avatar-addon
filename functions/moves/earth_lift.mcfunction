#bridge-file-version: #95
HIDE 
execute @s ~ ~ ~ clone ~5 ~-2 ~5 ~-5 ~10 ~-5 ~-5 ~10 ~-5 masked move
execute @e[r=10] ~ ~ ~ tp @s ~ ~12 ~
execute @s  ~ ~ ~ tag @s remove charging
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bEarth Lift"}]}
scoreboard players add @s sub_level 2
playsound dig.grass
playsound dig.gravel
playsound dig.grass
playsound dig.gravel