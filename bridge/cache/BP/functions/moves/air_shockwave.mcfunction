{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\air_shockwave.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "1516ac61_4b26_4f54_9f65_96f18ddc6c85",
	"file_version": 14,
	"cache_content": "HIDE \ntag @s add shockwave\nsummon armor_stand ~ ~ ~1.5 normal_size shockwave_air\nsummon armor_stand ~ ~ ~-1.5 normal_size shockwave_air\nsummon armor_stand ~1.5 ~ ~ normal_size shockwave_air\nsummon armor_stand ~-1.5 ~ ~ normal_size shockwave_air\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bShockwave\"}]}\nscoreboard players add @s sub_level 2\nplaysound monb.mob.shulker.shoot @a[r=3]\neffect @e[r=5,type=armor_stand,name=shockwave_air] fatal_poison 90 10 true"
}