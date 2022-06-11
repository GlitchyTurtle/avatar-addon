HIDE 
execute @s[tag=fire,scores={moveslot3=1}] ~ ~ ~ function moves/fire/fire_blast
execute @s[tag=fire,scores={moveslot3=2}] ~ ~ ~ function moves/fire/fire_circle
execute @s[tag=fire,scores={moveslot3=3}] ~ ~ ~ function moves/fire/fire_sprint
execute @s[tag=fire,scores={moveslot3=4}] ~ ~ ~ function moves/fire/fire_launch
execute @s[tag=fire,scores={moveslot3=5}] ~ ~ ~ function moves/fire/fire_lightning
execute @s[tag=fire,scores={moveslot3=6}] ~ ~ ~ function moves/fire/fire_magma_floor
execute @s[tag=fire,scores={moveslot3=7}] ~ ~ ~ function moves/fire/fire_fireball
execute @s[tag=fire,scores={moveslot3=8}] ~ ~ ~ function moves/fire/fire_jump
execute @s[tag=fire,scores={moveslot3=9}] ~ ~ ~ function moves/fire/fire_final
execute @s[tag=fire,scores={moveslot3=10}] ~ ~ ~ function moves/fire/fire_smite
execute @s[tag=fire,scores={moveslot3=11}] ~ ~ ~ function moves/fire/fire_seeking_blast
execute @s[tag=fire,scores={moveslot3=12}] ~ ~ ~ function moves/fire/fire_combo
execute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use your bending scroll! (slot 3)"}]}
scoreboard players set @s cooldown1 0
