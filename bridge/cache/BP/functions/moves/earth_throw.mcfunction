{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_throw.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "0f0eb2e7_9a5a_43f7_893c_f9c08cbd6776",
	"file_version": 82,
	"cache_content": "HIDE \nsummon armor_stand ^ ^ ^-1 huge_size earth_throw\ntag @s add earth_throw\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bEarth Throw\"}]}\nscoreboard players add @s sub_level 1"
}