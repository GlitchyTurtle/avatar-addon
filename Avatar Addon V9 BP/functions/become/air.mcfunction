HIDE 
tag @s add air
scoreboard players set @s moveslot1 0
scoreboard players set @s moveslot2 0
scoreboard players set @s moveslot3 0
scoreboard players set @s moveslot4 0
scoreboard players set @s moveslot5 0
scoreboard players set @s moveslot6 0
scoreboard players set @s unlocked 0
tag @s remove water
tag @s remove fire
tag @s remove earth
tag @s remove avatar
tag @s remove human
event entity @s become_air
tag @s remove choose
function become/movelist_air
particle a:choose_air