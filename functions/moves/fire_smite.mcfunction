#bridge-file-version: #19
HIDE 
execute @e[r=10,rm=0.1] ~~~ summon lightning_bolt
damage @s 10 none
scoreboard players set @s cooldown 0
tellraw @s[tag=!chatmsgoff] {"rawtext":[{"text":"You used "},{"text":"§bFire Smite"}]}
scoreboard players add @s sub_level 1