#bridge-file-version: #0
HIDE 
scoreboard players set @a[scores={detect_sneak=1, detect_sneakTemp=1..}] detect_dsneak 1
scoreboard players set @a[scores={detect_dsneak=1}] detect_sneakTemp 0
execute @a[scores={detect_sneak=1, detect_dsneak=0}] ~~~ scoreboard players operation @s detect_sneakTemp = @s detect_dsneakSet