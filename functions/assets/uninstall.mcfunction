#bridge-file-version: #76
HIDE 
 
#Detections
scoreboard objectives remove detect_init
scoreboard objectives remove detect_left
scoreboard objectives remove detect_right
scoreboard objectives remove detect_jump
scoreboard objectives remove detect_sneak
scoreboard objectives remove detect_dsneak
scoreboard objectives remove detect_dsneakSet
scoreboard objectives remove detect_sneakTemp
scoreboard objectives remove detect_rhx
scoreboard objectives remove deaths
scoreboard objectives remove kills
 
#Gamerules
gamerule sendcommandfeedback true
 
#Scoreboards
scoreboard objectives remove ground
scoreboard objectives remove cooldown1
scoreboard objectives remove charged_attack
scoreboard objectives remove earth_sprint
scoreboard objectives remove air_invis
scoreboard objectives remove sub_level
scoreboard objectives remove level
 
#Choosing
scoreboard objectives remove choose
scoreboard objectives remove moveslot1
scoreboard objectives remove moveslot2
scoreboard objectives remove moveslot3
scoreboard objectives remove moveslot4
scoreboard objectives remove chooseslot
scoreboard objectives remove detect_rhy
 
#Settings
scoreboard objectives remove cds
scoreboard objectives remove aas
 
#Tags
tag @a remove air
tag @a remove water
tag @a remove earth
tag @a remove fire
tag @a remove avatar
tag @a remove avatar_state
tag @a remove bending
tag @a remove nomsg
tag @a remove nobending
tag @a remove bendingtransfer
tag @a remove antimagic
tag @a remove can_earth_headbutt
tag @a remove can_earth_burrow
tag @a remove airrush
tag @a remove air_invis
tag @a remove builder_mode
tag @a remove choose
tag @a remove chooseslot1
tag @a remove chooseslot2
tag @a remove chooseslot3
tag @a remove chooseslot4
tag @a remove choosesubtype
tag @a remove cooldown1
tag @a remove burrow
tag @a remove tornado
tag @a remove thrown
tag @a remove earth_throw
tag @a remove earth_scaffold
tag @a remove selfpush
tag @a remove selfshove
tag @a remove selfwater
tag @a remove selfshove
tag @a remove full_moon
tag @a remove fire_sprint
tag @a remove element_spin
tag @a remove as23ds
tag @a remove chatmsgoff
tag @s remove human
tellraw @s {"rawtext":[{"text":"§cUninstalled. Please stop any new players from joining until you have removed this pack."}]}