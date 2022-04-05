{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\water_ice_throw.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "6c7e103f_b259_49e7_a2be_51dcddb6d6a2",
	"file_version": 74,
	"cache_content": "HIDE \nsummon armor_stand ^ ^ ^-1 normal_size ice_throw\ntag @s add ice_throw\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bIce Throw\"}]}\nscoreboard players add @s sub_level 1\nplaysound bucket.fill_water"
}