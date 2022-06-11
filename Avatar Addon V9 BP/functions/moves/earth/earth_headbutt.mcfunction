HIDE 
effect @s speed 2 10 true
camerashake add @a[r=5] 0.3 1 positional
tag @p add headbutt
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bHeadbutt"}]}
scoreboard players add @s sub_level 1
playsound dig.grass
playsound dig.gravel