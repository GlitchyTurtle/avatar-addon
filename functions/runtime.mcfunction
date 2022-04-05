#bridge-file-version: #415
HIDE 
#Actual Power Runtimes
execute @a[tag=air,tag=!antimagic] ~ ~ ~ function runtimes/air
execute @a[tag=earth,tag=!antimagic] ~ ~ ~ function runtimes/earth
execute @a[tag=water,tag=!antimagic] ~ ~ ~ function runtimes/water
execute @a[tag=fire,tag=!antimagic] ~ ~ ~ function runtimes/fire
execute @a[tag=avatar,tag=!antimagic] ~ ~ ~ function runtimes/avatar
execute @a[tag=chooseslot1,tag=!antimagic,tag=!avatar] ~ ~ ~ function assets/slot1choice
execute @a[tag=chooseslot2,tag=!antimagic,tag=!avatar] ~ ~ ~ function assets/slot2choice
execute @a[tag=chooseslot3,tag=!antimagic,tag=!avatar] ~ ~ ~ function assets/slot3choice
execute @a[tag=chooseslot4,tag=!antimagic,tag=!avatar] ~ ~ ~ function assets/slot4choice
execute @a[tag=chooseslot1,tag=!antimagic,tag=avatar] ~ ~ ~ function assets/avatar_choose
execute @a[tag=!choose,tag=!air,tag=!earth,tag=!water,tag=!fire,tag=!avatar] ~ ~ ~ function chiblocking/chiblocking_main
 
execute @a[tag=as23ds] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§cYou died while in avatar state."}]}
execute @a[tag=as23ds] ~ ~ ~ tag @s add antimagic
 
#Setup
execute @a[tag=!setup,tag=!uninstall] ~ ~ ~ function assets/setup
 
#Cooldowns & Charges
execute @a[scores={cooldown1=!100}] ~ ~ ~ scoreboard players add @s cooldown1 1
execute @a[tag=!chi_blocked,tag=cooldown1,scores={cooldown1=100}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3Move Cooldown "},{"score":{"name": "@s","objective": "cooldown1"}},{"text":"%"}]}
execute @a[scores={cooldown1=100}] ~ ~ ~ tag @s remove cooldown1
execute @a[scores={cooldown1=!100}] ~ ~ ~ tag @s add cooldown1
execute @a[tag=!chi_blocked,tag=cooldown1] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Move Cooldown "},{"score":{"name": "@s","objective": "cooldown1"}},{"text":"%"}]}
execute @a[tag=chi_blocked,tag=cooldown1,tag=!avatar_state] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3You have been chi blocked. You will get your bending back in a minute."}]}
execute @a[tag=chi_blocked,tag=cooldown1,tag=!avatar_state] ~~~ effect @s slowness 1 1 true
 
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
execute @a[tag=choose] ~~~ function assets/choose
 
 
execute @e[tag=!giving_item,type=item,name="choose bending"] ~ ~ ~ tag @p add choose
execute @e[tag=!giving_item,type=item,name="choose bending"] ~ ~ ~ execute @p ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[tag=!giving_item,type=item,name="choose bending"] ~ ~ ~ kill @s
execute @e[tag=!giving_item,type=item,name="Choose Bending"] ~ ~ ~ tag @p add choose
execute @e[tag=!giving_item,type=item,name="Choose Bending"] ~ ~ ~ execute @p ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[tag=!giving_item,type=item,name="Choose Bending"] ~ ~ ~ kill @s
 
#Leveling systems
execute @a[scores={level=0..5,sub_level=20..}] ~ ~ ~ function assets/level_up
execute @a[scores={level=6..10,sub_level=30..}] ~ ~ ~ function assets/level_up
execute @a[scores={level=11..15,sub_level=40..}] ~ ~ ~ function assets/level_up
execute @a[scores={level=50..,sub_level=80..}] ~ ~ ~ function assets/level_up
 
#Mobile
execute @a ~ ~ ~ execute @e[r=10,type=item,name="Rabbit's Foot"] ~ ~ ~ replaceitem entity @p slot.hotbar 8 rabbit_foot
execute @a ~ ~ ~ execute @e[r=10,type=item,name="Rabbit's Foot"] ~ ~ ~ kill @s
 
#Disable Bending
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="disable bending"] ~ ~ ~ execute @p ~ ~ ~ function assets/disable_and_enable_bending
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
 
scoreboard players add @a detect_init 0
execute @a[scores={detect_init=0}] ~~~ function detect_init
scoreboard players add @a[scores={detect_sneakTemp=1..}] detect_sneakTemp -1
 
#Settings
execute @a[scores={cds=1}] ~~~ scoreboard players set @s cooldown1 100