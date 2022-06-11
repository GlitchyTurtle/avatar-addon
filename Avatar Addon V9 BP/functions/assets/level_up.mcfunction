HIDE 
scoreboard players set @s sub_level 0
playsound random.levelup @s ~ ~ ~
scoreboard players add @s level 1
xp 100 @s
particle a:level_up ~~~
tellraw @s {"rawtext":[{"selector":"@s"},{"text":" §bhas leveled up to level "},{"score":{"name": "@s","objective": "level"}}]}