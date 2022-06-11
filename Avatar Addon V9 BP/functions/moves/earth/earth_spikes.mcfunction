#bridge-file-version: #10
HIDE 
summon armor_stand ^ ^ ^2 k earthspikes
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ execute @s ~ ~ ~ tp @s ~ ~ ~ facing @p[tag=earth]
execute @e[name=earthspikes,type=armor_stand] ~ ~ ~ effect @s invisibility 1 1 true
scoreboard players set @s cooldown1 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bEarth Spikes"}]}
scoreboard players add @s sub_level 1
playsound dig.grass
playsound dig.gravel