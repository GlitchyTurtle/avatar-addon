#Allow
execute @s[type=player,scores={aas=..0}] ~~~ scoreboard players set avatar:config aas 1
execute @s[type=player,scores={aas=..0}] ~~~ tellraw @s {"rawtext":[{"text":"§cAvatar is now disabled."}]}
 
#Deny
execute @s[type=player,scores={aas=1..}] ~~~ scoreboard players set avatar:config aas 0
execute @s[type=player,scores={aas=1..}] ~~~ tellraw @s {"rawtext":[{"text":"§aAvatar is now enabled. Please be warned, this is not the intended way to play."}]}
 
scoreboard players operation @a aas = avatar:config aas