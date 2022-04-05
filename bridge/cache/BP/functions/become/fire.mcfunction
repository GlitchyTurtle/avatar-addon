{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\become\\fire.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "60e45c3e_0a61_4b6f_b1dd_3365916f1739",
	"file_version": 33,
	"cache_content": "HIDE \ntag @s add fire\ntag @s remove air\ntag @s remove water\ntag @s remove earth\ntag @s remove avatar\ntag @s remove human\nscoreboard players set @s moveslot1 0\nscoreboard players set @s moveslot2 0\nscoreboard players set @s moveslot3 0\nscoreboard players set @s moveslot4 0\nevent entity @s become_fire\ntag @s remove choose\nfunction become/movelist_fire"
}