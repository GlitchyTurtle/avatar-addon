#bridge-file-version: #30
HIDE 
execute @s[tag=earth,scores={moveslot3=1}] ~ ~ ~ function moves/earth_headbutt
execute @s[tag=earth,scores={moveslot3=2}] ~ ~ ~ function moves/earth_pillar
execute @s[tag=earth,scores={moveslot3=3}] ~ ~ ~ function moves/earth_shove
execute @s[tag=earth,scores={moveslot3=4}] ~ ~ ~ function moves/earth_lift
execute @s[tag=earth,scores={moveslot3=5}] ~ ~ ~ function moves/earth_shield
execute @s[tag=earth,scores={moveslot3=6}] ~ ~ ~ function moves/earth_spikes
execute @s[scores={moveslot3=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools"}]}
scoreboard players set @s cooldown1 0