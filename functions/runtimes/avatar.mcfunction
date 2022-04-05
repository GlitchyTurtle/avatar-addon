#bridge-file-version: #179
HIDE 
#Abilities
execute @s[tag=avatar,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_rhx=-90}] ~ ~ ~ function slot_choice/avatar/avatar_slot_1
execute @s[tag=avatar,tag=!antimagic,scores={cooldown1=100,detect_rhx=70..89,detect_left=1}] ~ ~ ~ slot_choice/avatar/avatar_slot_2
execute @s[tag=avatar,tag=!antimagic,scores={cooldown1=100,detect_dsneak=1}] ~ ~ ~ slot_choice/avatar/avatar_slot_3
execute @s[tag=avatar,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_left=1}] ~ ~ ~ slot_choice/avatar/avatar_slot_4
 
#Passives
execute @s[tag=avatar,tag=!antimagic] ~ ~ ~ detect ~ ~ ~ water 0 effect @s strength 1 1 true
execute @s[tag=avatar,tag=!antimagic,scores={detect_sprint=1,ground=1,earth_sprint=!100}] ~ ~ ~ scoreboard players add @s earth_sprint 1
execute @s[tag=avatar,tag=!antimagic,scores={earth_sprint=100,ground=1}] ~ ~ ~ effect @s speed 1 2 true
execute @s[tag=avatar,tag=!antimagic,scores={earth_sprint=100,ground=0}] ~ ~ ~ effect @s speed 0 0 true
execute @s[tag=avatar,tag=!antimagic,scores={detect_sprint=!1}] ~ ~ ~ scoreboard players set @s earth_sprint 0
execute @s[tag=avatar,tag=!antimagic,scores={cooldown1=100}] ~ ~ ~ detect ~ ~ ~ fire 0 effect @s speed 1 0 true
execute @s[tag=avatar,tag=!antimagic,scores={cooldown1=100}] ~ ~ ~ detect ~ ~ ~ flowing_lava 0 effect @s speed 10 0 true
effect @s[tag=!antimagic] fire_resistance 1 1 true
 
#Element Spin
execute @s[tag=avatar] ~ ~ ~ effect @e[name=airspin] invisibility 1 255 true
execute @s[tag=avatar] ~ ~ ~ execute @e[type=armor_stand,name=airspin] ~ ~ ~ particle minecraft:endrod ~ ~ ~
execute @s[tag=avatar] ~ ~ ~ execute @e[type=armor_stand,name=airspin] ~ ~ ~ particle minecraft:endrod ~ ~0.4 ~
execute @s[tag=avatar] ~ ~ ~ execute @e[type=armor_stand,name=airspin] ~ ~ ~ particle minecraft:endrod ~ ~0.6 ~
execute @s[tag=avatar] ~ ~ ~ execute @e[type=armor_stand,name=airspin] ~ ~ ~ particle minecraft:endrod ~ ~1 ~
execute @s[tag=avatar] ~ ~ ~ execute @e[type=armor_stand,name=airspin] ~ ~ ~ tp @s ^0.8 ^ ^0.1 facing @p[tag=avatar]
execute @s[tag=avatar] ~ ~ ~ execute @e[type=armor_stand,name=airspin,r=90,rm=8] ~ ~ ~2 tp @s @p[tag=avatar]
execute @s[tag=avatar_state,tag=element_spin] ~ ~ ~ execute @e[r=3.8,tag=!element_spin,type=!armor_stand] ~ ~ ~ effect @s wither 1 1 true
execute @s[tag=avatar_state,tag=element_spin] ~ ~ ~ execute @e[r=3.8,tag=!element_spin,type=!armor_stand] ~ ~ ~ tp @s ^ ^ ^-0.5 facing @p[tag=element_spin]
execute @s[tag=avatar_state,tag=element_spin,scores={detect_sneak=0,detect_rhx=!80..89}] ~ ~ ~ kill @e[name=airspin]
execute @s[tag=avatar_state,tag=element_spin,scores={detect_sneak=0,detect_rhx=!80..89}] ~ ~ ~ tag @s remove element_spin
execute @s[tag=avatar_state,tag=!element_spin,scores={detect_sneak=1,detect_rhx=80..89}] ~ ~ ~ function avatar/element_spin
execute @s[tag=avatar_state,tag=!element_spin,scores={detect_sneak=1,detect_rhx=80..89}] ~ ~ ~ tag @s add element_spin
 
#Avatar State
effect @s[tag=avatar_state] absorption 5 5 true
effect @s[tag=avatar_state] resistance 10 10 true
effect @s[tag=avatar_state] strength 10 10 true
effect @s[tag=avatar_state] speed 2 2 true
effect @s[tag=avatar_state] regeneration 2 5 true
effect @s[tag=avatar_state] haste 5 5 true
execute @s[tag=avatar_state] ~ ~ ~ function moves/avatar_particle
