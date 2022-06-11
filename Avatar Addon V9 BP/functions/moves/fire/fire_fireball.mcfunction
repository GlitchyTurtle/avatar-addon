#bridge-file-version: #18
HIDE 
summon fireball ^ ^1 ^2
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFireball"}]}
scoreboard players add @s sub_level 1