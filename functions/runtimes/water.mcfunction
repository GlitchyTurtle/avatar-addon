#bridge-file-version: #153
HIDE 
#Abilities
execute @s[tag=water,tag=!antimagic,tag=!ice_throw,scores={cooldown1=100,detect_sneak=1,detect_left=1}] ~ ~ ~ function slot_choice/water/water_slot_1
execute @s[tag=water,tag=!antimagic,tag=!ice_throw,scores={cooldown1=100,detect_dsneak=1,detect_rhx=!70..89}] ~ ~ ~ function slot_choice/water/water_slot_2
execute @s[tag=water,tag=!antimagic,tag=!ice_throw,scores={cooldown1=100,cooldown1=100,detect_left=1,detect_rhx=-90..-80}] ~ ~ ~ function slot_choice/water/water_slot_3
execute @s[tag=water,tag=!antimagic,tag=!ice_throw,scores={cooldown1=100,detect_dsneak=1,detect_rhx=70..89}] ~ ~ ~ function slot_choice/water/water_slot_4
 
#Passives
execute @s ~ ~ ~ detect ~ ~ ~ water 0 effect @s conduit_power 2 2 true
 
#Ice Throw
execute @s[tag=water] ~ ~ ~ effect @e[name=ice_throw] invisibility 1 255 true
execute @s[tag=water] ~ ~ ~ tp @e[r=10,name=ice_throw,tag=!thrown] ^ ^0.3 ^3
execute @e[name=ice_throw] ~ ~ ~ tp @s ~ ~ ~ facing @p
execute @s[tag=ice_throw] ~ ~ ~ replaceitem entity @e[type=armor_stand,name=ice_throw] slot.weapon.mainhand 0 blue_ice 1 1
 
execute @s[tag=water,scores={detect_dsneak=1}] ~ ~ ~ tag @e[r=10,name=ice_throw] add thrown
execute @e[tag=thrown] ~ ~ ~ effect @s fatal_poison 3 255 true
execute @e[tag=thrown] ~ ~ ~ effect @e[r=3] wither 1 3 true
execute @e[tag=thrown] ~ ~ ~ tp @s ^ ^ ^-1 facing @p[tag=water]
tag @s remove ice_throw
 
tp @s[tag=selfrush] ^ ^ ^3 facing @e[tag=!selfrush,c=1,type=!item,type=!xp_orb]
execute @s[tag=selfrush] ~ ~ ~ execute @e[r=3,tag=!selfrush] ~ ~ ~ tag @a[r=4] remove selfrush
execute @s[tag=selfrush] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~