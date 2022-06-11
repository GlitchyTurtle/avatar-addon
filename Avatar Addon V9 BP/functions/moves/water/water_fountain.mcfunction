#bridge-file-version: #72
HIDE 
effect @e[r=3] levitation 1 5 true
particle a:water_wave ~~~
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFountain"}]}
scoreboard players add @s sub_level 2
playsound bucket.fill_water