HIDE 
summon a:knockback_instant ~~~
tag @s add air_launch_particle
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Elytra Boost"}]}
scoreboard players add @s sub_level 1