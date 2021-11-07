#bridge-file-version: #372
HIDE 
#Actual Power Runtimes
execute @a[tag=air,tag=!antimagic] ~ ~ ~ function air/air
execute @a[tag=earth,tag=!antimagic] ~ ~ ~ function earth/earth
execute @a[tag=water,tag=!antimagic] ~ ~ ~ function water/water
execute @a[tag=fire,tag=!antimagic] ~ ~ ~ function fire/fire
execute @a[tag=avatar,tag=!antimagic] ~ ~ ~ function avatar/avatar
execute @a[tag=chooseslot1,tag=!antimagic] ~ ~ ~ function slot1choice
execute @a[tag=chooseslot2,tag=!antimagic] ~ ~ ~ function slot2choice
execute @a[tag=chooseslot3,tag=!antimagic] ~ ~ ~ function slot3choice
execute @a[tag=chooseslot4,tag=!antimagic] ~ ~ ~ function slot4choice
 
#Setup
execute @a[tag=!setup] ~ ~ ~ function setup
 
#Cooldowns & Charges
execute @a[scores={cooldown1=!100}] ~ ~ ~ scoreboard players add @s cooldown1 1
execute @a[tag=cooldown1,scores={cooldown1=100}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3Move Cooldown "},{"score":{"name": "@s","objective": "cooldown1"}},{"text":"%"}]}
execute @a[scores={cooldown1=100}] ~ ~ ~ tag @s remove cooldown1
execute @a[scores={cooldown1=!100}] ~ ~ ~ tag @s add cooldown1
execute @a[tag=cooldown1] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Move Cooldown "},{"score":{"name": "@s","objective": "cooldown1"}},{"text":"%"}]}
 
#Gounded Check
execute @a ~ ~ ~ detect ~ ~-1 ~ air 0 scoreboard players set @s ground 0
execute @a ~ ~ ~ detect ~ ~-1 ~ structure_void 0 scoreboard players set @s ground 0
execute @a ~ ~ ~ detect ~ ~-1 ~ water 0 scoreboard players set @s ground 0
execute @a ~ ~ ~ detect ~ ~-1 ~ flowing_water 0 scoreboard players set @s ground 0
execute @a ~ ~ ~ detect ~ ~-1 ~ grass 0 scoreboard players set @s ground 1
execute @a ~ ~ ~ detect ~ ~-1 ~ sand 0 scoreboard players set @s ground 1
execute @a ~ ~ ~ detect ~ ~-1 ~ stone 0 scoreboard players set @s ground 1
execute @a ~ ~ ~ detect ~ ~-1 ~ obsidian 0 scoreboard players set @s ground 1
execute @a ~ ~ ~ detect ~ ~-1 ~ stone 1 scoreboard players set @s ground 1
execute @a ~ ~ ~ detect ~ ~-1 ~ stone 3 scoreboard players set @s ground 1
execute @a ~ ~ ~ detect ~ ~-1 ~ stone 5 scoreboard players set @s ground 1
execute @a ~ ~ ~ detect ~ ~-1 ~ gravel 0 scoreboard players set @s ground 1
execute @a ~ ~ ~ detect ~ ~-1 ~ dirt 0 scoreboard players set @s ground 1
execute @a ~ ~ ~ detect ~ ~-1 ~ sandstone 0 scoreboard players set @s ground 1
 
#Choose
execute @a[tag=choose,scores={choose=!26,detect_left=1,detect_sneak=0}] ~ ~ ~ scoreboard players add @s choose 5
execute @a[tag=choose,scores={choose=!26,detect_left=1}] ~ ~ ~ scoreboard players set @s detect_left 0
execute @a[tag=choose,scores={choose=0..5}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6[Fire] §3[Earth] [Water] [Air] [Avatar(nope)] [Human]"}]}
execute @a[tag=choose,scores={choose=6..10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] §6[Earth] §3[Water] [Air] [Avatar(nope)] [Human]"}]}
execute @a[tag=choose,scores={choose=11..15}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] §6[Water] §3[Air] [Avatar(nope)] [Human]"}]}
execute @a[tag=choose,scores={choose=16..20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] [Water] §6[Air] §3[Avatar(nope)] [Human]"}]}
execute @a[tag=choose,scores={choose=21..25}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] [Water] [Air] §6[Avatar(nope)] §3[Human]"}]}
execute @a[tag=choose,scores={choose=26..30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] [Water] [Air] [Avatar (nope)] §6[Human]"}]}
execute @a[tag=choose,scores={choose=31..}] ~ ~ ~ scoreboard players set @s choose 5
 
execute @a[tag=choose,scores={choose=0..5,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Fire"}]}
execute @a[tag=choose,scores={choose=6..10,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Earth"}]}
execute @a[tag=choose,scores={choose=11..15,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Water"}]}
execute @a[tag=choose,scores={choose=16..20,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Air"}]}
execute @a[tag=choose,scores={choose=26..30,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Human"}]}
 
execute @a[tag=choose,scores={choose=0..5,detect_sneak=1}] ~ ~ ~ function become_fire
execute @a[tag=choose,scores={choose=6..10,detect_sneak=1}] ~ ~ ~ function become_earth
execute @a[tag=choose,scores={choose=11..15,detect_sneak=1}] ~ ~ ~ function become_water
execute @a[tag=choose,scores={choose=16..20,detect_sneak=1}] ~ ~ ~ function become_air
execute @a[tag=choose,scores={choose=21..25,detect_sneak=1}] ~ ~ ~ function become_human
execute @a[tag=choose,scores={choose=26..30,detect_sneak=1}] ~ ~ ~ function become_human
 
execute @e[tag=!giving_item,type=item,name="choose bending"] ~ ~ ~ tag @p add choose
execute @e[tag=!giving_item,type=item,name="choose bending"] ~ ~ ~ execute @p ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[tag=!giving_item,type=item,name="choose bending"] ~ ~ ~ kill @s
execute @e[tag=!giving_item,type=item,name="Choose Bending"] ~ ~ ~ tag @p add choose
execute @e[tag=!giving_item,type=item,name="Choose Bending"] ~ ~ ~ execute @p ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[tag=!giving_item,type=item,name="Choose Bending"] ~ ~ ~ kill @s
 
#Leveling systems
execute @a[scores={level=0..5,sub_level=20..}] ~ ~ ~ function level_up
execute @a[scores={level=6..10,sub_level=30..}] ~ ~ ~ function level_up
execute @a[scores={level=11..15,sub_level=40..}] ~ ~ ~ function level_up
execute @a[scores={level=50..,sub_level=80..}] ~ ~ ~ function level_up
 
#Mobile
execute @a ~ ~ ~ execute @e[r=10,type=item,name="Rabbit's Foot"] ~ ~ ~ replaceitem entity @p slot.hotbar 8 rabbit_foot
execute @a ~ ~ ~ execute @e[r=10,type=item,name="Rabbit's Foot"] ~ ~ ~ kill @s
 
#Disable Bending
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="disable bending"] ~ ~ ~ execute @p ~ ~ ~ function disable_and_enable_bending
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="disable bending"] ~ ~ ~ kill @s
execute @a[tag=avatar_antimagic] ~ ~ ~ tag @s add antimagic
 
#Choose Slots
execute @a ~ ~ ~ execute @e[tag=!giving_item,tag=!choose,tag=!antimagic,tag=!chooseslot1,tag=!chooseslot2,tag=!chooseslot3,tag=!chooseslot4,r=10,type=item,name="choose slot 1"] ~ ~ ~ execute @p ~ ~ ~ tag @s add chooseslot1
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="choose slot 1"] ~ ~ ~ kill @s
execute @a ~ ~ ~ execute @e[tag=!giving_item,tag=!choose,tag=!antimagic,tag=!chooseslot1,tag=!chooseslot2,tag=!chooseslot3,tag=!chooseslot4,r=10,type=item,name="choose slot 2"] ~ ~ ~ execute @p ~ ~ ~ tag @s add chooseslot2
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="choose slot 2"] ~ ~ ~ kill @s
execute @a ~ ~ ~ execute @e[tag=!giving_item,tag=!choose,tag=!antimagic,tag=!chooseslot1,tag=!chooseslot2,tag=!chooseslot3,tag=!chooseslot4,r=10,type=item,name="choose slot 3"] ~ ~ ~ execute @p ~ ~ ~ tag @s add chooseslot3
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="choose slot 3"] ~ ~ ~ kill @s
execute @a ~ ~ ~ execute @e[tag=!giving_item,tag=!choose,tag=!antimagic,tag=!chooseslot1,tag=!chooseslot2,tag=!chooseslot3,tag=!chooseslot4,r=10,type=item,name="choose slot 4"] ~ ~ ~ execute @p ~ ~ ~ tag @s add chooseslot4
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="choose slot 4"] ~ ~ ~ kill @s
execute @a[tag=chooseslot1] ~ ~ ~ scoreboard players set @s cooldown1 100
execute @a[tag=chooseslot2] ~ ~ ~ scoreboard players set @s cooldown1 100
execute @a[tag=chooseslot3] ~ ~ ~ scoreboard players set @s cooldown1 100
execute @a[tag=chooseslot4] ~ ~ ~ scoreboard players set @s cooldown1 100