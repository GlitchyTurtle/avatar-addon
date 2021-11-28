#bridge-file-version: #11
HIDE 
execute @s[tag=water,scores={moveslot2=1}] ~ ~ ~ function moves/water_flood
execute @s[tag=water,scores={moveslot2=2}] ~ ~ ~ function moves/water_ice_cage
execute @s[tag=water,scores={moveslot2=3}] ~ ~ ~ function moves/water_ice_throw
execute @s[tag=water,scores={moveslot2=4}] ~ ~ ~ function moves/water_spear
execute @s[tag=water,scores={moveslot2=5}] ~ ~ ~ function moves/water_spike
execute @s[tag=water,scores={moveslot2=6}] ~ ~ ~ function moves/water_rush
execute @s[scores={moveslot2=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools"}]}
scoreboard players set @s cooldown1 0