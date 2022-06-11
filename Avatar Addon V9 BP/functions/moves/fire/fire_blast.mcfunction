#bridge-file-version: #38
HIDE 
particle a:fire_blast ^ ^1 ^1
particle a:fire_blast ^ ^1 ^1.2
particle a:fire_blast ^ ^1 ^1.4
particle a:fire_blast ^ ^1 ^1.6
particle a:fire_blast ^ ^1 ^1.8
particle a:fire_blast ^ ^1 ^2
particle a:fire_blast ^ ^1 ^2.2
particle a:fire_blast ^ ^1 ^2.4
particle a:fire_blast ^ ^1 ^2.6
particle a:fire_blast ^ ^1 ^2.8
particle a:fire_blast ^ ^1 ^3
particle a:fire_blast ^ ^1 ^3.2
particle a:fire_blast ^ ^1 ^3.4
particle a:fire_blast ^ ^1 ^3.6
particle a:fire_blast ^ ^1 ^3.8
particle a:fire_blast ^ ^1 ^4
particle a:fire_blast ^ ^1 ^4.2
particle a:fire_blast ^ ^1 ^4.4
particle a:fire_blast ^ ^1 ^4.6
particle a:fire_blast ^ ^1 ^4.8
particle a:fire_blast ^ ^1 ^5
particle a:fire_blast ^ ^1 ^5.2
particle a:fire_blast ^ ^1 ^5.4
particle a:fire_blast ^ ^1 ^5.6
particle a:fire_blast ^ ^1 ^5.8
particle a:fire_blast ^ ^1 ^6
particle a:fire_blast ^ ^1 ^6.2
particle a:fire_blast ^ ^1 ^6.4
particle a:fire_blast ^ ^1 ^6.6
particle a:fire_blast ^ ^1 ^6.8
particle a:fire_blast ^ ^1 ^7
particle a:fire_blast_pop ^ ^1 ^7
execute @s[scores={level=0..5}] ^ ^ ^7 damage @e[r=4] 1 none
execute @s[scores={level=6..10}] ^ ^ ^7 damage @e[r=4] 2 none
execute @s[scores={level=11..99}] ^ ^ ^7 damage @e[r=4] 4 none
execute @s[scores={level=100..}] ^ ^ ^7 damage @e[r=4] 10 none
scoreboard players set @s cooldown1 50
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFire Blast"}]}
scoreboard players add @s sub_level 1
playsound mob.ghast.fireball