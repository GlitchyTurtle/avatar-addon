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
scoreboard objectives add detect_sprint dummy
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
scoreboard objectives add unlocked dummy
 
#Choosing
scoreboard objectives add choose dummy
scoreboard objectives add moveslot1 dummy
scoreboard objectives add moveslot2 dummy
scoreboard objectives add moveslot3 dummy
scoreboard objectives add moveslot4 dummy
scoreboard objectives add moveslot5 dummy
scoreboard objectives add moveslot6 dummy
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
scoreboard players add @a moveslot5 0
scoreboard players add @a moveslot6 0
scoreboard players add @a chooseslot 0
scoreboard players add @a detect_rhy 0
scoreboard players add @a deaths 0
scoreboard players add @a kills 0
scoreboard players add @a cds 0
scoreboard players add @a aas 0
scoreboard players add @a unlocked 0