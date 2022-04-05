{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_headbutt.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "429b23b7_db0b_4303_a2b5_1d218e4bc312",
	"file_version": 42,
	"cache_content": "HIDE \neffect @s speed 2 10 true\ntag @p add headbutt\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bHeadbutt\"}]}\nscoreboard players add @s sub_level 1\nplaysound dig.grass\nplaysound dig.gravel"
}