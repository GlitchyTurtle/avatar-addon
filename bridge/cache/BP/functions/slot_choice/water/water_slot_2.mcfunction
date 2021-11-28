{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\water\\water_slot_2.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "3cef1272_6474_4665_8562_b469573d2d73",
	"file_version": 11,
	"cache_content": "HIDE \nexecute @s[tag=water,scores={moveslot2=1}] ~ ~ ~ function moves/water_flood\nexecute @s[tag=water,scores={moveslot2=2}] ~ ~ ~ function moves/water_ice_cage\nexecute @s[tag=water,scores={moveslot2=3}] ~ ~ ~ function moves/water_ice_throw\nexecute @s[tag=water,scores={moveslot2=4}] ~ ~ ~ function moves/water_spear\nexecute @s[tag=water,scores={moveslot2=5}] ~ ~ ~ function moves/water_spike\nexecute @s[tag=water,scores={moveslot2=6}] ~ ~ ~ function moves/water_rush\nexecute @s[scores={moveslot2=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}