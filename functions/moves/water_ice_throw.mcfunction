#bridge-file-version: #72
HIDE 
summon armor_stand ^ ^ ^-1 k ice_throw
tag @s add ice_throw
scoreboard players set @s cooldown1 0
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bIce Throw"}]}
scoreboard players add @s sub_level 1
playsound bucket.fill_water