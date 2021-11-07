#bridge-file-version: #21
HIDE 
execute @s[tag=air,scores={moveslot1=1}] ~ ~ ~ function air/air_blast
execute @s[tag=air,scores={moveslot1=2}] ~ ~ ~ function air/air_launch
execute @s[tag=air,scores={moveslot1=3}] ~ ~ ~ function air/air_scooter
execute @s[tag=air,scores={moveslot1=4}] ~ ~ ~ function air/push
execute @s[tag=air,scores={moveslot1=5}] ~ ~ ~ function air/air_vanish
execute @s[tag=air,scores={moveslot1=6}] ~ ~ ~ function air/air_rush
scoreboard players set @s cooldown1 0