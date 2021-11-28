{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\air\\air_slot_3.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "7c0e4e88_7b74_4c84_8efc_850924c738f1",
	"file_version": 28,
	"cache_content": "HIDE \nexecute @s[tag=air,scores={moveslot3=1}] ~ ~ ~ function moves/air_blast\nexecute @s[tag=air,scores={moveslot3=2}] ~ ~ ~ function moves/air_launch\nexecute @s[tag=air,scores={moveslot3=3}] ~ ~ ~ function moves/air_scooter\nexecute @s[tag=air,scores={moveslot3=4}] ~ ~ ~ function moves/air_push\nexecute @s[tag=air,scores={moveslot3=5}] ~ ~ ~ function moves/air_vanish\nexecute @s[tag=air,scores={moveslot3=6}] ~ ~ ~ function moves/air_rush\nexecute @s[scores={moveslot3=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}