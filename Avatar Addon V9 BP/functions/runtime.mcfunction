HIDE 
function assets/eafwa_runtime
function assets/cooldown
function assets/grounded
#Setup
execute @a[tag=!spawn,tag=!setup,tag=!uninstall] ~ ~ ~ function assets/setup
execute @a[tag=!spawn,tag=as23ds] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§cYou died while in avatar state."}]}
execute @a[tag=!spawn,tag=as23ds] ~ ~ ~ tag @s add antimagic
#Leveling systems
execute @a[tag=!spawn,scores={level=0..5,sub_level=20..}] ~ ~ ~ function assets/level_up
execute @a[tag=!spawn,scores={level=6..10,sub_level=30..}] ~ ~ ~ function assets/level_up
execute @a[tag=!spawn,scores={level=11..49,sub_level=40..}] ~ ~ ~ function assets/level_up
execute @a[tag=!spawn,scores={level=50..,sub_level=80..}] ~ ~ ~ function assets/level_up
#Mobile
execute @a[tag=!spawn] ~ ~ ~ execute @e[r=10,type=item,name="Rabbit's Foot"] ~ ~ ~ replaceitem entity @p slot.hotbar 8 rabbit_foot
execute @a[tag=!spawn] ~ ~ ~ execute @e[r=10,type=item,name="Rabbit's Foot"] ~ ~ ~ kill @s
#Settings
scoreboard players add @a detect_init 0
execute @a[scores={detect_init=0}] ~~~ function detect_init
scoreboard players add @a[scores={detect_sneakTemp=1..}] detect_sneakTemp -1
execute @a[scores={cds=1}] ~~~ scoreboard players set @s cooldown1 100
scoreboard players operation @a aas = avatar:config aas
scoreboard players operation @a cds = avatar:config cds
#Misc
execute @a[tag=avatar_antimagic] ~ ~ ~ tag @s add antimagic
execute @a[scores={level=4..}] ~~~ function assets/unlocks
#Chiblocking
execute @a[tag=chi_blocked] ~~~ tag @s add antimagic
execute @a[tag=antimagic,tag=chi_blocked,scores={cooldown1=100}] ~~~ tag @s remove antimagic
execute @a[tag=chi_blocked,scores={cooldown1=100}] ~~~ tag @s remove chi_blocked
#Clear Extra Items
execute @a ~~~ function assets/clearextras
