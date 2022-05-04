#bridge-file-version: #34
HIDE 
tag @s add fire
tag @s remove air
tag @s remove water
tag @s remove earth
tag @s remove avatar
tag @s remove human
scoreboard players set @s moveslot1 0
scoreboard players set @s moveslot2 0
scoreboard players set @s moveslot3 0
scoreboard players set @s moveslot4 0
event entity @s become_fire
tag @s remove choose
function become/movelist_fire
particle a:choose_fire