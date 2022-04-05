{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_burrow.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "8cef8b90_2550_4799_87bd_fc862d96e505",
	"file_version": 48,
	"cache_content": "HIDE \ntp @s ~ ~-4 ~\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bBurrow\"}]}\nscoreboard players add @s sub_level 1\nplaysound dig.grass\nplaysound dig.gravel\ntag @s add burrow"
}