HIDE 
execute @s[tag=water,scores={moveslot2=1}] ~ ~ ~ function moves/water/water_flood
execute @s[tag=water,scores={moveslot2=2}] ~ ~ ~ function moves/water/water_ice_cage
execute @s[tag=water,scores={moveslot2=3}] ~ ~ ~ function moves/water/water_ice_throw
execute @s[tag=water,scores={moveslot2=4}] ~ ~ ~ function moves/water/water_spear
execute @s[tag=water,scores={moveslot2=5}] ~ ~ ~ function moves/water/water_spike
execute @s[tag=water,scores={moveslot2=6}] ~ ~ ~ function moves/water/water_rush
execute @s[tag=water,scores={moveslot2=7}] ~ ~ ~ function moves/water/water_fountain
execute @s[tag=water,scores={moveslot2=8}] ~ ~ ~ function moves/water/water_healing
execute @s[tag=water,scores={moveslot2=9}] ~ ~ ~ function moves/water/water_life_drain
execute @s[tag=water,scores={moveslot2=10}] ~ ~ ~ function moves/water/water_splash
execute @s[tag=water,scores={moveslot2=11}] ~ ~ ~ function moves/water/water_wake
execute @s[tag=water,scores={moveslot2=12}] ~ ~ ~ function moves/water/water_combo
execute @s[scores={moveslot2=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use your bending scroll! (slot 2)"}]}
scoreboard players set @s cooldown1 0