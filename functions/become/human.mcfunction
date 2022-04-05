#bridge-file-version: #19
HIDE 
tag @s remove avatar
tag @s remove fire
tag @s remove air
tag @s remove water
tag @s remove earth
tag @s add human
scoreboard players set @s moveslot1 0
scoreboard players set @s moveslot2 0
scoreboard players set @s moveslot3 0
scoreboard players set @s moveslot4 0
event entity @s become_human
tag @s remove choose
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bHuman§r"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§bChi Block §r- If you can land 6 consecutive hits on a player without being hit back, you can disable their chi - which means they can't bend anymore. The duration of this attack is dependent on your level, for instance level 10 can disable for 10 seconds."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}