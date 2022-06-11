HIDE 
execute @s[tag=water,scores={moveslot6=1}] ~ ~ ~ function moves/water/water_flood
execute @s[tag=water,scores={moveslot6=2}] ~ ~ ~ function moves/water/water_ice_cage
execute @s[tag=water,scores={moveslot6=3}] ~ ~ ~ function moves/water/water_ice_throw
execute @s[tag=water,scores={moveslot6=4}] ~ ~ ~ function moves/water/water_spear
execute @s[tag=water,scores={moveslot6=5}] ~ ~ ~ function moves/water/water_spike
execute @s[tag=water,scores={moveslot6=6}] ~ ~ ~ function moves/water/water_rush
execute @s[tag=water,scores={moveslot6=7}] ~ ~ ~ function moves/water/water_fountain
execute @s[tag=water,scores={moveslot6=8}] ~ ~ ~ function moves/water/water_healing
execute @s[tag=water,scores={moveslot6=9}] ~ ~ ~ function moves/water/water_life_drain
execute @s[tag=water,scores={moveslot6=10}] ~ ~ ~ function moves/water/water_splash
execute @s[tag=water,scores={moveslot6=11}] ~ ~ ~ function moves/water/water_wake
execute @s[tag=water,scores={moveslot6=12}] ~ ~ ~ function moves/water/water_combo
execute @s[scores={moveslot6=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use your bending scroll! (slot 6)"}]}
scoreboard players set @s cooldown1 0