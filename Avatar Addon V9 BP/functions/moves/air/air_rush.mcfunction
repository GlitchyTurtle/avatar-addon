HIDE 
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Rush"}]}
scoreboard players add @s sub_level 1
tag @s add airrush