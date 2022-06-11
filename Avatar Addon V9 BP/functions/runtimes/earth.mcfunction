HIDE 
#Abilities
function assets/actions

#Passives
execute @s[tag=earth,tag=!antimagic,scores={detect_sprint=1,ground=1,earth_sprint=!100}] ~ ~ ~ scoreboard players add @s earth_sprint 1
execute @s[tag=earth,tag=!antimagic,scores={earth_sprint=100,ground=1}] ~ ~ ~ effect @s speed 5 3 true
execute @s[tag=earth,tag=!antimagic,scores={earth_sprint=100,ground=1}] ~ ~ ~ particle a:earth_sprint ~~~
execute @s[tag=earth,tag=!antimagic,scores={earth_sprint=100,ground=1}] ~ ~ ~ camerashake add @s 0.1 0.1 positional
execute @s[tag=earth,tag=!antimagic,scores={earth_sprint=100,ground=0}] ~ ~ ~ effect @s speed 0 0 true
execute @s[tag=earth,tag=!antimagic,scores={detect_sprint=!1}] ~ ~ ~ scoreboard players set @s earth_sprint 0

execute @a[tag=headbutt] ~ ~ ~ fill ~1 ~2 ~1 ~-1 ~0 ~-1 air 0 destroy
execute @a[tag=headbutt] ~ ~ ~ damage @e[r=5,tag=!headbutt] 2 none
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
 
execute @s[scores={cooldown1=100}] ~ ~ ~ execute @e[tag=drop_back_down,type=a:move_helper] ~ ~ ~ execute @s ~ ~ ~ clone ~5 ~4 ~5 ~-5 ~-4 ~-5 ~-5 ~-10 ~-5 masked move
execute @s[scores={cooldown1=100}] ~ ~ ~ execute @e[tag=drop_back_down,type=a:move_helper] ~ ~ ~ execute @e[r=10] ~ ~ ~ tp @s ~ ~-6 ~
execute @s[scores={cooldown1=100}] ~ ~ ~ execute @e[tag=drop_back_down,type=a:move_helper] ~ ~ ~ kill @s
 
#Earth Throw
execute @s[tag=earth] ~ ~ ~ effect @e[name=earth_throw] invisibility 1 255 true
execute @s[tag=earth] ~ ~ ~ effect @e[name=earth_throw] fire_resistance 1 255 true
execute @s[tag=earth] ~ ~ ~ tp @e[r=10,name=earth_throw,tag=!thrown] ^ ^0.3 ^3
execute @e[name=earth_throw] ~ ~ ~ tp @s ~ ~ ~ facing @p
execute @s[tag=earth_throw] ~ ~ ~ replaceitem entity @e[type=armor_stand,name=earth_throw] slot.weapon.mainhand 0 dirt 1 1
 
execute @s[tag=earth,scores={detect_dsneak=1}] ~ ~ ~ tag @e[r=10,name=earth_throw] add thrown
execute @e[tag=thrown] ~ ~ ~ effect @s fatal_poison 5 255 true
execute @e[tag=thrown] ~ ~ ~ detect ~ ~ ~ dirt 0 summon a:explosion ~ ~ ~
execute @e[tag=thrown] ~ ~ ~ damage @e[r=3] 2 none
execute @e[tag=thrown] ~ ~ ~ tp @s ^ ^ ^-1 facing @p[tag=earth]
tag @s remove earth_throw
 
#Builder Mode
execute @s[tag=builder_mode] ~ ~ ~ particle minecraft:redstone_ore_dust_particle ^ ^1 ^1
execute @s[tag=builder_mode] ~ ~ ~ particle minecraft:redstone_ore_dust_particle ^ ^1 ^2
execute @s[tag=builder_mode] ~ ~ ~ particle minecraft:redstone_ore_dust_particle ^ ^1 ^3
execute @s[tag=builder_mode] ~ ~ ~ particle minecraft:redstone_ore_dust_particle ^ ^1 ^4
execute @s[tag=builder_mode] ~ ~ ~ particle minecraft:redstone_ore_dust_particle ^ ^1 ^5
execute @s[tag=builder_mode]  ^ ^1 ^1 detect ~ ~ ~ dirt 0 clone ~~~ ~~~ ~~1~
execute @s[tag=builder_mode]  ^ ^1 ^2 detect ~ ~ ~ dirt 0 clone ~~~ ~~~ ~~1~
execute @s[tag=builder_mode]  ^ ^1 ^3 detect ~ ~ ~ dirt 0 clone ~~~ ~~~ ~~1~
execute @s[tag=builder_mode]  ^ ^1 ^4 detect ~ ~ ~ dirt 0 clone ~~~ ~~~ ~~1~
execute @s[tag=builder_mode]  ^ ^1 ^5 detect ~ ~ ~ dirt 0 clone ~~~ ~~~ ~~1~
execute @p[tag=builder_mode] ^ ^1 ^1 detect ~ ~ ~ grass 0 clone ~~~ ~~~ ~~1~
execute @p[tag=builder_mode] ^ ^1 ^2 detect ~ ~ ~ grass 0 clone ~~~ ~~~ ~~1~
execute @p[tag=builder_mode] ^ ^1 ^3 detect ~ ~ ~ grass 0 clone ~~~ ~~~ ~~1~
execute @p[tag=builder_mode] ^ ^1 ^4 detect ~ ~ ~ grass 0 clone ~~~ ~~~ ~~1~
execute @p[tag=builder_mode] ^ ^1 ^5 detect ~ ~ ~ grass 0 clone ~~~ ~~~ ~~1~
execute @s[tag=builder_mode,scores={cooldown1=100}] ~ ~ ~ tag @s remove builder_mode
 
execute @s[tag=earth_scaffold] ~ ~ ~ setblock ~ ~-1 ~ dirt
execute @s[tag=earth_scaffold,scores={cooldown1=70..}] ~ ~ ~ tag @s remove earth_scaffold

execute @e[type=a:dirt_block_small,tag=move] ~~~ tp @s ^^^1 facing @e[c=1,tag=!earth,type=!xp_orb,type=!item,type=!armor_stand,type=!a:dirt_block_small,type=!arrow,type=!thrown_trident]
execute @e[type=a:dirt_block_small] ~~~ execute @e[r=1,tag=!earth,type=!xp_orb,type=!item,type=!armor_stand,type=!a:dirt_block_small,type=!arrow,type=!thrown_trident] ~~~ event entity @e[r=1,type=a:dirt_block_small] minecraft:explode
execute @e[type=a:dirt_block_small] ~~~ particle minecraft:falling_dust_gravel_particle ~~~
execute @s[tag=earthcombo1,scores={cooldown1=100}] ~ ~ ~ tag @s remove combo1
execute @s[tag=earthcombo1,scores={detect_left=1}] ~ ~ ~ function moves/earth/earth_combo_1
execute @s[tag=earthcombo2,scores={detect_left=1}] ~ ~ ~ function moves/earth/earth_combo_2

#Rock Blast
execute @e[tag=summoning,type=a:dirt_block,tag=traveleast] ~~~ tp @s ~1~~
execute @e[tag=summoning,type=a:dirt_block,tag=travelwest] ~~~ tp @s ~-1~~
execute @e[tag=summoning,type=a:dirt_block,tag=travelnorth] ~~~ tp @s ~~~-1
execute @e[tag=summoning,type=a:dirt_block,tag=travelsouth] ~~~ tp @s ~~~1
execute @e[tag=summoning,type=a:dirt_block] ~~~ detect ~~~ air 0 tag @s add safe
execute @e[tag=summoning,type=a:dirt_block,tag=!safe] ~~~ event entity @s minecraft:explode
execute @e[tag=summoning,type=a:dirt_block,tag=safe] ~~~ tag @s remove safe
execute @s[tag=summoning_dirt,scores={cooldown1=2..10}] ~~~ execute @e[type=a:dirt_block,r=10,tag=!summoning] ~~~ tp @s ~~0.2~
execute @s[tag=summoning_dirt,scores={cooldown1=11..}] ~~~ execute @e[type=a:dirt_block,r=10,tag=!summoning] ~~~ tag @s add summoning
execute @s[tag=summoning_dirt,scores={cooldown1=11..}] ~~~ tag @s remove summoning_dirt
execute @e[tag=summoning,type=a:dirt_block] ~~~ execute @a[r=1,tag=!earth,tag=!avatar] ~~~ event entity @e[r=3,c=1] minecraft:explode
execute @e[tag=summoning,type=a:dirt_block] ~~~ execute @a[r=50,rm=20] ~~~ event entity @e[r=50,rm=18,type=a:dirt_block] minecraft:explode