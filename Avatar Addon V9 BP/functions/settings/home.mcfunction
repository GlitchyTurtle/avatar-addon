#Allow
execute @s[type=player,scores={home=..0}] ~~~ scoreboard players set avatar:config home 1
execute @s[type=player,scores={home=..0}] ~~~ tellraw @s {"rawtext":[{"text":"§cHomes are now disabled."}]}
 
#Deny
execute @s[type=player,scores={home=1..}] ~~~ scoreboard players set avatar:config home 0
execute @s[type=player,scores={home=1..}] ~~~ tellraw @s {"rawtext":[{"text":"§aHomes are now enabled!"}]}
 
scoreboard players operation @a home = avatar:config home