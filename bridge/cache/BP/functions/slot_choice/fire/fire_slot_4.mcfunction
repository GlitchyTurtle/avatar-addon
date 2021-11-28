{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\fire\\fire_slot_4.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "2f2de9c2_25e1_4a2a_af04_6e27013c1051",
	"file_version": 9,
	"cache_content": "HIDE \nexecute @s[tag=fire,scores={moveslot4=1}] ~ ~ ~ function moves/fire_blast\nexecute @s[tag=fire,scores={moveslot4=2}] ~ ~ ~ function moves/fire_circle\nexecute @s[tag=fire,scores={moveslot4=3}] ~ ~ ~ function moves/fire_sprint\nexecute @s[tag=fire,scores={moveslot4=4}] ~ ~ ~ function moves/fire_launch\nexecute @s[tag=fire,scores={moveslot4=5}] ~ ~ ~ function moves/fire_lightning\nexecute @s[tag=fire,scores={moveslot4=6}] ~ ~ ~ function moves/fire_magma_floor\nexecute @s[scores={moveslot4=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}