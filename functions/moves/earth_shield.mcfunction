#bridge-file-version: #11
HIDE 
structure load earth_shield ~-2 ~-1 ~-2
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bEarth Spikes"}]}
scoreboard players add @s sub_level 1
playsound dig.grass
playsound dig.gravel