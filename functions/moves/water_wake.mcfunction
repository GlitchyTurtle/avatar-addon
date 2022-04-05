#bridge-file-version: #62
HIDE 
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_splash_particle_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_splash_particle_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_splash_particle_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_splash_particle_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_splash_particle_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_splash_particle_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_splash_particle_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_splash_particle_manual ~ ~ ~
execute @s ~ ~ ~ tp @s ^0.5 ^ ^ true
execute @s ~ ~ ~ particle minecraft:water_splash_particle_manual ~ ~ ~
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bWater Wake"}]}
scoreboard players add @s sub_level 2