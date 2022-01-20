#bridge-file-version: #58
HIDE 
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bAir Dodge"}]}
scoreboard players add @s sub_level 2