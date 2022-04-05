{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\settings\\avatar.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "bd3c91b4_b8fd_450e_b920_8076c9e3dee5",
	"file_version": 2,
	"cache_content": "#Allow\r\nexecute @s[type=player,scores={aas=..0}] ~~~ scoreboard players set avatar:config aas 1\r\nexecute @s[type=player,scores={aas=..0}] ~~~ tellraw @s {\"rawtext\":[{\"text\":\"§cAvatar is now disabled.\"}]}\r\n\r\n#Deny\r\nexecute @s[type=player,scores={aas=1..}] ~~~ scoreboard players set avatar:config aas 0\r\nexecute @s[type=player,scores={aas=1..}] ~~~ tellraw @s {\"rawtext\":[{\"text\":\"§aAvatar is now enabled. Please be warned, this is not the intended way to play.\"}]}\r\n\r\nscoreboard players operation @a aas = avatar:config aas"
}