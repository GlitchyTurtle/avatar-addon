#bridge-file-version: #39
HIDE 
tag @s add selfpush
execute @e[r=20,tag=!selfpush] ~ ~ ~ damage @s 10 none
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
summon a:splash_effect
particle a:water_wave ~~~
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bSplash"}]}
scoreboard players add @s sub_level 1
tag @s remove selfpush