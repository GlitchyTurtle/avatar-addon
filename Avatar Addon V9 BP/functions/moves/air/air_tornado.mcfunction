#bridge-file-version: #29
HIDE 
summon a:move_helper ^ ^1 ^2
tag @e[c=1,r=13,type=a:move_helper] add tornado
effect @e[r=13,type=a:move_helper] fatal_poison 90 1 true
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Blade"}]}
scoreboard players add @s sub_level 2