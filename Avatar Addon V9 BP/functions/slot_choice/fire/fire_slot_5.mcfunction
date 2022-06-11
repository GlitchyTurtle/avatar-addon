HIDE 
execute @s[tag=fire,scores={moveslot5=1}] ~ ~ ~ function moves/fire/fire_blast
execute @s[tag=fire,scores={moveslot5=2}] ~ ~ ~ function moves/fire/fire_circle
execute @s[tag=fire,scores={moveslot5=3}] ~ ~ ~ function moves/fire/fire_sprint
execute @s[tag=fire,scores={moveslot5=4}] ~ ~ ~ function moves/fire/fire_launch
execute @s[tag=fire,scores={moveslot5=5}] ~ ~ ~ function moves/fire/fire_lightning
execute @s[tag=fire,scores={moveslot5=6}] ~ ~ ~ function moves/fire/fire_magma_floor
execute @s[tag=fire,scores={moveslot5=7}] ~ ~ ~ function moves/fire/fire_fireball
execute @s[tag=fire,scores={moveslot5=8}] ~ ~ ~ function moves/fire/fire_jump
execute @s[tag=fire,scores={moveslot5=9}] ~ ~ ~ function moves/fire/fire_final
execute @s[tag=fire,scores={moveslot5=10}] ~ ~ ~ function moves/fire/fire_smite
execute @s[tag=fire,scores={moveslot5=11}] ~ ~ ~ function moves/fire/fire_seeking_blast
execute @s[tag=fire,scores={moveslot5=12}] ~ ~ ~ function moves/fire/fire_combo
execute @s[scores={moveslot5=0,cooldown1=100}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cYou dont have a move set, use your bending scroll! (slot 5)"}]}
scoreboard players set @s cooldown1 0
