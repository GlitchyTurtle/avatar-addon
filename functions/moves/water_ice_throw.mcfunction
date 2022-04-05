#bridge-file-version: #74
HIDE 
summon armor_stand ^ ^ ^-1 normal_size ice_throw
tag @s add ice_throw
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bIce Throw"}]}
scoreboard players add @s sub_level 1
playsound bucket.fill_water