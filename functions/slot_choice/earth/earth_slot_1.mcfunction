#bridge-file-version: #24
HIDE 
execute @s[tag=earth,scores={moveslot1=1}] ~ ~ ~ function earth/earth_headbutt
execute @s[tag=earth,scores={moveslot1=2}] ~ ~ ~ function earth/earth_pillar
execute @s[tag=earth,scores={moveslot1=3}] ~ ~ ~ function earth/earth_shove
execute @s[tag=earth,scores={moveslot1=4}] ~ ~ ~ function earth/earth_lift
execute @s[tag=earth,scores={moveslot1=5}] ~ ~ ~ function earth/earth_shield
execute @s[tag=earth,scores={moveslot1=6}] ~ ~ ~ function earth/earth_spikes
scoreboard players set @s cooldown1 0