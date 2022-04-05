{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\air_seeking_blast.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "e96be5ed_09b9_42aa_82eb_0e08385d7739",
	"file_version": 48,
	"cache_content": "HIDE \nsummon a:move_helper\ntag @e[c=1,r=3,type=a:move_helper] add seeking\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bAir Artillery\"}]}\nscoreboard players add @s sub_level 2\nplaysound monb.mob.shulker.shoot @a[r=3]"
}