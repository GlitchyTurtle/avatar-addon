#bridge-file-version: #30
HIDE 
tag @s remove dismount
scoreboard players set @s cooldown1 0
summon pig ~ ~ ~ minecraft:on_saddled airscooter
summon armor_stand ^ ^ ^ k invis
effect @e[name=invis] invisibility 1000000 1 true
effect @e[name=airscooter] invisibility 1000000 1 true
effect @e[name=invis] resistance 1000000 255 true
effect @e[name=airscooter] resistance 1000000 255 true
execute @s[tag=air] ~ ~ ~ ride @s start_riding @e[r=3,type=pig,name=airscooter,c=1] teleport_ride
tellraw @s {"rawtext":[{"text":"You used "},{"text":"§bAirscooter"}]}
scoreboard players add @s sub_level 1
tag @s add airscooter
execute @s[tag=airscooter] ~ ~ ~ playsound elytra.loop @s