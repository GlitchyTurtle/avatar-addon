{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\air_scooter.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "cda6abf7_efcd_4d97_8fb6_e30be2f94470",
	"file_version": 40,
	"cache_content": "HIDE \nexecute @s[tag=air] ~ ~ ~ summon a:scooter\nexecute @s[tag=air] ~ ~ ~ ride @s start_riding @e[r=3,type=a:scooter,c=1] teleport_ride\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bAir Scooter\"}]}\nscoreboard players add @s sub_level 1"
}