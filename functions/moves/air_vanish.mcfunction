#bridge-file-version: #46
HIDE 
particle a:air_vanish ~~~
effect @s invisibility 10 3 true
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Vanish"}]}
scoreboard players add @s sub_level 2
playsound monb.mob.shulker.shoot @a[r=3]