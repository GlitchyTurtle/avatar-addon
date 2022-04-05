{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\fire_sprint.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "5282ae42_f518_4756_9354_0727683912fd",
	"file_version": 12,
	"cache_content": "HIDE \neffect @s speed 3 5 true\nscoreboard players set @s cooldown 0\ntag @p add fire_sprint\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFire Sprint\"}]}\nscoreboard players add @s sub_level 1\nplaysound bucket.fill_lava"
}