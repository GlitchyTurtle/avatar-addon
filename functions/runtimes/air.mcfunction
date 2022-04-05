#bridge-file-version: #285
HIDE 
#Abilities
execute @s[tag=air,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_rhx=-90}] ~ ~ ~ function slot_choice/air/air_slot_1
execute @s[tag=air,tag=!antimagic,scores={cooldown1=100,detect_rhx=70..89,detect_left=1}] ~ ~ ~ function slot_choice/air/air_slot_2
execute @s[tag=air,tag=!antimagic,scores={cooldown1=100,detect_dsneak=1}] ~ ~ ~ function slot_choice/air/air_slot_3
execute @s[tag=air,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_left=1}] ~ ~ ~ function slot_choice/air/air_slot_4
 
#Passives
execute @s[tag=air,tag=!antimagic,scores={detect_sneak=1,air_invis=!100,detect_dsneak=0}] ~ ~ ~ scoreboard players add @s air_invis 1
execute @s[tag=air,tag=!antimagic,scores={detect_sneak=0,detect_dsneak=0}] ~ ~ ~ scoreboard players set @s air_invis 0
execute @s[tag=air,tag=!antimagic,scores={detect_sneak=1,air_invis=100,detect_dsneak=0}] ~ ~ ~ effect @s invisibility 1 1 true
execute @s[tag=air,tag=!antimagic,scores={detect_sneak=1,air_invis=100,detect_dsneak=0}] ~ ~ ~ particle minecraft:end_chest ~ ~ ~
 
execute @s[tag=air,scores={air_invis=!100}] ~ ~ ~ tag @s add air_invis
execute @s[tag=air,tag=air_invis,scores={air_invis=100}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Light Bend "},{"score":{"name": "@s","objective": "air_invis"}},{"text":"%"}]}
execute @s[tag=air,scores={air_invis=100}] ~ ~ ~ tag @s remove air_invis
execute @s[tag=air,scores={detect_sneak=0}] ~ ~ ~ tag @s remove air_invis
execute @s[tag=air,tag=air_invis] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Light Bend "},{"score":{"name": "@s","objective": "air_invis"}},{"text":"%"}]}
 
#Airscooter
execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~2.1 ~
execute @s[scores={detect_rhx=-90..-20}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ effect @s levitation 1 3 true
execute @s[scores={detect_rhx=20..90}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ effect @s slow_falling 1 5 true
execute @s[scores={detect_rhx=70..90}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ effect @s levitation 0 0 true
execute @s[scores={detect_rhx=20..90}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ event entity @s gravity
execute @s[scores={detect_rhx=-19..19}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ event entity @s no_gravity
execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ execute @p[tag=air] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3Using Airscooter"}]}
 
execute @s[scores={level=0..5}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ damage @e[r=3,tag=!air,type=!a:scooter] 1 none #effect @e[r=3,tag=!air,type=!a:scooter] wither 2 2 true
execute @s[scores={level=6..10}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ damage @e[r=3,tag=!air,type=!a:scooter] 2 none
execute @s[scores={level=11..99}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ damage @e[r=3,tag=!air,type=!a:scooter] 4 none
execute @s[scores={level=100..}] ~ ~ ~ execute @e[type=a:scooter,r=6,c=1] ~ ~ ~ damage @e[r=3,tag=!air,type=!a:scooter] 10 none
 
#Air blast
execute @s[tag=airrush] ~ ~ ~ tp @s ^ ^0.2 ^3
execute @s[tag=airrush] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @s[scores={cooldown1=20..100}] ~ ~ ~ tag @s remove airrush
 
#Air shockwave
execute @s[tag=shockwave] ~ ~ ~ execute @e[r=20,type=armor_stand,name=shockwave_air] ~ ~ ~ effect @s invisibility 1 1 true
execute @s[tag=shockwave] ~ ~ ~ execute @e[r=20,type=armor_stand,name=shockwave_air] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~0.5 ~
execute @s[tag=shockwave,scores={level=0..5}] ~ ~ ~ execute @e[r=20,type=armor_stand,name=shockwave_air] ~ ~ ~ damage @e[r=3,tag=!shockwave] 1 none
execute @s[tag=shockwave,scores={level=6..10}] ~ ~ ~ execute @e[r=20,type=armor_stand,name=shockwave_air] ~ ~ ~ damage @e[r=3,tag=!shockwave] 2 none
execute @s[tag=shockwave,scores={level=11..99}] ~ ~ ~ execute @e[r=20,type=armor_stand,name=shockwave_air] ~ ~ ~ damage @e[r=3,tag=!shockwave] 4 none
execute @s[tag=shockwave,scores={level=100..}] ~ ~ ~ execute @e[r=20,type=armor_stand,name=shockwave_air] ~ ~ ~ damage @e[r=3,tag=!shockwave] 10 none
execute @s[tag=shockwave] ~ ~ ~ execute @e[r=10,type=armor_stand,name=shockwave_air] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=shockwave]
execute @s[tag=shockwave,scores={cooldown1=50..}] ~ ~ ~ tag @s remove shockwave
 
#Air Tornado
execute @s ~ ~ ~ execute @e[r=43,type=a:move_helper,tag=tornado,c=1] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=air]
execute @s ~ ~ ~ execute @e[r=43,type=a:move_helper,tag=tornado,c=1] ~ ~ ~ execute @e[r=5,tag=!air,tag=!tornado] ~ ~ ~ tp @s ^ ^ ^0.2 facing @e[r=6,type=a:move_helper,tag=tornado,c=1]
execute @s[scores={level=0..5}] ~ ~ ~ execute @e[r=43,type=a:move_helper,tag=tornado,c=1] ~ ~ ~ execute @e[r=5,tag=!air,tag=!tornado] ~ ~ ~ damage @s 1 none
execute @s[scores={level=6..10}] ~ ~ ~ execute @e[r=43,type=a:move_helper,tag=tornado,c=1] ~ ~ ~ execute @e[r=5,tag=!air,tag=!tornado] ~ ~ ~ damage @s 2 none
execute @s[scores={level=11..99}] ~ ~ ~ execute @e[r=43,type=a:move_helper,tag=tornado,c=1] ~ ~ ~ execute @e[r=5,tag=!air,tag=!tornado] ~ ~ ~ damage @s 4 none
execute @s[scores={level=100..}] ~ ~ ~ execute @e[r=43,type=a:move_helper,tag=tornado,c=1] ~ ~ ~ execute @e[r=5,tag=!air,tag=!tornado] ~ ~ ~ damage @s 10 none
execute @s ~ ~ ~ execute @e[r=43,type=a:move_helper,tag=tornado,c=1] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~-1 ~
execute @s ~ ~ ~ execute @e[r=43,type=a:move_helper,tag=tornado,c=1] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~1 ~
execute @s ~ ~ ~ execute @e[r=43,type=a:move_helper,tag=tornado,c=1] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~3 ~
execute @s ~ ~ ~ execute @e[r=43,type=a:move_helper,tag=tornado,c=1] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~5 ~
 
#Better
execute @e[type=a:move_helper,r=30,tag=seeking] ~ ~ ~ effect @s fatal_poison 10 5 true
execute @e[type=a:move_helper,r=30,tag=seeking] ~ ~ ~ tp @s ^ ^ ^1.5 facing @e[r=30,type=!a:move_helper,tag=!air,c=1,type=!item]
execute @e[type=a:move_helper,r=30,tag=seeking] ~ ~ ~ particle minecraft:large_explosion ~ ~1 ~
execute @e[type=a:move_helper,r=30,tag=seeking] ~ ~ ~ execute @e[r=2,tag=!air,type=!a:move_helper,type=!item] ~ ~ ~ summon a:explosion_low
execute @e[type=a:move_helper,r=30,tag=seeking] ~ ~ ~ execute @e[r=2,tag=!air,type=!a:move_helper,type=!item] ~ ~ ~ execute @e[type=a:move_helper,r=3,tag=seeking] ~ ~ ~ kill @s