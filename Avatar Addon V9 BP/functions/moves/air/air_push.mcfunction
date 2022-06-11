HIDE 
particle a:air_push ~~~
particle minecraft:explosion_manual ~~~
tag @s add kbsafe
summon a:knockback_instant ~~~
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Push"}]}
scoreboard players add @s sub_level 1