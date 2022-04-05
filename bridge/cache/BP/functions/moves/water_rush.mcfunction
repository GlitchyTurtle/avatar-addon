{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\water_rush.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "f38e02b6_50d1_47aa_84e2_bbcc6719cf34",
	"file_version": 48,
	"cache_content": "HIDE \ntag @s add selfrush\neffect @s speed 2 10 true\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bWater Rush\"}]}\nscoreboard players add @s sub_level 1\nplaysound bucket.empty_water @a[r=3]"
}