#bridge-file-version: #14
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
execute @s[scores={level=0..5}] ^ ^ ^5 effect @e[r=2] wither 2 2 true
execute @s[scores={level=6..10}] ^ ^ ^5 effect @e[r=2] wither 2 4 true
execute @s[scores={level=11..99}] ^ ^ ^5 effect @e[r=2] wither 2 6 true
execute @s[scores={level=100..}] ^ ^ ^5 effect @e[r=2] wither 2 15 true
execute @s[tag=full_moon] ^ ^ ^5 effect @e[r=2] instant_damage 1 10 true
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bWater Spear"}]}
scoreboard players add @s sub_level 2
playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1