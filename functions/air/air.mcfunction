#bridge-file-version: #162
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
execute @s[tag=airscooter] ~ ~ ~ tp @e[type=armor_stand,name=invis,c=1] ^ ^0.8 ^10
execute @s[tag=airscooter] ~ ~ ~ particle minecraft:egg_destroy_emitter ^ ^ ^2
execute @s[tag=airscooter] ~ ~ ~ execute @e[type=pig,name=airscooter,r=2,c=1] ~ ~ ~ tp @s ^ ^ ^1 facing @e[type=armor_stand,name=invis,c=1]
execute @s[tag=airscooter,scores={cooldown1=100}] ~ ~ ~ tag @s add dismount
execute @s[tag=airscooter] ~ ~ ~ effect @e[r=3,tag=!airscooter,type=!pig] wither 1 1 true
execute @s[tag=dismount] ~ ~ ~ tag @s remove airscooter
execute @s[tag=dismount] ~ ~ ~ kill @e[type=pig,name=airscooter,c=1]
execute @s[tag=dismount] ~ ~ ~ stopsound @s mob.pig.death
execute @s[tag=dismount] ~ ~ ~ kill @e[type=armor_stand,name=invis,c=1]
execute @s[tag=dismount] ~ ~ ~ stopsound @s mob.armor_stand.break
execute @s[tag=dismount] ~ ~ ~ kill @e[type=item,name="Raw Porkchop"]
execute @s[tag=dismount] ~ ~ ~ kill @e[type=item,name="Saddle"]
execute @s[tag=dismount] ~ ~ ~ clear @s porkchop
execute @s[tag=dismount] ~ ~ ~ clear @s saddle
execute @s[tag=dismount] ~ ~ ~ stopsound @s mob.pig.death
execute @s[tag=dismount] ~ ~ ~ stopsound @s elytra.loop
 
#Air blast
execute @s[tag=airrush] ~ ~ ~ tp @s ^ ^0.2 ^3
execute @s[tag=airrush] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @s[scores={cooldown1=20..100}] ~ ~ ~ tag @s remove airrush