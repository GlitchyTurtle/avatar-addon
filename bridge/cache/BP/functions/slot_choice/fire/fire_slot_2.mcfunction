{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\fire\\fire_slot_2.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "10e740f3_8ec1_498d_98c9_5b3fcad70d32",
	"file_version": 8,
	"cache_content": "HIDE \nexecute @s[tag=fire,scores={moveslot2=1}] ~ ~ ~ function moves/fire_blast\nexecute @s[tag=fire,scores={moveslot2=2}] ~ ~ ~ function moves/fire_circle\nexecute @s[tag=fire,scores={moveslot2=3}] ~ ~ ~ function moves/fire_sprint\nexecute @s[tag=fire,scores={moveslot2=4}] ~ ~ ~ function moves/fire_launch\nexecute @s[tag=fire,scores={moveslot2=5}] ~ ~ ~ function moves/fire_lightning\nexecute @s[tag=fire,scores={moveslot2=6}] ~ ~ ~ function moves/fire_magma_floor\nexecute @s[scores={moveslot2=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}