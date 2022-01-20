#bridge-file-version: #14
HIDE 
execute @s[tag=water,scores={moveslot3=1}] ~ ~ ~ function moves/water_flood
execute @s[tag=water,scores={moveslot3=2}] ~ ~ ~ function moves/water_ice_cage
execute @s[tag=water,scores={moveslot3=3}] ~ ~ ~ function moves/water_ice_throw
execute @s[tag=water,scores={moveslot3=4}] ~ ~ ~ function moves/water_spear
execute @s[tag=water,scores={moveslot3=5}] ~ ~ ~ function moves/water_spike
execute @s[tag=water,scores={moveslot3=6}] ~ ~ ~ function moves/water_rush
execute @s[scores={moveslot3=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools (slot 3)"}]}
scoreboard players set @s cooldown1 0