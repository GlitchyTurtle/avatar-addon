#bridge-file-version: #16
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
execute @s[scores={level=0..5}] ^ ^ ^5 damage @e[r=2] 1 none
execute @s[scores={level=6..10}] ^ ^ ^5 damage @e[r=2] 2 none
execute @s[scores={level=11..99}] ^ ^ ^5 damage @e[r=2] 4 none
execute @s[scores={level=100..}] ^ ^ ^5 damage @e[r=2] 10 none
execute @s[tag=full_moon] ^ ^ ^5 damage @e[r=5] 19 none
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bWater Spear"}]}
scoreboard players add @s sub_level 2
playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1