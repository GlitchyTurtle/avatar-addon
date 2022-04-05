{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\become\\air.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "88d80acc_6cf1_4d57_b65f_0c9faa757ce5",
	"file_version": 58,
	"cache_content": "HIDE \ntag @s add air\nscoreboard players set @s moveslot1 0\nscoreboard players set @s moveslot2 0\nscoreboard players set @s moveslot3 0\nscoreboard players set @s moveslot4 0\ntag @s remove water\ntag @s remove fire\ntag @s remove earth\ntag @s remove avatar\ntag @s remove human\nevent entity @s become_air\ntag @s remove choose\nfunction become/movelist_air"
}