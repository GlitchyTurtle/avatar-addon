#bridge-file-version: #48
HIDE 
tag @s add selfrush
effect @s speed 2 10 true
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bWater Rush"}]}
scoreboard players add @s sub_level 1
playsound bucket.empty_water @a[r=3]