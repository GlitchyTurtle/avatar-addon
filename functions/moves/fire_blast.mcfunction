#bridge-file-version: #31
HIDE 
particle minecraft:lava_drip_particle ^ ^1 ^0.5
particle minecraft:lava_drip_particle ^ ^1 ^1
particle minecraft:lava_drip_particle ^ ^1 ^1.5
particle minecraft:lava_drip_particle ^ ^1 ^2
particle minecraft:lava_drip_particle ^ ^1 ^2.5
particle minecraft:lava_drip_particle ^ ^1 ^3
particle minecraft:lava_drip_particle ^ ^1 ^3.5
particle minecraft:lava_drip_particle ^ ^1 ^4
particle minecraft:egg_destroy_emitter ^ ^1 ^4
execute @s[scores={level=0..5}] ^ ^ ^4 effect @e[r=2] wither 2 2 true
execute @s[scores={level=6..10}] ^ ^ ^4 effect @e[r=2] wither 2 4 true
execute @s[scores={level=11..99}] ^ ^ ^4 effect @e[r=2] wither 2 6 true
execute @s[scores={level=100..}] ^ ^ ^4 effect @e[r=2] wither 2 15 true
scoreboard players set @s cooldown1 50
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bFire Blast"}]}
scoreboard players add @s sub_level 1
playsound mob.ghast.fireball