#bridge-file-version: #37
HIDE 
tag @s add selfshove
scoreboard players set @s cooldown1 0
particle minecraft:elephant_tooth_paste_vapor_particle ^ ^1 ^1
particle minecraft:elephant_tooth_paste_vapor_particle ^ ^1 ^2
particle minecraft:elephant_tooth_paste_vapor_particle ^ ^1 ^3
particle minecraft:elephant_tooth_paste_vapor_particle ^ ^1 ^4
particle minecraft:elephant_tooth_paste_vapor_particle ^ ^1 ^5
particle minecraft:elephant_tooth_paste_vapor_particle ^ ^1 ^6
particle minecraft:elephant_tooth_paste_vapor_particle ^ ^1 ^7
execute @s ^^ ^1 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^1 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^1 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^2 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^2 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^2 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^3 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^3 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^3 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^4 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^4 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^4 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^5 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^5 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^5 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^6 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^^ ^6 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^ ^ ^6 execute @e[r=2,tag=!selfshove] ~~~ tp @s ^ ^ ^-0.5 facing @p[tag=selfshove]
execute @s ^ ^ ^7 effect @e[r=2] instant_damage 1 0 true
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bAir Blast"}]}
scoreboard players add @s sub_level 2
playsound monb.mob.shulker.shoot @a[r=3]
tag @s remove selfshove