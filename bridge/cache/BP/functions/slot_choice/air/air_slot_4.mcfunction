{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\air\\air_slot_4.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "cbfa5119_1bfa_4399_add9_64433efa5b00",
	"file_version": 29,
	"cache_content": "HIDE \nexecute @s[tag=air,scores={moveslot4=1}] ~ ~ ~ function moves/air_blast\nexecute @s[tag=air,scores={moveslot4=2}] ~ ~ ~ function moves/air_launch\nexecute @s[tag=air,scores={moveslot4=3}] ~ ~ ~ function moves/air_scooter\nexecute @s[tag=air,scores={moveslot4=4}] ~ ~ ~ function moves/air_push\nexecute @s[tag=air,scores={moveslot4=5}] ~ ~ ~ function moves/air_vanish\nexecute @s[tag=air,scores={moveslot4=6}] ~ ~ ~ function moves/air_rush\nexecute @s[scores={moveslot4=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}