#bridge-file-version: #5
HIDE 
execute @s[tag=water,scores={moveslot1=1}] ~ ~ ~ function water/flood
execute @s[tag=water,scores={moveslot1=2}] ~ ~ ~ function water/ice_cage
execute @s[tag=water,scores={moveslot1=3}] ~ ~ ~ function water/ice_throw
execute @s[tag=water,scores={moveslot1=4}] ~ ~ ~ function water/water_spear
execute @s[tag=water,scores={moveslot1=5}] ~ ~ ~ function water/water_spike
execute @s[tag=water,scores={moveslot1=6}] ~ ~ ~ function water/water_rush
scoreboard players set @s cooldown1 0