HIDE
scoreboard players set @s[tag=!antimagic] moveslot1 0
scoreboard players set @s[tag=!antimagic] moveslot2 0
scoreboard players set @s[tag=!antimagic] moveslot3 0
scoreboard players set @s[tag=!antimagic] moveslot4 0
tag @s[tag=!antimagic] remove air
tag @s[tag=!antimagic] remove earth
tag @s[tag=!antimagic] remove fire
tag @s[tag=!antimagic] remove water
tag @s[tag=!antimagic] remove avatar
tag @s[tag=!antimagic] remove can_earth_burrow
tag @s[tag=!antimagic] remove can_earth_headbutt
tag @s[tag=!antimagic] remove choosesubtype
scoreboard players set @s[tag=!antimagic] level 0
scoreboard players set @s[tag=!antimagic] sub_level 0
scoreboard players set @s[tag=!antimagic] unlocked 0
tellraw @s[tag=antimagic,tag=!as23ds] {"rawtext":[{"text":"§cYou can't do that when your bending is turned off (take arrows off from you offhand or drop an item called 'disable bending')§f"}]}
tellraw @s[tag=antimagic,tag=as23ds] {"rawtext":[{"text":"§cYou died while in avatar state - you cannot bend ever again."}]}