{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\water_ice_cage.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "1ef0cdcc_cc09_4f41_b6ec_9256ee1ffb0c",
	"file_version": 20,
	"cache_content": "HIDE \ntag @s add selfice\nexecute @e[r=4,tag=!selfice] ~ ~ ~ fill ~1 ~-1 ~1 ~-1 ~2 ~-1 ice 0 keep\nexecute @e[r=4,tag=!selfice] ~ ~ ~ fill ~ ~ ~ ~ ~1 ~ air 0 replace ice\nscoreboard players set @s cooldown 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bIce Cage\"}]}\nscoreboard players add @s sub_level 1\ntag @s remove selfice\nplaysound beacon.power @a[r=6]"
}