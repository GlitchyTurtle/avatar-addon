#bridge-file-version: #36
HIDE 
execute @s[tag=earth,scores={moveslot4=1}] ~ ~ ~ function moves/earth_headbutt
execute @s[tag=earth,scores={moveslot4=2}] ~ ~ ~ function moves/earth_pillar
execute @s[tag=earth,scores={moveslot4=3}] ~ ~ ~ function moves/earth_shove
execute @s[tag=earth,scores={moveslot4=4}] ~ ~ ~ function moves/earth_lift
execute @s[tag=earth,scores={moveslot4=5}] ~ ~ ~ function moves/earth_shield
execute @s[tag=earth,scores={moveslot4=6}] ~ ~ ~ function moves/earth_spikes
execute @s[tag=earth,scores={moveslot4=7}] ~ ~ ~ function moves/earth_burrow
execute @s[tag=earth,scores={moveslot4=8}] ~ ~ ~ function moves/earth_throw
execute @s[tag=earth,scores={moveslot4=9}] ~ ~ ~ function moves/earth_search
execute @s[tag=earth,scores={moveslot4=10}] ~ ~ ~ function moves/earth_builder
execute @s[tag=earth,scores={moveslot4=11}] ~ ~ ~ function moves/earth_hook
execute @s[scores={moveslot4=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools (slot 4)"}]}
scoreboard players set @s cooldown1 0