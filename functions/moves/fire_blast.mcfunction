#bridge-file-version: #33
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
execute @s[scores={level=0..5}] ^ ^ ^4 damage @e[r=2] 1 none
execute @s[scores={level=6..10}] ^ ^ ^4 damage @e[r=2] 2 none
execute @s[scores={level=11..99}] ^ ^ ^4 damage @e[r=2] 4 none
execute @s[scores={level=100..}] ^ ^ ^4 damage @e[r=2] 10 none
scoreboard players set @s cooldown1 50
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFire Blast"}]}
scoreboard players add @s sub_level 1
playsound mob.ghast.fireball