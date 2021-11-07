#bridge-file-version: #23
HIDE 
scoreboard players set @s cooldown1 0
execute @s[tag=air,scores={moveslot2=1}] ~ ~ ~ function air/air_blast
execute @s[tag=air,scores={moveslot2=2}] ~ ~ ~ function air/air_launch
execute @s[tag=air,scores={moveslot2=3}] ~ ~ ~ function air/air_scooter
execute @s[tag=air,scores={moveslot2=4}] ~ ~ ~ function air/push
execute @s[tag=air,scores={moveslot2=5}] ~ ~ ~ function air/air_vanish
execute @s[tag=air,scores={moveslot2=6}] ~ ~ ~ function air/air_rush