#bridge-file-version: #26
HIDE 
execute @s[tag=earth,scores={moveslot3=1}] ~ ~ ~ function earth/earth_headbutt
execute @s[tag=earth,scores={moveslot3=2}] ~ ~ ~ function earth/earth_pillar
execute @s[tag=earth,scores={moveslot3=3}] ~ ~ ~ function earth/earth_shove
execute @s[tag=earth,scores={moveslot3=4}] ~ ~ ~ function earth/earth_lift
execute @s[tag=earth,scores={moveslot3=5}] ~ ~ ~ function earth/earth_shield
execute @s[tag=earth,scores={moveslot3=6}] ~ ~ ~ function earth/earth_spikes
scoreboard players set @s cooldown1 0