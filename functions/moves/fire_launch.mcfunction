#bridge-file-version: #26
HIDE 
summon a:scooter
execute @s[tag=fire] ~ ~ ~ ride @s start_riding @e[r=3,type=a:scooter,c=1] teleport_ride
execute @s[tag=avatar] ~ ~ ~ ride @s start_riding @e[r=3,type=a:scooter,c=1] teleport_ride
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFire Boosters"}]}
scoreboard players add @s sub_level 1
execute @a[tag=fire_launch] ~ ~ ~ particle minecraft:basic_flame_particle ~ ~ ~
execute @a[tag=fire_launch] ~ ~ ~ particle minecraft:mobflame_single ~ ~ ~
execute @a[tag=fire_launch] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
playsound mob.ghast.fireball @s
playsound firework.launch @s