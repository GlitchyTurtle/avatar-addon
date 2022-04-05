#bridge-file-version: #24
HIDE 
tag @s add builder_mode
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFocus Build"}]}
scoreboard players add @s sub_level 1
playsound dig.grass
playsound dig.gravel