#bridge-file-version: #103
HIDE 
execute @s[tag=chooseslot1,scores={chooseslot=!36,detect_left=1,detect_sneak=0}] ~ ~ ~ scoreboard players add @s chooseslot 5
execute @s[tag=chooseslot1,scores={chooseslot=!36,detect_left=1}] ~ ~ ~ scoreboard players set @s detect_left 0
execute @s[tag=air,tag=chooseslot1,scores={chooseslot=0..5}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6[Air Blast] §3[Air Launch] [Air Scooter] [Air Push] [Air Vanish] [Air Rush]"}]}
execute @s[tag=air,tag=chooseslot1,scores={chooseslot=6..10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Air Blast] §6[Air Launch] §3[Air Scooter] [Air Push] [Air Vanish] [Air Rush]"}]}
execute @s[tag=air,tag=chooseslot1,scores={chooseslot=11..15}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Air Blast] [Air Launch] §6[Air Scooter] §3[Air Push] [Air Vanish] [Air Rush]"}]}
execute @s[tag=air,tag=chooseslot1,scores={chooseslot=16..20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Air Blast] [Air Launch] [Air Scooter] §6[Air Push] §3[Air Vanish] [Air Rush]"}]}
execute @s[tag=air,tag=chooseslot1,scores={chooseslot=21..25}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Air Blast] [Air Launch] [Air Scooter] [Air Push] §6[Air Vanish] §3[Air Rush]"}]}
execute @s[tag=air,tag=chooseslot1,scores={chooseslot=26..30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Air Blast] [Air Launch] [Air Scooter] [Air Push] [Air Vanish] §6[Air Rush]"}]}
execute @s[tag=earth,tag=chooseslot1,scores={chooseslot=0..5}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6[Earth Headbutt] §3[Earth Pillar] [Earth Shove] [Earth Lift] [Earth Shield] [Earth Spikes]"}]}
execute @s[tag=earth,tag=chooseslot1,scores={chooseslot=6..10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Earth Headbutt] §6[Earth Pillar] §3[Earth Shove] [Earth Lift] [Earth Shield] [Earth Spikes]"}]}
execute @s[tag=earth,tag=chooseslot1,scores={chooseslot=11..15}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Earth Headbutt] [Earth Pillar] §6[Earth Shove] §3[Earth Lift] [Earth Shield] [Earth Spikes]"}]}
execute @s[tag=earth,tag=chooseslot1,scores={chooseslot=16..20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Earth Headbutt] [Earth Pillar] [Earth Shove] §6[Earth Lift] §3[Earth Shield] [Earth Spikes]"}]}
execute @s[tag=earth,tag=chooseslot1,scores={chooseslot=21..25}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Earth Headbutt] [Earth Pillar] [Earth Shove] [Earth Lift] §6[Earth Shield] §3[Earth Spikes]"}]}
execute @s[tag=earth,tag=chooseslot1,scores={chooseslot=26..30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Earth Headbutt] [Earth Pillar] [Earth Shove] [Earth Lift] [Earth Shield] §6[Earth Spikes]"}]}
execute @s[tag=water,tag=chooseslot1,scores={chooseslot=0..5}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6[Flood] §3[Ice Cage] [Ice Throw] [Water Spear] [Water Spike] [Water Rush]"}]}
execute @s[tag=water,tag=chooseslot1,scores={chooseslot=6..10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Flood] §6[Ice Cage] §3[Ice Throw] [Water Spear] [Water Spike] [Water Rush]"}]}
execute @s[tag=water,tag=chooseslot1,scores={chooseslot=11..15}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Flood] [Ice Cage] §6[Ice Throw] §3[Water Spear] [Water Spike] [Water Rush]"}]}
execute @s[tag=water,tag=chooseslot1,scores={chooseslot=16..20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Flood] [Ice Cage] [Ice Throw] §6[Water Spear] §3[Water Spike] [Water Rush]"}]}
execute @s[tag=water,tag=chooseslot1,scores={chooseslot=21..25}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Flood] [Ice Cage] [Ice Throw] [Water Spear] §6[Water Spike] §3[Water Rush]"}]}
execute @s[tag=water,tag=chooseslot1,scores={chooseslot=26..30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Flood] [Ice Cage] [Ice Throw] [Water Spear] [Water Spike] §6[Water Rush]"}]}
execute @s[tag=fire,tag=chooseslot1,scores={chooseslot=0..5}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6[Fire Blast] §3[Fire Circle] [Fire Sprint] [Fire Boosters] [Lightning] [Magma Floor]"}]}
execute @s[tag=fire,tag=chooseslot1,scores={chooseslot=6..10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire Blast] §6[Fire Circle] §3[Fire Sprint] [Fire Boosters] [Lightning] [Magma Floor]"}]}
execute @s[tag=fire,tag=chooseslot1,scores={chooseslot=11..15}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire Blast] [Fire Circle] §6[Fire Sprint] §3[Fire Boosters] [Lightning] [Magma Floor]"}]}
execute @s[tag=fire,tag=chooseslot1,scores={chooseslot=16..20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire Blast] [Fire Circle] [Fire Sprint] §6[Fire Boosters] §3[Lightning] [Magma Floor]"}]}
execute @s[tag=fire,tag=chooseslot1,scores={chooseslot=21..25}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire Blast] [Fire Circle] [Fire Sprint] [Fire Boosters] §6[Lightning] §3[Magma Floor]"}]}
execute @s[tag=fire,tag=chooseslot1,scores={chooseslot=26..30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire Blast] [Fire Circle] [Fire Sprint] [Fire Boosters] [Lightning] §6[Magma Floor]"}]}
execute @s[tag=chooseslot1,scores={chooseslot=31..}] ~ ~ ~ scoreboard players set @s chooseslot 5
execute @s[scores={detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3You chose the move for slot 1!"}]}
 
execute @s[tag=chooseslot1,scores={chooseslot=0..5,detect_sneak=1}] ~ ~ ~ scoreboard players set @s moveslot1 1
execute @s[tag=chooseslot1,scores={chooseslot=6..10,detect_sneak=1}] ~ ~ ~ scoreboard players set @s moveslot1 2
execute @s[tag=chooseslot1,scores={chooseslot=11..15,detect_sneak=1}] ~ ~ ~ scoreboard players set @s moveslot1 3
execute @s[tag=chooseslot1,scores={chooseslot=16..20,detect_sneak=1}] ~ ~ ~ scoreboard players set @s moveslot1 4
execute @s[tag=chooseslot1,scores={chooseslot=21..25,detect_sneak=1}] ~ ~ ~ scoreboard players set @s moveslot1 5
execute @s[tag=chooseslot1,scores={chooseslot=26..30,detect_sneak=1}] ~ ~ ~ scoreboard players set @s moveslot1 6
execute @s[tag=chooseslot1,scores={chooseslot=0..36,detect_sneak=1}] ~ ~ ~ tag @s remove chooseslot1