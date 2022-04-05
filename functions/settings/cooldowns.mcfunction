#bridge-file-version: #9
#Allow
execute @s[type=player,scores={cds=..0}] ~~~ scoreboard players set avatar:config cds 1
execute @s[type=player,scores={cds=..0}] ~~~ tellraw @s {"rawtext":[{"text":"§cCooldowns are now disabled. Please be warned, this is not the intended way to play."}]}
 
#Deny
execute @s[type=player,scores={cds=1..}] ~~~ scoreboard players set avatar:config cds 0
execute @s[type=player,scores={cds=1..}] ~~~ tellraw @s {"rawtext":[{"text":"§aCooldowns are now enabled."}]}
 
scoreboard players operation @a cds = avatar:config cds