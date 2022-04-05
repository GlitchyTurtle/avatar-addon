#bridge-file-version: #58
HIDE 
tag @s add setup
 
#Detections
scoreboard objectives add detect_init dummy
scoreboard objectives add detect_left dummy
scoreboard objectives add detect_right dummy
scoreboard objectives add detect_jump dummy
scoreboard objectives add detect_sneak dummy
scoreboard objectives add detect_dsneak dummy
scoreboard objectives add detect_dsneakSet dummy
scoreboard objectives add detect_sneakTemp dummy
scoreboard objectives add detect_rhx dummy
scoreboard objectives add deaths dummy
scoreboard objectives add kills dummy
 
#Gamerules
gamerule sendcommandfeedback false
 
#Scoreboards
scoreboard objectives add ground dummy
scoreboard objectives add cooldown1 dummy
scoreboard objectives add charged_attack dummy
scoreboard objectives add earth_sprint dummy
scoreboard objectives add air_invis dummy
scoreboard objectives add sub_level dummy
scoreboard objectives add level dummy
scoreboard objectives add combo dummy
 
#Choosing
scoreboard objectives add choose dummy
scoreboard objectives add moveslot1 dummy
scoreboard objectives add moveslot2 dummy
scoreboard objectives add moveslot3 dummy
scoreboard objectives add moveslot4 dummy
scoreboard objectives add chooseslot dummy
scoreboard objectives add detect_rhy dummy
 
#Settings
scoreboard objectives add cds dummy
scoreboard objectives add aas dummy
 
#Adding base values
scoreboard players add @a cooldown1 0
scoreboard players add @a charged_attack 0
scoreboard players add @a earth_sprint 0
scoreboard players add @a air_invis 0
scoreboard players add @a ground 0
scoreboard players add @a choose 0
scoreboard players add @a sub_level 0
scoreboard players add @a level 0
scoreboard players add @a moveslot1 0
scoreboard players add @a moveslot2 0
scoreboard players add @a moveslot3 0
scoreboard players add @a moveslot4 0
scoreboard players add @a chooseslot 0
scoreboard players add @a detect_rhy 0
scoreboard players add @a deaths 0
scoreboard players add @a kills 0
scoreboard players add @a cds 0
scoreboard players add @a aas 0
playsound random.levelup @s ~ ~ ~
give @s writable_book 2
tellraw @s {"rawtext":[{"text":"§r"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bAvatar Addon§r"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bStarting out:"}]}
tellraw @s {"rawtext":[{"text":"§rTo start, run the command §b/function choose§r and pick what type of bender you will be. Punch to cycle through the choices, and sneak to confirm."}]}
tellraw @s {"rawtext":[{"text":"§rIf you don't have access to commands, title the book you were given: §bchoose bending§r and drop it in front of you."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bChoosing moves:"}]}
tellraw @s {"rawtext":[{"text":"§rTo start, run the command §b/function useful_tools§r which will make items appear in your inventory, with items that will let you choose moves for each slot."}]}
tellraw @s {"rawtext":[{"text":"§rTo choose a slot, drop an item called §bchoose_slot_1§r, and then whatever move you pick can be triggered by slot 1's trigger (like sneaking and punching, etc)."}]}
tellraw @s {"rawtext":[{"text":"§rThis also works to choose slots 1-4, just like project korra (the mainstream java edition avatar pack). If you need help, there should be a youtube video posted that describes how."}]}
tellraw @s {"rawtext":[{"text":"§rHuge tip: If the slot system doesn't work the first time, try again, sometimes it takes an extra slot choice."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bMobile Mode:"}]}
tellraw @s {"rawtext":[{"text":"§rRun the command §b/function useful_tools§r, and then drop the rabbit foot whenever you want to punch when there is no block in front of you (you still have to sneak and stuff)."}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bToggling Bending:"}]}
tellraw @s {"rawtext":[{"text":"§rRun the command §b/function toggle_bending§r, or put arrows in your offhand slot. You can also drop an item labeled §bdisable bending§r"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bCredits:"}]}
tellraw @s {"rawtext":[{"text":"§bPlaytester #1 §r- albert - https://www.youtube.com/channel/null"}]}
tellraw @s {"rawtext":[{"text":"§bPlaytester #2 §r- Tinpixelman66 - https://youtube.com/channel/UCDMWNQU3aVUNV8qF9ct0r5g"}]}
tellraw @s {"rawtext":[{"text":"§bPlaytester #3 §r- Riveren - https://www.youtube.com/channel/UCNvRFPEVYuzF-xIaLv1Cffg"}]}
tellraw @s {"rawtext":[{"text":"§bPlaytester #4 §r- Jamez - https://www.youtube.com/channel/null"}]}
tellraw @s {"rawtext":[{"text":"§bCreator §r- GlitchyTurtle32 - https://www.youtube.com/channel/UCZ3E2lCjK3D1N-dcci3edwg"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
title @s actionbar §3Check the chat window please.