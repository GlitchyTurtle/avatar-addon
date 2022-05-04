#bridge-file-version: #17
HIDE 
summon a:explosion_massive
particle a:fire_last_ditch ~~~
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bLast Ditch Effort"}]}
scoreboard players add @s sub_level 5