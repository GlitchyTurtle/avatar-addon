#bridge-file-version: #38
HIDE 
execute @s[scores={combo=1..5}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Hits needed to Block Chi: "},{"score":{"name": "@s","objective": "combo"}},{"text":"/6"}]}
 
function chiblocking/chiblock
 
execute @a[tag=chi_blocked] ~~~ tag @s add antimagic
execute @s[scores={combo=6..}] ~~~ scoreboard players add @s sub_level 2
execute @s[scores={combo=6..}] ~~~ scoreboard players set @s combo 0
execute @a[tag=antimagic,tag=chi_blocked,scores={cooldown1=100}] ~~~ tag @s remove antimagic
execute @a[tag=chi_blocked,scores={cooldown1=100}] ~~~ tag @s remove chi_blocked