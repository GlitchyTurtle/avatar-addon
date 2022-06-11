HIDE 
tag @s add summoning_dirt
summon a:dirt_block ~~-0.8~
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bEarth Throw"}]}
scoreboard players add @s sub_level 1