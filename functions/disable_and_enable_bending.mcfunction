#bridge-file-version: #10
HIDE 
playsound random.levelup @s
tag @s[tag=vanished] add vanishtransfer
tag @s[tag=!vanished] remove unvanished
tag @s[tag=!vanished] add vanished
tellraw @s[tag=vanishtransfer] {"rawtext":[{"text":"§cYou no longer have your bending!§f"}]}
tellraw @s[tag=!vanishtransfer] {"rawtext":[{"text":"§aYou have your bending now!§f"}]}
tag @s[tag=vanished] remove antimagic
effect @s[tag=vanishtransfer] invisibility 0
effect @s[tag=vanishtransfer] night_vision 0
tag @s[tag=vanishtransfer] remove vanished
tag @s[tag=vanishtransfer] add unvanished
tag @s[tag=vanishtransfer] remove vanishtransfer
tag @s[tag=unvanished] add antimagic