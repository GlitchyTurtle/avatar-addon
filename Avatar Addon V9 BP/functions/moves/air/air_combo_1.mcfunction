HIDE
tag @s add combo2
scoreboard players set @s cooldown1 0
scoreboard players set @s detect_left 0
tag @s remove combo1
particle a:air_blast ^-0.4 ^1.4 ^1
particle a:air_blast ^-0.6 ^1.4 ^1.5
particle a:air_blast ^-0.8 ^1.4 ^2
particle a:air_blast ^-0.9 ^1.4 ^2.5
particle a:air_blast ^-1 ^1.4 ^3
particle a:air_blast ^-1 ^1.4 ^3.5
particle a:air_blast ^-1 ^1.4 ^4
particle a:air_blast ^-0.9 ^1.4 ^4.5
particle a:air_blast ^-0.8 ^1.4 ^5
particle a:air_blast ^-0.6 ^1.4 ^5.5
particle a:air_blast ^-0.4 ^1.4 ^6
particle a:air_blast_pop ^^1.4 ^7
tag @s add selfshove
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
execute @s[scores={level=0..5}] ^ ^ ^7 damage @e[r=4] 4 none
execute @s[scores={level=6..10}] ^ ^ ^7 damage @e[r=4] 8 none
execute @s[scores={level=11..99}] ^ ^ ^7 damage @e[r=4] 10 none
execute @s[scores={level=100..}] ^ ^ ^7 damage @e[r=4] 16 none
tag @s remove selfshove