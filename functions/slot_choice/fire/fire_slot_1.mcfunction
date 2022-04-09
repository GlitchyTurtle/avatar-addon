#bridge-file-version: #11
HIDE 
execute @s[tag=fire,scores={moveslot1=1}] ~ ~ ~ function moves/fire_blast
execute @s[tag=fire,scores={moveslot1=2}] ~ ~ ~ function moves/fire_circle
execute @s[tag=fire,scores={moveslot1=3}] ~ ~ ~ function moves/fire_sprint
execute @s[tag=fire,scores={moveslot1=4}] ~ ~ ~ function moves/fire_launch
execute @s[tag=fire,scores={moveslot1=5}] ~ ~ ~ function moves/fire_lightning
execute @s[tag=fire,scores={moveslot1=6}] ~ ~ ~ function moves/fire_magma_floor
execute @s[tag=fire,scores={moveslot1=7}] ~ ~ ~ function moves/fire_fireball
execute @s[tag=fire,scores={moveslot1=8}] ~ ~ ~ function moves/fire_jump
execute @s[tag=fire,scores={moveslot1=9}] ~ ~ ~ function moves/fire_final
execute @s[tag=fire,scores={moveslot1=10}] ~ ~ ~ function moves/fire_smite
execute @s[tag=fire,scores={moveslot1=11}] ~ ~ ~ function moves/fire_seeking_blast
execute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools (slot 1)"}]}
scoreboard players set @s cooldown1 0
