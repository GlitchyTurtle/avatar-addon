#bridge-file-version: #8
HIDE 
execute @s[tag=fire,scores={moveslot1=1}] ~ ~ ~ function moves/fire_blast
execute @s[tag=fire,scores={moveslot1=2}] ~ ~ ~ function moves/fire_circle
execute @s[tag=fire,scores={moveslot1=3}] ~ ~ ~ function moves/fire_sprint
execute @s[tag=fire,scores={moveslot1=4}] ~ ~ ~ function moves/fire_launch
execute @s[tag=fire,scores={moveslot1=5}] ~ ~ ~ function moves/fire_lightning
execute @s[tag=fire,scores={moveslot1=6}] ~ ~ ~ function moves/fire_magma_floor
execute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools"}]}
scoreboard players set @s cooldown1 0