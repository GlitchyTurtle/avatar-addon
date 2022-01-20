#bridge-file-version: #17
HIDE 
summon fireball ^ ^1 ^2
scoreboard players set @s cooldown 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bFireball"}]}
scoreboard players add @s sub_level 1