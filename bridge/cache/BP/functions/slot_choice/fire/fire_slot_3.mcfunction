{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\fire\\fire_slot_3.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "f3a1996a_a26d_4590_91b7_a26da0c31d7d",
	"file_version": 7,
	"cache_content": "HIDE \nexecute @s[tag=fire,scores={moveslot3=1}] ~ ~ ~ function moves/fire_blast\nexecute @s[tag=fire,scores={moveslot3=2}] ~ ~ ~ function moves/fire_circle\nexecute @s[tag=fire,scores={moveslot3=3}] ~ ~ ~ function moves/fire_sprint\nexecute @s[tag=fire,scores={moveslot3=4}] ~ ~ ~ function moves/fire_launch\nexecute @s[tag=fire,scores={moveslot3=5}] ~ ~ ~ function moves/fire_lightning\nexecute @s[tag=fire,scores={moveslot3=6}] ~ ~ ~ function moves/fire_magma_floor\nexecute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"You dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}