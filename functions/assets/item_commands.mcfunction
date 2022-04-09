HIDE 
#Choose
execute @a[tag=choose] ~~~ function assets/choose
execute @e[tag=!giving_item,type=item,name="choose bending"] ~ ~ ~ tag @p add choose
execute @e[tag=!giving_item,type=item,name="choose bending"] ~ ~ ~ execute @p ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[tag=!giving_item,type=item,name="choose bending"] ~ ~ ~ kill @s
execute @e[tag=!giving_item,type=item,name="Choose Bending"] ~ ~ ~ tag @p add choose
execute @e[tag=!giving_item,type=item,name="Choose Bending"] ~ ~ ~ execute @p ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~
execute @e[tag=!giving_item,type=item,name="Choose Bending"] ~ ~ ~ kill @s
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
#Movelist
execute @a ~ ~ ~ execute @e[tag=!giving_item,tag=!choose,tag=!antimagic,r=10,type=item,name="movelist"] ~ ~ ~ execute @p ~ ~ ~ function assets/movelist
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="movelist"] ~ ~ ~ kill @s
#Useful tools
execute @a ~ ~ ~ execute @e[tag=!giving_item,tag=!choose,tag=!antimagic,r=10,type=item,name="useful tools"] ~ ~ ~ execute @p ~ ~ ~ function useful_tools
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="useful tools"] ~ ~ ~ kill @s
#Stats
execute @a ~ ~ ~ execute @e[tag=!giving_item,tag=!choose,tag=!antimagic,r=10,type=item,name="stats"] ~ ~ ~ execute @p ~ ~ ~ function stats
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="stats"] ~ ~ ~ kill @s
#Help
execute @a ~ ~ ~ execute @e[tag=!giving_item,tag=!choose,tag=!antimagic,r=10,type=item,name="help"] ~ ~ ~ execute @p ~ ~ ~ function help
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="help"] ~ ~ ~ kill @s
#Movemsg
execute @a ~ ~ ~ execute @e[tag=!giving_item,tag=!choose,tag=!antimagic,r=10,type=item,name="movemsg"] ~ ~ ~ execute @p ~ ~ ~ function toggle_movemessage
execute @a ~ ~ ~ execute @e[tag=!giving_item,r=10,type=item,name="movemsg"] ~ ~ ~ kill @s
