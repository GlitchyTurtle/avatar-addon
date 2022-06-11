HIDE 
execute @s[tag=earth,scores={moveslot5=1}] ~ ~ ~ function moves/earth/earth_headbutt
execute @s[tag=earth,scores={moveslot5=2}] ~ ~ ~ function moves/earth/earth_pillar
execute @s[tag=earth,scores={moveslot5=3}] ~ ~ ~ function moves/earth/earth_shove
execute @s[tag=earth,scores={moveslot5=4}] ~ ~ ~ function moves/earth/earth_lift
execute @s[tag=earth,scores={moveslot5=5}] ~ ~ ~ function moves/earth/earth_shield
execute @s[tag=earth,scores={moveslot5=6}] ~ ~ ~ function moves/earth/earth_spikes
execute @s[tag=earth,scores={moveslot5=7}] ~ ~ ~ function moves/earth/earth_burrow
execute @s[tag=earth,scores={moveslot5=8}] ~ ~ ~ function moves/earth/earth_throw
execute @s[tag=earth,scores={moveslot5=9}] ~ ~ ~ function moves/earth/earth_search
execute @s[tag=earth,scores={moveslot5=10}] ~ ~ ~ function moves/earth/earth_builder
execute @s[tag=earth,scores={moveslot5=11}] ~ ~ ~ function moves/earth/earth_hook
execute @s[tag=earth,scores={moveslot5=12}] ~ ~ ~ function moves/earth/earth_combo
execute @s[scores={moveslot5=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use your bending scroll! (slot 5)"}]}
scoreboard players set @s cooldown1 0