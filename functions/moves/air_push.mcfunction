HIDE 
tag @s add selfpush
particle a:air_push ~~~
particle minecraft:explosion_manual ~~~
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush]
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
execute @e[r=20,tag=!selfpush] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=selfpush] true
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Push"}]}
scoreboard players add @s sub_level 1
tag @s remove selfpush