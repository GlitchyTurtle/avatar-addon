#bridge-file-version: #13
HIDE 
tag @s add shockwave
summon armor_stand ~ ~ ~1.5 normal_size shockwave_air
summon armor_stand ~ ~ ~-1.5 normal_size shockwave_air
summon armor_stand ~1.5 ~ ~ normal_size shockwave_air
summon armor_stand ~-1.5 ~ ~ normal_size shockwave_air
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bShockwave"}]}
scoreboard players add @s sub_level 2
playsound monb.mob.shulker.shoot @a[r=3]
effect @e[r=5,type=armor_stand,name=shockwave_air] fatal_poison 90 10 true