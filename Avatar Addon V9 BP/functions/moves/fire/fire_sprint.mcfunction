#bridge-file-version: #13
HIDE 
effect @s speed 3 5 true
scoreboard players set @s cooldown 0
tag @p add fire_sprint
particle a:fire_wave
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFire Sprint"}]}
scoreboard players add @s sub_level 1
playsound bucket.fill_lava