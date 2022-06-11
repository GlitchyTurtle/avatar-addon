HIDE 
execute @s[tag=earth,scores={moveslot3=1}] ~ ~ ~ function moves/earth/earth_headbutt
execute @s[tag=earth,scores={moveslot3=2}] ~ ~ ~ function moves/earth/earth_pillar
execute @s[tag=earth,scores={moveslot3=3}] ~ ~ ~ function moves/earth/earth_shove
execute @s[tag=earth,scores={moveslot3=4}] ~ ~ ~ function moves/earth/earth_lift
execute @s[tag=earth,scores={moveslot3=5}] ~ ~ ~ function moves/earth/earth_shield
execute @s[tag=earth,scores={moveslot3=6}] ~ ~ ~ function moves/earth/earth_spikes
execute @s[tag=earth,scores={moveslot3=7}] ~ ~ ~ function moves/earth/earth_burrow
execute @s[tag=earth,scores={moveslot3=8}] ~ ~ ~ function moves/earth/earth_throw
execute @s[tag=earth,scores={moveslot3=9}] ~ ~ ~ function moves/earth/earth_search
execute @s[tag=earth,scores={moveslot3=10}] ~ ~ ~ function moves/earth/earth_builder
execute @s[tag=earth,scores={moveslot3=11}] ~ ~ ~ function moves/earth/earth_hook
execute @s[tag=earth,scores={moveslot3=12}] ~ ~ ~ function moves/earth/earth_combo
execute @s[scores={moveslot3=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use your bending scroll! (slot 3)"}]}
scoreboard players set @s cooldown1 0