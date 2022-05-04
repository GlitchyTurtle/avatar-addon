#bridge-file-version: #51
HIDE 
tag @s add selfshove
scoreboard players set @s cooldown1 0
particle a:air_blast ^ ^1 ^1
particle a:air_blast ^ ^1 ^1.2
particle a:air_blast ^ ^1 ^1.4
particle a:air_blast ^ ^1 ^1.6
particle a:air_blast ^ ^1 ^1.8
particle a:air_blast ^ ^1 ^2
particle a:air_blast ^ ^1 ^2.2
particle a:air_blast ^ ^1 ^2.4
particle a:air_blast ^ ^1 ^2.6
particle a:air_blast ^ ^1 ^2.8
particle a:air_blast ^ ^1 ^3
particle a:air_blast ^ ^1 ^3.2
particle a:air_blast ^ ^1 ^3.4
particle a:air_blast ^ ^1 ^3.6
particle a:air_blast ^ ^1 ^3.8
particle a:air_blast ^ ^1 ^4
particle a:air_blast ^ ^1 ^4.2
particle a:air_blast ^ ^1 ^4.4
particle a:air_blast ^ ^1 ^4.6
particle a:air_blast ^ ^1 ^4.8
particle a:air_blast ^ ^1 ^5
particle a:air_blast ^ ^1 ^5.2
particle a:air_blast ^ ^1 ^5.4
particle a:air_blast ^ ^1 ^5.6
particle a:air_blast ^ ^1 ^5.8
particle a:air_blast ^ ^1 ^6
particle a:air_blast ^ ^1 ^6.2
particle a:air_blast ^ ^1 ^6.4
particle a:air_blast ^ ^1 ^6.6
particle a:air_blast ^ ^1 ^6.8
particle a:air_blast ^ ^1 ^7
particle a:air_blast_pop ^ ^1 ^7
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
execute @s[scores={level=0..5}] ^ ^ ^7 damage @e[r=2] 4 none
execute @s[scores={level=6..10}] ^ ^ ^7 damage @e[r=2] 8 none
execute @s[scores={level=11..99}] ^ ^ ^7 damage @e[r=2] 10 none
execute @s[scores={level=100..}] ^ ^ ^7 damage @e[r=2] 16 none
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Blast"}]}
scoreboard players add @s sub_level 2
playsound monb.mob.shulker.shoot @a[r=3]
tag @s remove selfshove