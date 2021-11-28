{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\water\\water_slot_3.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "61216d87_7643_4c3a_a16b_f09c7c7bf622",
	"file_version": 13,
	"cache_content": "HIDE \nexecute @s[tag=water,scores={moveslot3=1}] ~ ~ ~ function moves/water_flood\nexecute @s[tag=water,scores={moveslot3=2}] ~ ~ ~ function moves/water_ice_cage\nexecute @s[tag=water,scores={moveslot3=3}] ~ ~ ~ function moves/water_ice_throw\nexecute @s[tag=water,scores={moveslot3=4}] ~ ~ ~ function moves/water_spear\nexecute @s[tag=water,scores={moveslot3=5}] ~ ~ ~ function moves/water_spike\nexecute @s[tag=water,scores={moveslot3=6}] ~ ~ ~ function moves/water_rush\nexecute @s[scores={moveslot3=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}