#bridge-file-version: #24
HIDE 
effect @s resistance 3 255 true
particle a:fire_shield ~~~
particle a:fire_wave ~~~
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFire Shield"}]}
scoreboard players add @s sub_level 1