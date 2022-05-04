HIDE
tag @s add selfpull
particle a:air_pull ~~~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull]
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull]
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull]
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull]
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull]
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull] true
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull] true
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull] true
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull] true
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull] true
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull] true
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull] true
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull] true
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^1 facing @p[tag=selfpull] true
execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Pull"}]}
scoreboard players add @s sub_level 1
tag @s remove selfpull