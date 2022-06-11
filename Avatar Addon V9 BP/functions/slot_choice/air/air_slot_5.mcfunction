HIDE 
execute @s[tag=air,scores={moveslot5=1}] ~ ~ ~ function moves/air/air_blast
execute @s[tag=air,scores={moveslot5=2}] ~ ~ ~ function moves/air/air_launch
execute @s[tag=air,scores={moveslot5=3}] ~ ~ ~ function moves/air/air_scooter
execute @s[tag=air,scores={moveslot5=4}] ~ ~ ~ function moves/air/air_push
execute @s[tag=air,scores={moveslot5=5}] ~ ~ ~ function moves/air/air_vanish
execute @s[tag=air,scores={moveslot5=6}] ~ ~ ~ function moves/air/air_rush
execute @s[tag=air,scores={moveslot5=7}] ~ ~ ~ function moves/air/air_shockwave
execute @s[tag=air,scores={moveslot5=8}] ~ ~ ~ function moves/air/air_tornado
execute @s[tag=air,scores={moveslot5=9}] ~ ~ ~ function moves/air/air_seeking_blast
execute @s[tag=air,scores={moveslot5=10}] ~ ~ ~ function moves/air/air_pull
execute @s[tag=air,scores={moveslot5=11}] ~ ~ ~ function moves/air/air_dodge
execute @s[tag=air,scores={moveslot5=12}] ~ ~ ~ function moves/air/air_combo
execute @s[scores={moveslot5=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use your bending scroll! (slot 5)"}]}
scoreboard players set @s cooldown1 0