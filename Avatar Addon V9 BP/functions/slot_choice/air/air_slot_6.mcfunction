HIDE 
execute @s[tag=air,scores={moveslot6=1}] ~ ~ ~ function moves/air/air_blast
execute @s[tag=air,scores={moveslot6=2}] ~ ~ ~ function moves/air/air_launch
execute @s[tag=air,scores={moveslot6=3}] ~ ~ ~ function moves/air/air_scooter
execute @s[tag=air,scores={moveslot6=4}] ~ ~ ~ function moves/air/air_push
execute @s[tag=air,scores={moveslot6=5}] ~ ~ ~ function moves/air/air_vanish
execute @s[tag=air,scores={moveslot6=6}] ~ ~ ~ function moves/air/air_rush
execute @s[tag=air,scores={moveslot6=7}] ~ ~ ~ function moves/air/air_shockwave
execute @s[tag=air,scores={moveslot6=8}] ~ ~ ~ function moves/air/air_tornado
execute @s[tag=air,scores={moveslot6=9}] ~ ~ ~ function moves/air/air_seeking_blast
execute @s[tag=air,scores={moveslot6=10}] ~ ~ ~ function moves/air/air_pull
execute @s[tag=air,scores={moveslot6=11}] ~ ~ ~ function moves/air/air_dodge
execute @s[tag=air,scores={moveslot6=12}] ~ ~ ~ function moves/air/air_combo
execute @s[scores={moveslot6=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use your bending scroll (slot 6)"}]}
scoreboard players set @s cooldown1 0