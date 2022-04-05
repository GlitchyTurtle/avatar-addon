#bridge-file-version: #7
tag @s[tag=!antimagic] add chooseslot3
tag @s[tag=!antimagic] remove chooseslot1
tag @s[tag=!antimagic] remove chooseslot2
tag @s[tag=!antimagic] remove chooseslot4
tellraw @s[tag=antimagic,tag=!as23ds] {"rawtext":[{"text":"§cYou can't do that when your bending is turned off (take arrows off from you offhand or drop an item called 'disable bending')§f"}]}
tellraw @s[tag=antimagic,tag=as23ds] {"rawtext":[{"text":"§cYou died while in avatar state - you cannot bend ever again (if you want to reset this, simply run /function reset_self)"}]}