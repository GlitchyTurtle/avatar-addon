#bridge-file-version: #28
HIDE 
execute @s[tag=air,scores={moveslot3=1}] ~ ~ ~ function moves/air_blast
execute @s[tag=air,scores={moveslot3=2}] ~ ~ ~ function moves/air_launch
execute @s[tag=air,scores={moveslot3=3}] ~ ~ ~ function moves/air_scooter
execute @s[tag=air,scores={moveslot3=4}] ~ ~ ~ function moves/air_push
execute @s[tag=air,scores={moveslot3=5}] ~ ~ ~ function moves/air_vanish
execute @s[tag=air,scores={moveslot3=6}] ~ ~ ~ function moves/air_rush
execute @s[scores={moveslot3=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools"}]}
scoreboard players set @s cooldown1 0