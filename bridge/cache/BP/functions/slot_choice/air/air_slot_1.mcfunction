{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\air\\air_slot_1.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "5080e7b7_9d9d_43ed_b5c8_1f1e19cb09df",
	"file_version": 36,
	"cache_content": "HIDE \nexecute @s[tag=air,scores={moveslot1=1}] ~ ~ ~ function moves/air_blast\nexecute @s[tag=air,scores={moveslot1=2}] ~ ~ ~ function moves/air_launch\nexecute @s[tag=air,scores={moveslot1=3}] ~ ~ ~ function moves/air_scooter\nexecute @s[tag=air,scores={moveslot1=4}] ~ ~ ~ function moves/air_push\nexecute @s[tag=air,scores={moveslot1=5}] ~ ~ ~ function moves/air_vanish\nexecute @s[tag=air,scores={moveslot1=6}] ~ ~ ~ function moves/air_rush\nexecute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}