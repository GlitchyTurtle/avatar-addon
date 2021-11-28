#bridge-file-version: #48
HIDE 
#Abilities
execute @s[tag=fire,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_rhx=70..89}] ~ ~ ~ function slot_choice/fire/fire_slot_1
execute @s[tag=fire,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_rhx=-90..-80}] ~ ~ ~ function slot_choice/fire/fire_slot_2
execute @s[tag=fire,tag=!antimagic,scores={cooldown1=100,detect_left=1,detect_sneak=1}] ~ ~ ~ function slot_choice/fire/fire_slot_3
execute @s[tag=fire,tag=!antimagic,scores={cooldown1=100,detect_dsneak=1}] ~ ~ ~ function slot_choice/fire/fire_slot_4
 
#Passives
execute @s[tag=fire,tag=!antimagic,scores={cooldown1=100}] ~ ~ ~ detect ~ ~ ~ fire 0 effect @s speed 1 0 true
execute @s[tag=fire,tag=!antimagic,scores={cooldown1=100}] ~ ~ ~ detect ~ ~ ~ flowing_lava 0 effect @s speed 10 0 true
execute @s[tag=fire_sprint] ~ ~ ~ setblock ~ ~ ~ fire 0 keep
execute @s[tag=fire_sprint,scores={cooldown1=100}] ~ ~ ~ tag @s remove fire_sprint
effect @s[tag=!antimagic] fire_resistance 1 1 true
execute @s[tag=fire_launch] ~ ~ ~ effect @s levitation 1 5 true
execute @s[tag=fire_launch] ~ ~ ~ effect @s slow_falling 10 10 true
execute @s[tag=fire_launch] ~ ~ ~ particle minecraft:basic_flame_particle ~ ~ ~
execute @s[tag=fire_launch] ~ ~ ~ particle minecraft:mobflame_single ~ ~-0.5 ~
execute @s[tag=fire_launch,scores={cooldown1=100}] ~ ~ ~ effect @s levitation 0 5 true
execute @s[tag=fire_launch,scores={cooldown1=100}] ~ ~ ~ tag @s remove fire_launch