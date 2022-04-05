{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_shield.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "19db7c3c_913f_4e43_95fb_c5802fa58960",
	"file_version": 11,
	"cache_content": "HIDE \nstructure load earth_shield ~-2 ~-1 ~-2\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bEarth Spikes\"}]}\nscoreboard players add @s sub_level 1\nplaysound dig.grass\nplaysound dig.gravel"
}