#bridge-file-version: #7
HIDE 
execute @s[tag=fire,scores={moveslot3=1}] ~ ~ ~ function moves/fire_blast
execute @s[tag=fire,scores={moveslot3=2}] ~ ~ ~ function moves/fire_circle
execute @s[tag=fire,scores={moveslot3=3}] ~ ~ ~ function moves/fire_sprint
execute @s[tag=fire,scores={moveslot3=4}] ~ ~ ~ function moves/fire_launch
execute @s[tag=fire,scores={moveslot3=5}] ~ ~ ~ function moves/fire_lightning
execute @s[tag=fire,scores={moveslot3=6}] ~ ~ ~ function moves/fire_magma_floor
execute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"You dont have a move set, use /function useful_tools"}]}
scoreboard players set @s cooldown1 0