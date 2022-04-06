#bridge-file-version: #104
HIDE 
summon a:move_helper ~ ~ ~
execute @s ~ ~ ~ clone ~5 ~-2 ~5 ~-5 ~4 ~-5 ~-5 ~4 ~-5 masked move
execute @e[r=10] ~ ~ ~ tp @s ~ ~6 ~
execute @e[r=10,type=a:move_helper] ~ ~ ~ tag @s add drop_back_down
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bEarth Lift"}]}
scoreboard players add @s sub_level 2
playsound dig.grass
playsound dig.gravel
playsound dig.grass
playsound dig.gravel