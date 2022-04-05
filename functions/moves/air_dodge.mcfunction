#bridge-file-version: #60
HIDE 
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_evaporation_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_evaporation_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_evaporation_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_evaporation_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_evaporation_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_evaporation_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_evaporation_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_evaporation_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_evaporation_manual ~ ~ ~
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Dodge"}]}
scoreboard players add @s sub_level 2