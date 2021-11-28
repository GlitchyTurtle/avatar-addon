#bridge-file-version: #223
HIDE 
#Abilities
execute @s[tag=earth,tag=!antimagic,scores={detect_sneak=1,detect_left=1,cooldown1=100,ground=1,detect_rhx=!89}] ~ ~ ~ function slot_choice/earth/earth_slot_1
execute @s[tag=earth,tag=!antimagic,scores={detect_sneak=1,cooldown1=100,ground=1,detect_rhx=-90}] ~ ~ ~ function slot_choice/earth/earth_slot_2
execute @s[tag=earth,tag=!antimagic,scores={detect_dsneak=1,cooldown1=100,ground=1,detect_rhx=!-90,detect_rhx=!80..88,detect_rhx=!-90}] ~ ~ ~ function slot_choice/earth/earth_slot_3
execute @s[tag=earth,tag=!antimagic,scores={detect_sneak=!1,detect_left=1,cooldown1=100,detect_rhx=70..89}] ~ ~ ~ function slot_choice/earth/earth_slot_4
 
#Passives
execute @s[tag=earth,tag=!antimagic,scores={detect_sprint=1,ground=1,earth_sprint=!100}] ~ ~ ~ scoreboard players add @s earth_sprint 1
execute @s[tag=earth,tag=!antimagic,scores={earth_sprint=100,ground=1}] ~ ~ ~ effect @s speed 1 2 true
execute @s[tag=earth,tag=!antimagic,scores={earth_sprint=100,ground=0}] ~ ~ ~ effect @s speed 0 0 true
execute @s[tag=earth,tag=!antimagic,scores={detect_sprint=!1}] ~ ~ ~ scoreboard players set @s earth_sprint 0
execute @a[tag=headbutt] ~ ~ ~ fill ~1 ~2 ~1 ~-1 ~0 ~-1 air 0 destroy
execute @a[tag=headbutt] ~ ~ ~ effect @e[r=5,tag=!headbutt] wither 1 5 true
execute @a[tag=headbutt,scores={cooldown1=30..}] ~ ~ ~ tag @s remove headbutt
execute @a[tag=burrow] ~ ~ ~ fill ~ ~0 ~ ~ ~2 ~ air 0 destroy
execute @a[tag=burrow,scores={cooldown1=10..}] ~ ~ ~ tag @s remove burrow
 
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ execute @s ~ ~ ~ tp @s ^ ^ ^-1 facing @p[tag=earth]
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ effect @s fatal_poison 3 255 true
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ effect @s invisibility 1 1 true
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ detect ~ ~-1 ~ grass 0 summon evocation_fang ~ ~ ~
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ detect ~ ~-1 ~ sand 0 summon evocation_fang ~ ~ ~
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ detect ~ ~-1 ~ stone 0 summon evocation_fang ~ ~ ~
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ detect ~ ~-1 ~ obsidian 0 summon evocation_fang ~ ~ ~
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ detect ~ ~-1 ~ stone 1 summon evocation_fang ~ ~ ~
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ detect ~ ~-1 ~ stone 3 summon evocation_fang ~ ~ ~
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ detect ~ ~-1 ~ stone 5 summon evocation_fang ~ ~ ~
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ detect ~ ~-1 ~ gravel 0 summon evocation_fang ~ ~ ~
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ detect ~ ~-1 ~ dirt 0 summon evocation_fang ~ ~ ~
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ detect ~ ~-1 ~ sandstone 0 summon evocation_fang ~ ~ ~