{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\become\\avatar.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "de9bdfed_d934_43bb_aead_30af52e245f9",
	"file_version": 33,
	"cache_content": "HIDE \ntag @s remove fire\ntag @s remove air\ntag @s remove water\ntag @s remove earth\ntag @s add avatar\ntag @s remove human\nscoreboard players set @s moveslot1 0\nscoreboard players set @s moveslot2 0\nscoreboard players set @s moveslot3 0\nscoreboard players set @s moveslot4 0\nevent entity @s become_avatar\ntag @s remove choose\nfunction become/movelist_avatar"
}