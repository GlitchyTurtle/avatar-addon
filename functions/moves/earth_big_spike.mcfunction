#bridge-file-version: #64
HIDE 
structure load earth_1 ^ ^ ^5
execute @s[scores={level=0..5}] ^ ^ ^5 damage @e[r=2] 1 none
execute @s[scores={level=6..10}] ^ ^ ^5 damage @e[r=2] 2 none
execute @s[scores={level=11..99}] ^ ^ ^5 damage @e[r=2] 4 none
execute @s[scores={level=100..}] ^ ^ ^5 damage @e[r=2] 10 none
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bBig Spike"}]}
scoreboard players add @s sub_level 1
playsound dig.grass
playsound dig.gravel