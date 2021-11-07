#bridge-file-version: #29
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
setblock ^ ^1 ^4 flowing_lava 0
scoreboard players set @s cooldown1 50
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bFire Blast"}]}
scoreboard players add @s sub_level 1
playsound mob.ghast.fireball