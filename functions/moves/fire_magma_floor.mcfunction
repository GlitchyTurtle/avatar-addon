#bridge-file-version: #19
HIDE 
effect @s resistance 1 255 true
structure load magma_floor ~-4 ~-1 ~-4
scoreboard players set @s cooldown 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bMagma Floor"}]}
scoreboard players add @s sub_level 1