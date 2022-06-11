#bridge-file-version: #16
HIDE 
summon lightning_bolt ^ ^ ^5
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bLightning"}]}
scoreboard players add @s sub_level 1