{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\fire_seeking_blast.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "77d32627_5c91_464b_82b2_d651a3267aa3",
	"file_version": 50,
	"cache_content": "HIDE \nsummon a:move_helper\ntag @e[c=1,r=3,type=a:move_helper] add seeking\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFire Finder\"}]}\nscoreboard players add @s sub_level 2\nplaysound monb.mob.shulker.shoot @a[r=3]"
}