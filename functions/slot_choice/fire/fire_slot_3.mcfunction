#bridge-file-version: #10
HIDE 
execute @s[tag=fire,scores={moveslot3=1}] ~ ~ ~ function moves/fire_blast
execute @s[tag=fire,scores={moveslot3=2}] ~ ~ ~ function moves/fire_circle
execute @s[tag=fire,scores={moveslot3=3}] ~ ~ ~ function moves/fire_sprint
execute @s[tag=fire,scores={moveslot3=4}] ~ ~ ~ function moves/fire_launch
execute @s[tag=fire,scores={moveslot3=5}] ~ ~ ~ function moves/fire_lightning
execute @s[tag=fire,scores={moveslot3=6}] ~ ~ ~ function moves/fire_magma_floor
execute @s[tag=fire,scores={moveslot3=7}] ~ ~ ~ function moves/moves/fire_fireball
execute @s[tag=fire,scores={moveslot3=8}] ~ ~ ~ function moves/fire_jump
execute @s[tag=fire,scores={moveslot3=9}] ~ ~ ~ function moves/fire_final
execute @s[tag=fire,scores={moveslot3=10}] ~ ~ ~ function moves/fire_smite
execute @s[tag=fire,scores={moveslot3=11}] ~ ~ ~ function moves/fire_seeking_blast
execute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use /function useful_tools (slot 3)"}]}
scoreboard players set @s cooldown1 0