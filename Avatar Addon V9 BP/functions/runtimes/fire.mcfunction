HIDE 
#Abilities
function assets/actions
 
#Passives
execute @s[tag=fire,tag=!antimagic,scores={cooldown1=100}] ~~~ detect ~~~ fire 0 effect @s speed 1 0 true
execute @s[tag=fire,tag=!antimagic,scores={cooldown1=100}] ~~~ detect ~~~ flowing_lava 0 effect @s speed 10 0 true
execute @s[tag=fire_sprint] ~~~ setblock ~~~ fire 0 keep
execute @s[tag=fire_sprint] ~~~ particle a:fire_blast ~~~
execute @s[tag=fire_sprint,scores={cooldown1=100}] ~~~ tag @s remove fire_sprint
effect @s[tag=!antimagic] fire_resistance 1 1 true
execute @s[scores={cooldown1=10}] ~~~ tag @s remove kbsafe
 
#Airscooter/Fire boosters
execute @e[type=a:scooter,r=6,c=1] ~~~ particle minecraft:mobflame_single ~ ~3.1 ~
execute @s[scores={detect_rhx=-90..-20}] ~~~ execute @e[type=a:scooter,r=6,c=1] ~~~ effect @s levitation 1 3 true
execute @s[scores={detect_rhx=20..90}] ~~~ execute @e[type=a:scooter,r=6,c=1] ~~~ effect @s slow_falling 1 5 true
execute @s[scores={detect_rhx=70..90}] ~~~ execute @e[type=a:scooter,r=6,c=1] ~~~ effect @s levitation 0 0 true
execute @s[scores={detect_rhx=20..90}] ~~~ execute @e[type=a:scooter,r=6,c=1] ~~~ event entity @s gravity
execute @s[scores={detect_rhx=-19..19}] ~~~ execute @e[type=a:scooter,r=6,c=1] ~~~ event entity @s no_gravity
execute @e[type=a:scooter,r=6,c=1] ~~~ execute @p[tag=fire] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Using Boosters"}]}
 
#Combo
execute @s[tag=firecombo1,scores={cooldown1=100}] ~~~ tag @s remove firecombo1
execute @s[tag=firecombo1,scores={detect_left=1}] ~~~ function moves/fire/fire_combo_1
execute @s[tag=firecombo2,scores={detect_left=1}] ~~~ function moves/fire/fire_combo_2
execute @s[tag=fire_wall,scores={cooldown1=..99}] ~~~ damage @e[r=5,rm=0.3] 1 none
execute @s[tag=fire_wall,scores={cooldown1=..99}] ~~~ execute @e[r=5,rm=0.3] ~~~ setblock ~~~ fire 0 keep
execute @s[tag=fire_wall,scores={cooldown1=100}] ~~~ tag @s remove fire_wall

#Better
execute @e[type=a:move_helper,r=30,tag=seeking] ~~~ effect @s fatal_poison 10 5 true
execute @e[type=a:move_helper,r=30,tag=seeking] ~~~ tp @s ^ ^ ^1.5 facing @e[r=30,type=!a:move_helper,tag=!fire,c=1,type=!item]
execute @e[type=a:move_helper,r=30,tag=seeking] ~~~ particle minecraft:large_explosion ~ ~1 ~
execute @e[type=a:move_helper,r=30,tag=seeking] ~~~ particle minecraft:mobflame_single ~~1~
execute @e[type=a:move_helper,r=30,tag=seeking] ~~~ execute @e[r=2,tag=!fire,type=!a:move_helper,type=!item] ~~~ summon a:explosion_low
execute @e[type=a:move_helper,r=30,tag=seeking] ~~~ execute @e[r=2,tag=!fire,type=!a:move_helper,type=!item] ~~~ execute @e[type=a:move_helper,r=3,tag=seeking] ~~~ kill @s