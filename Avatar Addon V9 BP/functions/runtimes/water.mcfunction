HIDE 
#Abilities
function assets/actions

#Passives
execute @s ~ ~ ~ detect ~ ~ ~ water 0 effect @s conduit_power 2 2 true
 
#Ice Throw
execute @s[tag=water] ~ ~ ~ effect @e[name=ice_throw] invisibility 1 255 true
execute @s[tag=water] ~ ~ ~ tp @e[r=10,name=ice_throw,tag=!thrown] ^ ^0.3 ^3
execute @e[name="ice_throw"] ~ ~ ~ tp @s ~ ~ ~ facing @p
execute @s[tag=ice_throw] ~ ~ ~ replaceitem entity @e[type=armor_stand,name=ice_throw] slot.weapon.mainhand 0 blue_ice 1 1
 
execute @s[tag=water,scores={detect_dsneak=1}] ~ ~ ~ tag @e[r=10,name=ice_throw] add thrown
execute @e[tag=thrown] ~ ~ ~ effect @s fatal_poison 3 255 true
execute @e[tag=thrown] ~ ~ ~ damage @e[r=3] 1 none
execute @e[tag=thrown] ~ ~ ~ tp @s ^ ^ ^-1 facing @p[tag=water]
tag @s remove ice_throw
 
tp @s[tag=selfrush] ^ ^ ^3 facing @e[tag=!selfrush,c=1,type=!item,type=!xp_orb]
execute @s[tag=selfrush] ~ ~ ~ execute @e[r=3,tag=!selfrush] ~ ~ ~ tag @a[r=4] remove selfrush
execute @s[tag=selfrush] ~ ~ ~ particle a:water_dodge ~~~
 
execute @s[tag=full_moon] ~ ~ ~ effect @s strength 20 5 true
execute @s[tag=full_moon] ~ ~ ~ effect @s resistance 20 2 true

execute @s[tag=watercombo1,scores={cooldown1=100}] ~ ~ ~ tag @s remove watercombo1
execute @s[tag=watercombo2,scores={cooldown1=100}] ~ ~ ~ tag @s remove watercombo2
execute @s[tag=watercombo1,scores={detect_left=1}] ~ ~ ~ function moves/water/water_combo_1
execute @s[tag=watercombo2,scores={detect_left=1}] ~ ~ ~ function moves/water/water_combo_2

execute @s[tag=tidal_push,scores={cooldown1=0}] ~~~ structure load water_1 ~-4~~-4
execute @s[tag=tidal_push,scores={cooldown1=2}] ~~~ fill ~5~5~5~-5~-5~-5 air 0 replace water
execute @s[tag=tidal_push,scores={cooldown1=2}] ~~~ structure load water_2 ~-4~~-4
execute @s[tag=tidal_push,scores={cooldown1=4}] ~~~ fill ~5~5~5~-5~-5~-5 air 0 replace water
execute @s[tag=tidal_push,scores={cooldown1=4}] ~~~ structure load water_3 ~-4~~-4
execute @s[tag=tidal_push,scores={cooldown1=6}] ~~~ fill ~5~5~5~-5~-5~-5 air 0 replace water
execute @s[tag=tidal_push,scores={cooldown1=6}] ~~~ structure load water_4 ~-4~~-4
execute @s[tag=tidal_push,scores={cooldown1=8}] ~~~ fill ~5~5~5~-5~-5~-5 air 0 replace water
execute @s[tag=tidal_push,scores={cooldown1=8}] ~~~ structure load water_5 ~-4~~-4
execute @s[tag=tidal_push,scores={cooldown1=15..40}] ~~~ fill ~5~5~5~-5~-5~-5 air 0 replace water
execute @s[tag=tidal_push,scores={cooldown1=40..}] ~~~ tag @s remove tidal_push
execute @s[scores={cooldown1=10..}] ~~~ tag @s remove kbsafe