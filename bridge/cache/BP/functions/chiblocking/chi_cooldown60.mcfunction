{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\chiblocking\\chi_cooldown60.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "ec74a539_f3bb_4598_a965_e7a3e6d3454d",
	"file_version": 7,
	"cache_content": "HIDE \ntag @s[tag=!human,tag=!avatar_state] add antimagic\ntag @s[tag=!human,tag=!avatar_state] add chi_blocked\nscoreboard players set @s[tag=!human,tag=!avatar_state] cooldown1 -1100\nexecute @s[tag=avatar_state] ~~~ titleraw @p actionbar {\"rawtext\":[{\"text\":\"§3You can't chi block the avatar state.\"}]}"
}