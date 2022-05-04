#bridge-file-version: #50
HIDE 
execute @s[tag=air,scores={moveslot1=1}] ~ ~ ~ function moves/air_blast
execute @s[tag=air,scores={moveslot1=2}] ~ ~ ~ function moves/air_launch
execute @s[tag=air,scores={moveslot1=3}] ~ ~ ~ function moves/air_scooter
execute @s[tag=air,scores={moveslot1=4}] ~ ~ ~ function moves/air_push
execute @s[tag=air,scores={moveslot1=5}] ~ ~ ~ function moves/air_vanish
execute @s[tag=air,scores={moveslot1=6}] ~ ~ ~ function moves/air_rush
execute @s[tag=air,scores={moveslot1=7}] ~ ~ ~ function moves/air_shockwave
execute @s[tag=air,scores={moveslot1=8}] ~ ~ ~ function moves/air_tornado
execute @s[tag=air,scores={moveslot1=9}] ~ ~ ~ function moves/air_seeking_blast
execute @s[tag=air,scores={moveslot1=10}] ~ ~ ~ function moves/air_pull
execute @s[tag=air,scores={moveslot1=11}] ~ ~ ~ function moves/air_dodge
execute @s[tag=air,scores={moveslot1=12}] ~ ~ ~ function moves/air_combo
execute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools (slot 1)"}]}
scoreboard players set @s cooldown1 0