{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\air\\air_slot_2.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "d66f852d_aaf2_4a61_b5a3_7c39800a41af",
	"file_version": 31,
	"cache_content": "HIDE \nexecute @s[tag=air,scores={moveslot2=1}] ~ ~ ~ function moves/air_blast\nexecute @s[tag=air,scores={moveslot2=2}] ~ ~ ~ function moves/air_launch\nexecute @s[tag=air,scores={moveslot2=3}] ~ ~ ~ function moves/air_scooter\nexecute @s[tag=air,scores={moveslot2=4}] ~ ~ ~ function moves/air_push\nexecute @s[tag=air,scores={moveslot2=5}] ~ ~ ~ function moves/air_vanish\nexecute @s[tag=air,scores={moveslot2=6}] ~ ~ ~ function moves/air_rush\nexecute @s[scores={moveslot2=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}