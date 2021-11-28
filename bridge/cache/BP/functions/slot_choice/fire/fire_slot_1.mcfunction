{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\fire\\fire_slot_1.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "c947ad3c_7a8a_4224_a7a6_02836c1c2b5a",
	"file_version": 8,
	"cache_content": "HIDE \nexecute @s[tag=fire,scores={moveslot1=1}] ~ ~ ~ function moves/fire_blast\nexecute @s[tag=fire,scores={moveslot1=2}] ~ ~ ~ function moves/fire_circle\nexecute @s[tag=fire,scores={moveslot1=3}] ~ ~ ~ function moves/fire_sprint\nexecute @s[tag=fire,scores={moveslot1=4}] ~ ~ ~ function moves/fire_launch\nexecute @s[tag=fire,scores={moveslot1=5}] ~ ~ ~ function moves/fire_lightning\nexecute @s[tag=fire,scores={moveslot1=6}] ~ ~ ~ function moves/fire_magma_floor\nexecute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}