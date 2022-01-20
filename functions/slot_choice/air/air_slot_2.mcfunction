#bridge-file-version: #40
HIDE 
execute @s[tag=air,scores={moveslot2=1}] ~ ~ ~ function moves/air_blast
execute @s[tag=air,scores={moveslot2=2}] ~ ~ ~ function moves/air_launch
execute @s[tag=air,scores={moveslot2=3}] ~ ~ ~ function moves/air_scooter
execute @s[tag=air,scores={moveslot2=4}] ~ ~ ~ function moves/air_push
execute @s[tag=air,scores={moveslot2=5}] ~ ~ ~ function moves/air_vanish
execute @s[tag=air,scores={moveslot2=6}] ~ ~ ~ function moves/air_rush
execute @s[tag=air,scores={moveslot2=7}] ~ ~ ~ function moves/air_shockwave
execute @s[tag=air,scores={moveslot2=8}] ~ ~ ~ function moves/air_tornado
execute @s[tag=air,scores={moveslot2=9}] ~ ~ ~ function moves/air_seeking_blast
execute @s[tag=air,scores={moveslot2=10}] ~ ~ ~ function moves/air_pull
execute @s[tag=air,scores={moveslot2=11}] ~ ~ ~ function moves/air_dodge
execute @s[scores={moveslot2=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools (slot 2)"}]}
scoreboard players set @s cooldown1 0