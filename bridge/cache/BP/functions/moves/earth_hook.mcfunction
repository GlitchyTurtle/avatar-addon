{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_hook.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "ed9a31a5_855f_4e60_a20e_61c6483b32ac",
	"file_version": 29,
	"cache_content": "HIDE\ntag @s add earth_scaffold\nsetblock ~ ~-1 ~ dirt\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bEarth Scaffold\"}]}\nscoreboard players add @s sub_level 1\nplaysound dig.grass\nplaysound dig.gravel"
}