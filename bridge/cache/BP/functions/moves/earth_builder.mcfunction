{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_builder.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "79de1cde_7eff_4689_96ac_93095a13c5f1",
	"file_version": 24,
	"cache_content": "HIDE \ntag @s add builder_mode\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFocus Build\"}]}\nscoreboard players add @s sub_level 1\nplaysound dig.grass\nplaysound dig.gravel"
}