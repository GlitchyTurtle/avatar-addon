{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\water_flood.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "e4ed34a1_9d2e_479a_915b_0a281afd8dfd",
	"file_version": 37,
	"cache_content": "HIDE \ntag @s add selfflood\nfill ~1 ~1 ~1 ~-1 ~1 ~-1 flowing_water 0 keep\ndamage @e[r=4] 5 none\nscoreboard players set @s cooldown1 50\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFlood\"}]}\nscoreboard players add @s sub_level 1\ntag @s remove selfflood\nplaysound bucket.empty_water @a[r=3]"
}