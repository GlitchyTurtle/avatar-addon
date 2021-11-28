#bridge-file-version: #20
HIDE 
tag @s add fire_launch
scoreboard players set @s cooldown 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bFire Boosters"}]}
scoreboard players add @s sub_level 1
execute @a[tag=fire_launch] ~ ~ ~ particle minecraft:basic_flame_particle ~ ~ ~
execute @a[tag=fire_launch] ~ ~ ~ particle minecraft:mobflame_single ~ ~ ~
execute @a[tag=fire_launch] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
playsound mob.ghast.fireball @s
playsound firework.launch @s