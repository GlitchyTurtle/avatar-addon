{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\water\\water_slot_1.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "eafd8830_e2f5_4797_9888_173309a11f54",
	"file_version": 8,
	"cache_content": "HIDE \nexecute @s[tag=water,scores={moveslot1=1}] ~ ~ ~ function moves/water_flood\nexecute @s[tag=water,scores={moveslot1=2}] ~ ~ ~ function moves/water_ice_cage\nexecute @s[tag=water,scores={moveslot1=3}] ~ ~ ~ function moves/water_ice_throw\nexecute @s[tag=water,scores={moveslot1=4}] ~ ~ ~ function moves/water_spear\nexecute @s[tag=water,scores={moveslot1=5}] ~ ~ ~ function moves/water_spike\nexecute @s[tag=water,scores={moveslot1=6}] ~ ~ ~ function moves/water_rush\nexecute @s[scores={moveslot1=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"You dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}