#bridge-file-version: #4
HIDE 
execute @s[tag=fire,scores={moveslot3=1}] ~ ~ ~ function fire/fire_blast
execute @s[tag=fire,scores={moveslot3=2}] ~ ~ ~ function fire/fire_circle
execute @s[tag=fire,scores={moveslot3=3}] ~ ~ ~ function fire/fire_sprint
execute @s[tag=fire,scores={moveslot3=4}] ~ ~ ~ function fire/fire_launch
execute @s[tag=fire,scores={moveslot3=5}] ~ ~ ~ function fire/lightning
execute @s[tag=fire,scores={moveslot3=6}] ~ ~ ~ function fire/magma_floor
scoreboard players set @s cooldown1 0