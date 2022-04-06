{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\chiblocking\\chi_cooldown50.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "08f9ad7c_515c_4965_befc_b0c2b7648a30",
	"file_version": 9,
	"cache_content": "HIDE \ntag @s[tag=!human,tag=!avatar_state] add antimagic\ntag @s[tag=!human,tag=!avatar_state] add chi_blocked\nscoreboard players set @s[tag=!human,tag=!avatar_state] cooldown1 -900\nexecute @s[tag=avatar_state] ~~~ titleraw @p actionbar {\"rawtext\":[{\"text\":\"§3You can't chi block the avatar state.\"}]}"
}