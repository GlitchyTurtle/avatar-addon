#bridge-file-version: #11
HIDE 
execute @s ~ ~1.5 ~ particle minecraft:water_wake_particle ^ ^ ^0.5
execute @s ~ ~1.5 ~ particle minecraft:water_wake_particle ^ ^ ^1
execute @s ~ ~1.5 ~ particle minecraft:water_wake_particle ^ ^ ^1.5
execute @s ~ ~1.5 ~ particle minecraft:water_wake_particle ^ ^ ^2
execute @s ~ ~1.5 ~ particle minecraft:water_wake_particle ^ ^ ^2.5
execute @s ~ ~1.5 ~ particle minecraft:water_wake_particle ^ ^ ^3
execute @s ~ ~1.5 ~ particle minecraft:water_wake_particle ^ ^ ^3.5
execute @s ~ ~1.5 ~ particle minecraft:water_wake_particle ^ ^ ^4
execute @s ~ ~1.5 ~ particle minecraft:water_wake_particle ^ ^ ^4.5
execute @s ~ ~1.5 ~ particle minecraft:water_wake_particle ^ ^ ^5
execute @s ^ ^ ^5 effect @e[r=2] instant_damage 1 0 true
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bWater Spear"}]}
scoreboard players add @s sub_level 2
playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1