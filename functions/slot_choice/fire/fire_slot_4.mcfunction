#bridge-file-version: #5
HIDE 
execute @s[tag=fire,scores={moveslot4=1}] ~ ~ ~ function fire/fire_blast
execute @s[tag=fire,scores={moveslot4=2}] ~ ~ ~ function fire/fire_circle
execute @s[tag=fire,scores={moveslot4=3}] ~ ~ ~ function fire/fire_sprint
execute @s[tag=fire,scores={moveslot4=4}] ~ ~ ~ function fire/fire_launch
execute @s[tag=fire,scores={moveslot4=5}] ~ ~ ~ function fire/lightning
execute @s[tag=fire,scores={moveslot4=6}] ~ ~ ~ function fire/magma_floor
scoreboard players set @s cooldown1 0