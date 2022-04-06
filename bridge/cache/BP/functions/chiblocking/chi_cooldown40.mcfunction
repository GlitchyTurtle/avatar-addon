{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\chiblocking\\chi_cooldown40.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "0df906e9_e3f0_4069_bd00_268fee89630d",
	"file_version": 8,
	"cache_content": "HIDE \ntag @s[tag=!human,tag=!avatar_state] add antimagic\ntag @s[tag=!human,tag=!avatar_state] add chi_blocked\nscoreboard players set @s[tag=!human,tag=!avatar_state] cooldown1 -700\nexecute @s[tag=avatar_state] ~~~ titleraw @p actionbar {\"rawtext\":[{\"text\":\"§3You can't chi block the avatar state.\"}]}"
}