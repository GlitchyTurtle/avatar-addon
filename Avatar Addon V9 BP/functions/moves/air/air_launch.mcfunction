HIDE
summon a:knockback_instant ^^^-1
particle a:air_puff
effect @s levitation 1 50 true
tag @s add air_launch_particle
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Launch"}]}
scoreboard players add @s sub_level 1
playsound firework.launch @s