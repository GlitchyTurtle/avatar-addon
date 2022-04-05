{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\water_fountain.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "82f40083_844c_4519_bf75_fbe38c6be2a4",
	"file_version": 71,
	"cache_content": "HIDE \neffect @e[r=3] levitation 1 5 true\nsetblock ~ ~3 ~ flowing_water\nscoreboard players set @s cooldown 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFountain\"}]}\nscoreboard players add @s sub_level 2\nplaysound bucket.fill_water"
}