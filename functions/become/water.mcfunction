#bridge-file-version: #36
HIDE 
tag @s add water
tag @s remove air
tag @s remove fire
tag @s remove earth
tag @s remove avatar
tag @s remove human
scoreboard players set @s moveslot1 0
scoreboard players set @s moveslot2 0
scoreboard players set @s moveslot3 0
scoreboard players set @s moveslot4 0
event entity @s become_water
tag @s remove choose
function become/movelist_water