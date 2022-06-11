#bridge-file-version: #64
HIDE 
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:water_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:water_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:water_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:water_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:water_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:water_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:water_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:water_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:water_dodge ~ ~ ~
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bWater Wake"}]}
scoreboard players add @s sub_level 2