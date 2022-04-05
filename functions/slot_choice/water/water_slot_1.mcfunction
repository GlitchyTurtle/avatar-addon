#bridge-file-version: #14
HIDE 
execute @s[tag=water,scores={moveslot1=1}] ~ ~ ~ function moves/water_flood
execute @s[tag=water,scores={moveslot1=2}] ~ ~ ~ function moves/water_ice_cage
execute @s[tag=water,scores={moveslot1=3}] ~ ~ ~ function moves/water_ice_throw
execute @s[tag=water,scores={moveslot1=4}] ~ ~ ~ function moves/water_spear
execute @s[tag=water,scores={moveslot1=5}] ~ ~ ~ function moves/water_spike
execute @s[tag=water,scores={moveslot1=6}] ~ ~ ~ function moves/water_rush
execute @s[tag=water,scores={moveslot1=7}] ~ ~ ~ function moves/water_fountain
execute @s[tag=water,scores={moveslot1=8}] ~ ~ ~ function moves/water_healing
execute @s[tag=water,scores={moveslot1=9}] ~ ~ ~ function moves/water_life_drain
execute @s[tag=water,scores={moveslot1=10}] ~ ~ ~ function moves/water_splash
execute @s[tag=water,scores={moveslot1=11}] ~ ~ ~ function moves/water_wake
execute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"You dont have a move set, use /function useful_tools (slot 1)"}]}
scoreboard players set @s cooldown1 0