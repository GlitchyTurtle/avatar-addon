#bridge-file-version: #42
HIDE 
execute @s[tag=air] ~ ~ ~ summon a:scooter
execute @s[tag=avatar] ~ ~ ~ summon a:scooter
execute @s[tag=air] ~ ~ ~ ride @s start_riding @e[r=3,type=a:scooter,c=1] teleport_ride
execute @s[tag=avatar] ~ ~ ~ ride @s start_riding @e[r=3,type=a:scooter,c=1] teleport_ride
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bAir Scooter"}]}
scoreboard players add @s sub_level 1