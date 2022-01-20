#bridge-file-version: #43
HIDE 
execute @e[r=10] ~ ~ ~ particle minecraft:egg_destroy_emitter
particle minecraft:egg_destroy_emitter ~ ~ ~1
particle minecraft:egg_destroy_emitter ~ ~ ~2
particle minecraft:egg_destroy_emitter ~ ~ ~3
particle minecraft:egg_destroy_emitter ~ ~ ~-1
particle minecraft:egg_destroy_emitter ~ ~ ~-2
particle minecraft:egg_destroy_emitter ~ ~ ~-3
particle minecraft:egg_destroy_emitter ~1 ~ ~
particle minecraft:egg_destroy_emitter ~2 ~ ~
particle minecraft:egg_destroy_emitter ~3 ~ ~
particle minecraft:egg_destroy_emitter ~-1 ~ ~
particle minecraft:egg_destroy_emitter ~-2 ~ ~
particle minecraft:egg_destroy_emitter ~-3 ~ ~
execute @e[r=10] ~ ~ ~ particle minecraft:egg_destroy_emitter
particle minecraft:egg_destroy_emitter ~ ~ ~1
particle minecraft:egg_destroy_emitter ~ ~ ~2
particle minecraft:egg_destroy_emitter ~ ~ ~3
particle minecraft:egg_destroy_emitter ~ ~ ~-1
particle minecraft:egg_destroy_emitter ~ ~ ~-2
particle minecraft:egg_destroy_emitter ~ ~ ~-3
particle minecraft:egg_destroy_emitter ~1 ~ ~
particle minecraft:egg_destroy_emitter ~2 ~ ~
particle minecraft:egg_destroy_emitter ~3 ~ ~
particle minecraft:egg_destroy_emitter ~-1 ~ ~
particle minecraft:egg_destroy_emitter ~-2 ~ ~
particle minecraft:egg_destroy_emitter ~-3 ~ ~
execute @e[r=10] ~ ~ ~ particle minecraft:egg_destroy_emitter
particle minecraft:egg_destroy_emitter ~ ~ ~1
particle minecraft:egg_destroy_emitter ~ ~ ~2
particle minecraft:egg_destroy_emitter ~ ~ ~3
particle minecraft:egg_destroy_emitter ~ ~ ~-1
particle minecraft:egg_destroy_emitter ~ ~ ~-2
particle minecraft:egg_destroy_emitter ~ ~ ~-3
particle minecraft:egg_destroy_emitter ~1 ~ ~
particle minecraft:egg_destroy_emitter ~2 ~ ~
particle minecraft:egg_destroy_emitter ~3 ~ ~
particle minecraft:egg_destroy_emitter ~-1 ~ ~
particle minecraft:egg_destroy_emitter ~-2 ~ ~
particle minecraft:egg_destroy_emitter ~-3 ~ ~
execute @e[r=10] ~ ~ ~ particle minecraft:egg_destroy_emitter
execute @e[r=10] ~ ~ ~ particle minecraft:egg_destroy_emitter
execute @e[r=10] ~ ~ ~ particle minecraft:egg_destroy_emitter
execute @e[r=10] ~ ~ ~ particle minecraft:egg_destroy_emitter
execute @e[r=10] ~ ~ ~ particle minecraft:egg_destroy_emitter
execute @e[r=10] ~ ~ ~ particle minecraft:egg_destroy_emitter
effect @s invisibility 10 3 true
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bAir Vanish"}]}
scoreboard players add @s sub_level 2
playsound monb.mob.shulker.shoot @a[r=3]