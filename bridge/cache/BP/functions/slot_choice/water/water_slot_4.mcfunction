{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\water\\water_slot_4.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "ae00d6ff_c729_4c6d_8f2e_8fcd117ad284",
	"file_version": 11,
	"cache_content": "HIDE \nexecute @s[tag=water,scores={moveslot4=1}] ~ ~ ~ function moves/water_flood\nexecute @s[tag=water,scores={moveslot4=2}] ~ ~ ~ function moves/water_ice_cage\nexecute @s[tag=water,scores={moveslot4=3}] ~ ~ ~ function moves/water_ice_throw\nexecute @s[tag=water,scores={moveslot4=4}] ~ ~ ~ function moves/water_spear\nexecute @s[tag=water,scores={moveslot4=5}] ~ ~ ~ function moves/water_spike\nexecute @s[tag=water,scores={moveslot4=6}] ~ ~ ~ function moves/water_rush\nexecute @s[scores={moveslot4=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}