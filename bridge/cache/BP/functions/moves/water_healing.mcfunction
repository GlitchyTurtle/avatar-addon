{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\water_healing.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "5c11030a_9513_4cb7_b377_c9bee3286586",
	"file_version": 64,
	"cache_content": "HIDE \nsummon a:healing_water\nscoreboard players set @s cooldown 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bWater Healing\"}]}\nscoreboard players add @s sub_level 1\ntag @s remove selfwater\nplaysound bucket.fill_water"
}