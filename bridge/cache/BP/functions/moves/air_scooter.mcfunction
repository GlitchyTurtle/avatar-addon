{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\air_scooter.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "49e2ee66_6127_4332_be3e_49594fed0bc3",
	"file_version": 42,
	"cache_content": "HIDE \nexecute @s[tag=air] ~ ~ ~ summon a:scooter\nexecute @s[tag=avatar] ~ ~ ~ summon a:scooter\nexecute @s[tag=air] ~ ~ ~ ride @s start_riding @e[r=3,type=a:scooter,c=1] teleport_ride\nexecute @s[tag=avatar] ~ ~ ~ ride @s start_riding @e[r=3,type=a:scooter,c=1] teleport_ride\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bAir Scooter\"}]}\nscoreboard players add @s sub_level 1"
}