#bridge-file-version: #14
HIDE 
execute @s[tag=water,scores={moveslot4=1}] ~ ~ ~ function moves/water_flood
execute @s[tag=water,scores={moveslot4=2}] ~ ~ ~ function moves/water_ice_cage
execute @s[tag=water,scores={moveslot4=3}] ~ ~ ~ function moves/water_ice_throw
execute @s[tag=water,scores={moveslot4=4}] ~ ~ ~ function moves/water_spear
execute @s[tag=water,scores={moveslot4=5}] ~ ~ ~ function moves/water_spike
execute @s[tag=water,scores={moveslot4=6}] ~ ~ ~ function moves/water_rush
execute @s[tag=water,scores={moveslot4=7}] ~ ~ ~ function moves/water_fountain
execute @s[tag=water,scores={moveslot4=8}] ~ ~ ~ function moves/water_healing
execute @s[tag=water,scores={moveslot4=9}] ~ ~ ~ function moves/water_life_drain
execute @s[tag=water,scores={moveslot4=10}] ~ ~ ~ function moves/water_splash
execute @s[tag=water,scores={moveslot4=11}] ~ ~ ~ function moves/water_wake
execute @s[scores={moveslot4=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools (slot 4)"}]}
scoreboard players set @s cooldown1 0