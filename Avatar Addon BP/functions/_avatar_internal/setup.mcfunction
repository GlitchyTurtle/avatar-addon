# Gamerules
gamerule sendcommandfeedback false
gamerule commandblockoutput false
gamerule showtags false

# Cooldown
scoreboard objectives add cooldown dummy
scoreboard players add @a cooldown 0

# Passives
scoreboard objectives add water_loaded dummy
scoreboard objectives add ground dummy
scoreboard objectives add earth_sprint dummy
scoreboard players add @a ground 0
scoreboard players add @a earth_sprint 0
scoreboard players add @a water_loaded 0

# Leveling
scoreboard objectives add level dummy
scoreboard objectives add sub_level dummy
scoreboard players add @a level 0
scoreboard players add @a sub_level 0

# Skill Tree
scoreboard objectives add skill_points dummy
scoreboard objectives add defTier dummy
scoreboard objectives add offTier dummy
scoreboard objectives add utiTier dummy
scoreboard objectives add mobTier dummy
scoreboard players add @a skill_points 0
scoreboard players add @a defTier 0
scoreboard players add @a offTier 0
scoreboard players add @a utiTier 0
scoreboard players add @a mobTier 0

# Settings
scoreboard objectives add settings dummy

# Combat
scoreboard objectives add combo dummy
scoreboard objectives add combat dummy
scoreboard objectives add deaths dummy
scoreboard objectives add kills dummy
scoreboard players add @a combo 0
scoreboard players add @a combat 0
scoreboard players add @a deaths 0
scoreboard players add @a kills 0

# Money
scoreboard objectives add money dummy
scoreboard players add @a money 0

# Actions
scoreboard objectives add detect_left dummy
scoreboard objectives add detect_right dummy
scoreboard objectives add detect_sneak dummy
scoreboard objectives add detect_dsneak dummy
scoreboard objectives add detect_sneakTemp dummy
scoreboard objectives add detect_dsneakSet dummy
scoreboard objectives add detect_sprint dummy
scoreboard objectives add detect_rhx dummy
scoreboard objectives add detect_rhy dummy
scoreboard objectives add detect_water dummy
scoreboard players add @a detect_left 0
scoreboard players add @a detect_right 0
scoreboard players add @a detect_sneak 0
scoreboard players add @a detect_dsneak 0
scoreboard players add @a detect_sneakTemp 0
scoreboard players add @a detect_dsneakSet 0
scoreboard players set @s detect_dsneakSet 25
scoreboard players add @a detect_sprint 0
scoreboard players add @a detect_rhx 0
scoreboard players add @a detect_rhy 0
scoreboard players add @a detect_water 0

# Moveslots
scoreboard objectives add moveslot1 dummy
scoreboard objectives add moveslot2 dummy
scoreboard objectives add moveslot3 dummy
scoreboard objectives add moveslot4 dummy
scoreboard objectives add moveslot5 dummy
scoreboard objectives add moveslot6 dummy
scoreboard objectives add moveslot7 dummy
scoreboard objectives add moveslot8 dummy
scoreboard objectives add moveslot9 dummy
scoreboard players add @a moveslot1 0
scoreboard players add @a moveslot2 0
scoreboard players add @a moveslot3 0
scoreboard players add @a moveslot4 0
scoreboard players add @a moveslot5 0
scoreboard players add @a moveslot6 0
scoreboard players add @a moveslot7 0
scoreboard players add @a moveslot8 0
scoreboard players add @a moveslot9 0

# Scroll
give @s a:bending_scroll 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}

# Add tag
tag @s add setup