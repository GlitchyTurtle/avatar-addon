#bridge-file-version: #29
HIDE 
tag @s add earth_scaffold
setblock ~ ~-1 ~ dirt
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bEarth Scaffold"}]}
scoreboard players add @s sub_level 1
playsound dig.grass
playsound dig.gravel