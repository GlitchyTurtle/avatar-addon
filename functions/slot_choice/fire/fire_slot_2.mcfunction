#bridge-file-version: #9
HIDE 
execute @s[tag=fire,scores={moveslot2=1}] ~ ~ ~ function moves/fire_blast
execute @s[tag=fire,scores={moveslot2=2}] ~ ~ ~ function moves/fire_circle
execute @s[tag=fire,scores={moveslot2=3}] ~ ~ ~ function moves/fire_sprint
execute @s[tag=fire,scores={moveslot2=4}] ~ ~ ~ function moves/fire_launch
execute @s[tag=fire,scores={moveslot2=5}] ~ ~ ~ function moves/fire_lightning
execute @s[tag=fire,scores={moveslot2=6}] ~ ~ ~ function moves/fire_magma_floor
execute @s[scores={moveslot2=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools (slot 2)"}]}
scoreboard players set @s cooldown1 0