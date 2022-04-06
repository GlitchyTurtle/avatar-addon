#bridge-file-version: #4
HIDE 
execute @s[tag=chooseslot2,scores={detect_left=1,detect_sneak=0}] ~ ~ ~ scoreboard players add @s chooseslot 1
execute @s[tag=chooseslot2,scores={detect_left=1}] ~ ~ ~ scoreboard players set @s detect_left 0
execute @s[tag=chooseslot2] ~ ~ ~ function assets/avatar_choose_menu
execute @s[tag=chooseslot2,scores={chooseslot=45..}] ~ ~ ~ scoreboard players set @s chooseslot 0
execute @s[scores={detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3You chose the move for slot 1!"}]}
execute @s[tag=chooseslot2,scores={chooseslot=0..45,detect_sneak=1}] ~ ~ ~ scoreboard players operation @s moveslot2 = @s chooseslot
execute @s[tag=chooseslot2,scores={chooseslot=0..45,detect_sneak=1}] ~ ~ ~ tag @s remove chooseslot2