#bridge-file-version: #7
HIDE 
execute @s[tag=water,scores={moveslot4=1}] ~ ~ ~ function water/flood
execute @s[tag=water,scores={moveslot4=2}] ~ ~ ~ function water/ice_cage
execute @s[tag=water,scores={moveslot4=3}] ~ ~ ~ function water/ice_throw
execute @s[tag=water,scores={moveslot4=4}] ~ ~ ~ function water/water_spear
execute @s[tag=water,scores={moveslot4=5}] ~ ~ ~ function water/water_spike
execute @s[tag=water,scores={moveslot4=6}] ~ ~ ~ function water/water_rush
scoreboard players set @s cooldown1 0