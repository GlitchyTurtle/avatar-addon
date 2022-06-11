#bridge-file-version: #23
HIDE 
particle a:fire_wave ~~~
effect @s levitation 1 10 true
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFire Jump"}]}
scoreboard players add @s sub_level 1
playsound bucket.fill_lava