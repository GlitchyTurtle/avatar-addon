{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\fire_jump.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "19929fac_8dfe_460a_ba65_9b5652ebfdf8",
	"file_version": 22,
	"cache_content": "HIDE \nsetblock ~~~ fire\neffect @s levitation 1 10 true\nscoreboard players set @s cooldown 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFire Jump\"}]}\nscoreboard players add @s sub_level 1\nplaysound bucket.fill_lava"
}