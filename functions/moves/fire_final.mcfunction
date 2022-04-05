#bridge-file-version: #15
HIDE 
summon a:explosion_massive
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bLast Ditch Effort"}]}
scoreboard players add @s sub_level 5