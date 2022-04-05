#bridge-file-version: #14
HIDE 
playsound random.levelup @s
tag @s[tag=bending] add bendingtransfer
tag @s[tag=!bending] remove nobending
tag @s[tag=!bending] add bending
tellraw @s[tag=bendingtransfer] {"rawtext":[{"text":"§cYou no longer have your bending!§f"}]}
tellraw @s[tag=!bendingtransfer] {"rawtext":[{"text":"§aYou have your bending now!§f"}]}
tag @s[tag=bending] remove antimagic
tag @s[tag=bendingtransfer] remove bending
tag @s[tag=bendingtransfer] add nobending
tag @s[tag=bendingtransfer] remove bendingtransfer
tag @s[tag=nobending] add antimagic