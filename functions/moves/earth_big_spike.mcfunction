#bridge-file-version: #62
HIDE 
structure load earth_1 ^ ^ ^5
execute @s[scores={level=0..5}] ^ ^ ^5 effect @e[r=3] wither 2 2 true
execute @s[scores={level=6..10}] ^ ^ ^5 effect @e[r=3] wither 2 4 true
execute @s[scores={level=11..99}] ^ ^ ^5 effect @e[r=3] wither 2 6 true
execute @s[scores={level=100..}] ^ ^ ^5 effect @e[r=3] wither 2 15 true
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bBig Spike"}]}
scoreboard players add @s sub_level 1
playsound dig.grass
playsound dig.gravel