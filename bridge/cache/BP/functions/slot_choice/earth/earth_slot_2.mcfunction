{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\earth\\earth_slot_2.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "ad2792fe_baaf_448c_9836_e50e2f0b3b43",
	"file_version": 28,
	"cache_content": "HIDE \nexecute @s[tag=earth,scores={moveslot2=1}] ~ ~ ~ function moves/earth_headbutt\nexecute @s[tag=earth,scores={moveslot2=2}] ~ ~ ~ function moves/earth_pillar\nexecute @s[tag=earth,scores={moveslot2=3}] ~ ~ ~ function moves/earth_shove\nexecute @s[tag=earth,scores={moveslot2=4}] ~ ~ ~ function moves/earth_lift\nexecute @s[tag=earth,scores={moveslot2=5}] ~ ~ ~ function moves/earth_shield\nexecute @s[tag=earth,scores={moveslot2=6}] ~ ~ ~ function moves/earth_spikes\nexecute @s[scores={moveslot2=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}