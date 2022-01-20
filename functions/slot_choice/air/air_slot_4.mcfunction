#bridge-file-version: #40
HIDE 
execute @s[tag=air,scores={moveslot4=1}] ~ ~ ~ function moves/air_blast
execute @s[tag=air,scores={moveslot4=2}] ~ ~ ~ function moves/air_launch
execute @s[tag=air,scores={moveslot4=3}] ~ ~ ~ function moves/air_scooter
execute @s[tag=air,scores={moveslot4=4}] ~ ~ ~ function moves/air_push
execute @s[tag=air,scores={moveslot4=5}] ~ ~ ~ function moves/air_vanish
execute @s[tag=air,scores={moveslot4=6}] ~ ~ ~ function moves/air_rush
execute @s[tag=air,scores={moveslot4=7}] ~ ~ ~ function moves/air_shockwave
execute @s[tag=air,scores={moveslot4=8}] ~ ~ ~ function moves/air_tornado
execute @s[tag=air,scores={moveslot4=9}] ~ ~ ~ function moves/air_seeking_blast
execute @s[tag=air,scores={moveslot4=10}] ~ ~ ~ function moves/air_pull
execute @s[tag=air,scores={moveslot4=11}] ~ ~ ~ function moves/air_dodge
execute @s[scores={moveslot4=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools (slot 4)"}]}
scoreboard players set @s cooldown1 0