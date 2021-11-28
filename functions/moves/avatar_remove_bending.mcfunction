#bridge-file-version: #6
HIDE 
execute @p[tag=!avatar,r=20] ~ ~ ~ tag @s add avatar_antimagic
execute @p[tag=!avatar,r=20] ~ ~ ~ effect @s blindness 1 1
execute @p[tag=!avatar,r=20] ~ ~ ~ effect @s slowness 1 1
execute @p[tag=!avatar,r=20] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
playsound bottle.dragonbreath @a[r=20]
scoreboard players set @s cooldown 0