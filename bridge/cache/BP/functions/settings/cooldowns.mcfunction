{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\settings\\cooldowns.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "deb92d55_29fd_4739_95f4_8c860fce698e",
	"file_version": 9,
	"cache_content": "#Allow\r\nexecute @s[type=player,scores={cds=..0}] ~~~ scoreboard players set avatar:config cds 1\r\nexecute @s[type=player,scores={cds=..0}] ~~~ tellraw @s {\"rawtext\":[{\"text\":\"§cCooldowns are now disabled. Please be warned, this is not the intended way to play.\"}]}\r\n\r\n#Deny\r\nexecute @s[type=player,scores={cds=1..}] ~~~ scoreboard players set avatar:config cds 0\r\nexecute @s[type=player,scores={cds=1..}] ~~~ tellraw @s {\"rawtext\":[{\"text\":\"§aCooldowns are now enabled.\"}]}\r\n\r\nscoreboard players operation @a cds = avatar:config cds"
}