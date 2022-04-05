{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\fire_circle.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "2c937772_85f1_436e_a971_d9f80fd32717",
	"file_version": 19,
	"cache_content": "HIDE \nfill ~2 ~ ~2 ~-2 ~ ~-2 fire 0 keep\nfill ~3 ~ ~1 ~-1 ~ ~-1 fire 0 keep\nfill ~1 ~ ~3 ~-1 ~ ~-1 fire 0 keep\nfill ~-1 ~ ~1 ~-3 ~ ~-1 fire 0 keep\nfill ~1 ~ ~-3 ~-1 ~ ~-1 fire 0 keep\nscoreboard players set @s cooldown 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFire Circle\"}]}\nscoreboard players add @s sub_level 1\nplaysound bucket.fill_lava"
}