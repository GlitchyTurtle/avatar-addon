{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\become\\earth.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "01d57ae4_869a_425b_9615_0f860ce885cd",
	"file_version": 69,
	"cache_content": "HIDE \ntag @s add earth\ntag @s remove air\ntag @s remove water\ntag @s remove fire\ntag @s remove avatar\ntag @s remove human\nscoreboard players set @s moveslot1 0\nscoreboard players set @s moveslot2 0\nscoreboard players set @s moveslot3 0\nscoreboard players set @s moveslot4 0\nevent entity @s become_earth\ntag @s remove choose\nfunction become/movelist_earth"
}