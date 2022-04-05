{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\water_life_drain.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "d94a4e70_cdc5_490b_93da_54b95a3a105d",
	"file_version": 82,
	"cache_content": "HIDE \nexecute @s ~~~ detect ~~-1~ grass 0 effect @s instant_health 2 2 true\nexecute @s ~~~ detect ~~-1~ grass 0 effect @s saturation 2 2 true\nfill ~4 ~-3 ~ ~-4 ~3 ~ dirt 1 replace grass 0\nfill ~ ~-3 ~-4 ~ ~3 ~4 dirt 1 replace grass 0\nfill ~3 ~-3 ~3 ~-3 ~3 ~-3 dirt 1 replace grass 0\neffect @e[r=10,rm=0.1] wither 1 2 \nscoreboard players set @s cooldown 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bLife Drain\"}]}\nscoreboard players add @s sub_level 1\ntag @s remove selfwater\nplaysound bucket.fill_water"
}