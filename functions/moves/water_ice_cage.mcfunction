#bridge-file-version: #19
HIDE 
tag @s add selfice
execute @e[r=4,tag=!selfice] ~ ~ ~ fill ~1 ~-1 ~1 ~-1 ~2 ~-1 ice 0 keep
execute @e[r=4,tag=!selfice] ~ ~ ~ fill ~ ~ ~ ~ ~1 ~ air 0 replace ice
scoreboard players set @s cooldown 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bIce Cage"}]}
scoreboard players add @s sub_level 1
tag @s remove selfice
playsound beacon.power @a[r=6]