HIDE 
scoreboard players set @s sub_level 0
playsound random.levelup @s ~ ~ ~
scoreboard players add @s level 1
xp 100 @s
particle minecraft:totem_particle ~ ~ ~
particle minecraft:totem_particle ~ ~ ~
particle minecraft:totem_particle ~ ~ ~
particle minecraft:totem_particle ~ ~ ~
tellraw @s {"rawtext":[{"selector":"@s"},{"text":" §bhas leveled up to level "},{"score":{"name": "@s","objective": "level"}}]}

tellraw @s[scores={level=5}] {"rawtext":[{"selector":"@s"},{"text":" §bhas learned a new move: §rTriple Air Blast"}]}
scoreboard players set @s[scores={level=5}] unlocked 1