#bridge-file-version: #0
HIDE 
#Cooldowns & Charges
execute @a[scores={cooldown1=!100,detect_sneak=0}] ~ ~ ~ scoreboard players add @s cooldown1 1
execute @a[scores={cooldown1=!100,detect_sneak=1}] ~ ~ ~ scoreboard players add @s cooldown1 2
execute @a[scores={cooldown1=100..}] ~ ~ ~ scoreboard players set @s cooldown1 100
execute @a[tag=!chi_blocked,tag=cooldown1,scores={cooldown1=100}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3Move Cooldown "},{"score":{"name": "@s","objective": "cooldown1"}},{"text":"%"}]}
execute @a[scores={cooldown1=100}] ~ ~ ~ tag @s remove cooldown1
execute @a[scores={cooldown1=!100}] ~ ~ ~ tag @s add cooldown1
execute @a[tag=!chi_blocked,tag=cooldown1] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Move Cooldown "},{"score":{"name": "@s","objective": "cooldown1"}},{"text":"%"}]}
execute @a[tag=chi_blocked,tag=cooldown1,tag=!avatar_state] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3You have been chi blocked. You will get your bending soon."}]}
execute @a[tag=chi_blocked,tag=cooldown1,tag=!avatar_state] ~~~ effect @s slowness 1 1 true