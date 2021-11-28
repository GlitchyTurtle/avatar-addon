{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon V5!\\functions\\slot_choice\\earth\\earth_slot_3.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "62d22c6c_05f0_458f_8aab_860da932161c",
	"file_version": 30,
	"cache_content": "HIDE \nexecute @s[tag=earth,scores={moveslot3=1}] ~ ~ ~ function moves/earth_headbutt\nexecute @s[tag=earth,scores={moveslot3=2}] ~ ~ ~ function moves/earth_pillar\nexecute @s[tag=earth,scores={moveslot3=3}] ~ ~ ~ function moves/earth_shove\nexecute @s[tag=earth,scores={moveslot3=4}] ~ ~ ~ function moves/earth_lift\nexecute @s[tag=earth,scores={moveslot3=5}] ~ ~ ~ function moves/earth_shield\nexecute @s[tag=earth,scores={moveslot3=6}] ~ ~ ~ function moves/earth_spikes\nexecute @s[scores={moveslot3=0,cooldown1=100}] ~ ~ ~ tellraw @s {\"rawtext\":[{\"text\":\"§cYou dont have a move set, use /function useful_tools\"}]}\nscoreboard players set @s cooldown1 0"
}