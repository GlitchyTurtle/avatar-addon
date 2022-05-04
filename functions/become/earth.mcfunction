#bridge-file-version: #70
HIDE 
tag @s add earth
tag @s remove air
tag @s remove water
tag @s remove fire
tag @s remove avatar
tag @s remove human
scoreboard players set @s moveslot1 0
scoreboard players set @s moveslot2 0
scoreboard players set @s moveslot3 0
scoreboard players set @s moveslot4 0
event entity @s become_earth
tag @s remove choose
function become/movelist_earth
particle a:choose_earth