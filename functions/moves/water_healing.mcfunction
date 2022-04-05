#bridge-file-version: #64
HIDE 
summon a:healing_water
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bWater Healing"}]}
scoreboard players add @s sub_level 1
tag @s remove selfwater
playsound bucket.fill_water