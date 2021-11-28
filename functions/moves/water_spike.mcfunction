#bridge-file-version: #61
HIDE 
tag @s add selfwater
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~ ~ ~ ~ ~4 ~ ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~-1 ~ ~ ~ ~3 ~ ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~1 ~ ~ ~ ~3 ~ ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~ ~ ~-1 ~ ~3 ~ ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~ ~ ~1 ~ ~3 ~ ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~-1 ~1 ~1 ~1 ~ ~-1 ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~ ~ ~ ~ ~1 ~2 ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~ ~ ~ ~ ~1 ~-2 ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~ ~ ~ ~-2 ~1 ~ ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~ ~ ~ ~2 ~1 ~ ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~2 ~ ~-1 ~ ~ ~1 ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~-2 ~ ~-1 ~ ~ ~1 ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~-1 ~ ~-2 ~1 ~ ~ ice 0 keep
execute @e[r=10,tag=!selfwater] ~ ~ ~ fill ~-1 ~ ~2 ~1 ~ ~ ice 0 keep
effect @e[r=10,tag=!selfwater] levitation 1 25 true
execute @e[r=10,tag=!selfwater] ~ ~ ~ tp @s ~ ~5 ~
scoreboard players set @s cooldown 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bIce Spike"}]}
scoreboard players add @s sub_level 1
tag @s remove selfwater
playsound bucket.fill_water