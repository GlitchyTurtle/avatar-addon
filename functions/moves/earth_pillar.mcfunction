#bridge-file-version: #48
HIDE 
execute @s[tag=!antimagic,scores={cooldown1=100,ground=1}] ~ ~ ~ tp @s ~ ~4 ~
execute @s[tag=!antimagic,scores={cooldown1=100,ground=1}] ~ ~ ~ clone ~ ~-8 ~ ~ ~-4 ~ ~ ~-4 ~
execute @s[tag=!antimagic,scores={cooldown1=100,ground=1}] ~ ~ ~ scoreboard players set @s cooldown1 50
execute @s[tag=!antimagic,scores={cooldown1=50,ground=1}] ~ ~ ~ fill ~ ~-8 ~ ~ ~-5 ~ air
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bEarth Pillar"}]}
scoreboard players add @s sub_level 1
playsound dig.grass