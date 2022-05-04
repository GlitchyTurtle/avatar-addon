#bridge-file-version: #63
HIDE 
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:air_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:air_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:air_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:air_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:air_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:air_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:air_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:air_dodge ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle a:air_dodge ~ ~ ~
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Dodge"}]}
scoreboard players add @s sub_level 2