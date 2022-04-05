{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\become\\water.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "01768d47_a678_4661_8d71_1bcf89202c52",
	"file_version": 36,
	"cache_content": "HIDE \ntag @s add water\ntag @s remove air\ntag @s remove fire\ntag @s remove earth\ntag @s remove avatar\ntag @s remove human\nscoreboard players set @s moveslot1 0\nscoreboard players set @s moveslot2 0\nscoreboard players set @s moveslot3 0\nscoreboard players set @s moveslot4 0\nevent entity @s become_water\ntag @s remove choose\nfunction become/movelist_water"
}