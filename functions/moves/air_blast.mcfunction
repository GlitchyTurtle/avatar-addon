#bridge-file-version: #44
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
execute @s[scores={level=0..5}] ^ ^ ^7 damage @e[r=2] 2 none
execute @s[scores={level=6..10}] ^ ^ ^7 damage @e[r=2] 4 none
execute @s[scores={level=11..99}] ^ ^ ^7 damage @e[r=2] 6 none
execute @s[scores={level=100..}] ^ ^ ^7 damage @e[r=2] 10 none
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Blast"}]}
scoreboard players add @s sub_level 2
playsound monb.mob.shulker.shoot @a[r=3]
tag @s remove selfshove