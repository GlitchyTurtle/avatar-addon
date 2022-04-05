#bridge-file-version: #5
execute @s[tag=air] ~ ~ ~ function become/movelist_air
execute @s[tag=fire] ~ ~ ~ function become/movelist_fire
execute @s[tag=water] ~ ~ ~ function become/movelist_water
execute @s[tag=earth] ~ ~ ~ function become/movelist_earth
execute @s[tag=avatar] ~ ~ ~ function become/movelist_avatar
execute @s[tag=!avatar,tag=!air,tag=!fire,tag=!water,tag=!earth] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§cPlease pick a bending style to get a moveset."}]}