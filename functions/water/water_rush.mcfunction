#bridge-file-version: #47
HIDE 
tag @s add selfrush
effect @s speed 2 10 true
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bWater Rush"}]}
scoreboard players add @s sub_level 1
playsound bucket.empty_water @a[r=3]