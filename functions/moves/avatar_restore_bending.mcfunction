#bridge-file-version: #5
HIDE 
execute @p[tag=!avatar] ~ ~ ~ tag @s remove avatar_antimagic
execute @p[tag=!avatar] ~ ~ ~ effect @s blindness 1 1
execute @p[tag=!avatar] ~ ~ ~ effect @s slowness 1 1
execute @p[tag=!avatar] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
playsound bottle.dragonbreath @a[r=20]