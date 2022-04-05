#bridge-file-version: #17
HIDE 
playsound random.levelup @s
tag @s[tag=msgm] add msgtransfer
tag @s[tag=!msgm] remove nomsg
tag @s[tag=!msgm] add msgm
tellraw @s[tag=msgtransfer] {"rawtext":[{"text":"§cYou will no longer see move messages!§f"}]}
tellraw @s[tag=!msgtransfer] {"rawtext":[{"text":"§aYou will now see move messages!§f"}]}
tag @s[tag=msgm] remove chatmsgoff
effect @s[tag=msgtransfer] invisibility 0
effect @s[tag=msgtransfer] night_vision 0
tag @s[tag=msgtransfer] remove msgm
tag @s[tag=msgtransfer] add nomsg
tag @s[tag=msgtransfer] remove msgtransfer
tag @s[tag=nomsg] add chatmsgoff