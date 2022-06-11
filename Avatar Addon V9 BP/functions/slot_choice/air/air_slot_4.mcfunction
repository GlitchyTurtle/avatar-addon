HIDE 
execute @s[tag=air,scores={moveslot4=1}] ~ ~ ~ function moves/air/air_blast
execute @s[tag=air,scores={moveslot4=2}] ~ ~ ~ function moves/air/air_launch
execute @s[tag=air,scores={moveslot4=3}] ~ ~ ~ function moves/air/air_scooter
execute @s[tag=air,scores={moveslot4=4}] ~ ~ ~ function moves/air/air_push
execute @s[tag=air,scores={moveslot4=5}] ~ ~ ~ function moves/air/air_vanish
execute @s[tag=air,scores={moveslot4=6}] ~ ~ ~ function moves/air/air_rush
execute @s[tag=air,scores={moveslot4=7}] ~ ~ ~ function moves/air/air_shockwave
execute @s[tag=air,scores={moveslot4=8}] ~ ~ ~ function moves/air/air_tornado
execute @s[tag=air,scores={moveslot4=9}] ~ ~ ~ function moves/air/air_seeking_blast
execute @s[tag=air,scores={moveslot4=10}] ~ ~ ~ function moves/air/air_pull
execute @s[tag=air,scores={moveslot4=11}] ~ ~ ~ function moves/air/air_dodge
execute @s[tag=air,scores={moveslot4=12}] ~ ~ ~ function moves/air/air_combo
execute @s[scores={moveslot4=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use your bending scroll (slot 4)"}]}
scoreboard players set @s cooldown1 0