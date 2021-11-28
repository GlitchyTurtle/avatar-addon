{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\earth\\earth_slot_4.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "b62c5289_7edf_44de_b1d6_b161204a70d9",
	"file_version": 31,
	"cache_content": "HIDE \nexecute @s[tag=earth,scores={moveslot4=1}] ~ ~ ~ function moves/earth_headbutt\nexecute @s[tag=earth,scores={moveslot4=2}] ~ ~ ~ function moves/earth_pillar\nexecute @s[tag=earth,scores={moveslot4=3}] ~ ~ ~ function moves/earth_shove\nexecute @s[tag=earth,scores={moveslot4=4}] ~ ~ ~ function moves/earth_lift\nexecute @s[tag=earth,scores={moveslot4=5}] ~ ~ ~ function moves/earth_shield\nexecute @s[tag=earth,scores={moveslot4=6}] ~ ~ ~ function moves/earth_spikes\nexecute @s[scores={moveslot4=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}