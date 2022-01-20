#bridge-file-version: #58
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
 
#Airscooter/Fire boosters
execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ particle minecraft:mobflame_single ~ ~3.1 ~
execute @s[scores={detect_rhx=-90..-20}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ effect @s levitation 1 3 true
execute @s[scores={detect_rhx=20..90}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ effect @s slow_falling 1 5 true
execute @s[scores={detect_rhx=70..90}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ effect @s levitation 0 0 true
execute @s[scores={detect_rhx=20..90}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ event entity @s gravity
execute @s[scores={detect_rhx=-19..19}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ event entity @s no_gravity
execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ execute @p[tag=air] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3Using Boosters"}]}