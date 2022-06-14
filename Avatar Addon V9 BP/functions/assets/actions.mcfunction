#Slot 1 - Sneak and look upwards
execute @s[tag=!mmode,tag=air,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_rhx=-90}] ~ ~ ~ function slot_choice/air/air_slot_1
execute @s[tag=!mmode,tag=avatar,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_rhx=-90}] ~ ~ ~ function slot_choice/avatar/avatar_slot_1
execute @s[tag=!mmode,tag=earth,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_rhx=-90,ground=1}] ~ ~ ~ function slot_choice/earth/earth_slot_1
execute @s[tag=!mmode,tag=fire,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_rhx=-90}] ~ ~ ~ function slot_choice/fire/fire_slot_1
execute @s[tag=!mmode,tag=water,tag=!antimagic,tag=!ice_throw,scores={cooldown1=100,detect_left=1,detect_rhx=-90}] ~ ~ ~ function slot_choice/water/water_slot_1

#Slot 2 - Look down and punch
execute @s[tag=!mmode,tag=air,tag=!antimagic,scores={cooldown1=100,detect_rhx=70..89,detect_left=1}] ~ ~ ~ function slot_choice/air/air_slot_2
execute @s[tag=!mmode,tag=avatar,tag=!antimagic,scores={cooldown1=100,detect_rhx=70..89,detect_left=1}] ~ ~ ~ function slot_choice/avatar/avatar_slot_2
execute @s[tag=!mmode,tag=earth,tag=!antimagic,scores={cooldown1=100,detect_rhx=70..89,detect_left=1,ground=1}] ~ ~ ~ function slot_choice/earth/earth_slot_2
execute @s[tag=!mmode,tag=fire,tag=!antimagic,scores={cooldown1=100,detect_rhx=70..89,detect_left=1}] ~ ~ ~ function slot_choice/fire/fire_slot_2
execute @s[tag=!mmode,tag=water,tag=!antimagic,scores={cooldown1=100,detect_rhx=70..89,detect_left=1}] ~ ~ ~ function slot_choice/water/water_slot_2

#Slot 3 - Sneak twice fast
execute @s[tag=!mmode,tag=air,tag=!antimagic,scores={cooldown1=100,detect_dsneak=1}] ~ ~ ~ function slot_choice/air/air_slot_3
execute @s[tag=!mmode,tag=avatar,tag=!antimagic,scores={cooldown1=100,detect_dsneak=1}] ~ ~ ~ function slot_choice/avatar/avatar_slot_3
execute @s[tag=!mmode,tag=earth,tag=!antimagic,scores={cooldown1=100,detect_dsneak=1,ground=1}] ~ ~ ~ function slot_choice/earth/earth_slot_3
execute @s[tag=!mmode,tag=fire,tag=!antimagic,scores={cooldown1=100,detect_dsneak=1}] ~ ~ ~ function slot_choice/fire/fire_slot_3
execute @s[tag=!mmode,tag=water,tag=!antimagic,scores={cooldown1=100,detect_dsneak=1}] ~ ~ ~ function slot_choice/water/water_slot_3

#Slot 4 - Sneak and punch
execute @s[tag=!mmode,tag=air,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_left=1,detect_jump=0}] ~ ~ ~ function slot_choice/air/air_slot_4
execute @s[tag=!mmode,tag=avatar,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_left=1,detect_jump=0}] ~ ~ ~ function slot_choice/avatar/avatar_slot_4
execute @s[tag=!mmode,tag=earth,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_left=1,detect_jump=0,ground=1}] ~ ~ ~ function slot_choice/earth/earth_slot_4
execute @s[tag=!mmode,tag=fire,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_left=1,detect_jump=0}] ~ ~ ~ function slot_choice/fire/fire_slot_4
execute @s[tag=!mmode,tag=water,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_left=1,detect_jump=0}] ~ ~ ~ function slot_choice/water/water_slot_4

#Slot 5 - Look down and jump (unlocked at lvl 20)
execute @s[tag=!mmode,tag=air,tag=!antimagic,scores={cooldown1=100,detect_rhx=89,detect_jump=1,level=20..}] ~ ~ ~  function slot_choice/air/air_slot_5
execute @s[tag=!mmode,tag=avatar,tag=!antimagic,scores={cooldown1=100,detect_rhx=89,detect_jump=1,level=20..}] ~ ~ ~  function slot_choice/avatar/avatar_slot_5
execute @s[tag=!mmode,tag=earth,tag=!antimagic,scores={cooldown1=100,detect_rhx=89,detect_jump=1,level=20..}] ~ ~ ~  function slot_choice/earth/earth_slot_5
execute @s[tag=!mmode,tag=fire,tag=!antimagic,scores={cooldown1=100,detect_rhx=89,detect_jump=1,level=20..}] ~ ~ ~  function slot_choice/fire/fire_slot_5
execute @s[tag=!mmode,tag=water,tag=!antimagic,scores={cooldown1=100,detect_rhx=89,detect_jump=1,level=20..}] ~ ~ ~  function slot_choice/water/water_slot_5

#Slot 6 - Jump in the air and sneak (unlocked at lvl 30)
execute @s[tag=!mmode,tag=air,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_jump=1,detect_left=0,level=30..}] ~ ~ ~ function slot_choice/air/air_slot_6
execute @s[tag=!mmode,tag=avatar,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_jump=1,detect_left=0,level=30..}] ~ ~ ~ function slot_choice/avatar/avatar_slot_6
execute @s[tag=!mmode,tag=earth,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_jump=1,detect_left=0,level=30..}] ~ ~ ~ function slot_choice/earth/earth_slot_6
execute @s[tag=!mmode,tag=fire,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_jump=1,detect_left=0,level=30..}] ~ ~ ~ function slot_choice/fire/fire_slot_6
execute @s[tag=!mmode,tag=water,tag=!antimagic,scores={cooldown1=100,detect_sneak=1,detect_jump=1,detect_left=0,level=30..}] ~ ~ ~ function slot_choice/water/water_slot_6