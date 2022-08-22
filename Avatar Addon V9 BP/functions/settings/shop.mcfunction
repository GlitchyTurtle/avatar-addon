#Allow
execute @s[type=player,scores={shop=..0}] ~~~ scoreboard players set avatar:config shop 1
execute @s[type=player,scores={shop=..0}] ~~~ tellraw @s {"rawtext":[{"text":"§cShops are now disabled."}]}
 
#Deny
execute @s[type=player,scores={shop=1..}] ~~~ scoreboard players set avatar:config shop 0
execute @s[type=player,scores={shop=1..}] ~~~ tellraw @s {"rawtext":[{"text":"§aShops are now enabled!"}]}
 
scoreboard players operation @a shop = avatar:config shop