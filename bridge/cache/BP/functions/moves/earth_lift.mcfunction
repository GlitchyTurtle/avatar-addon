{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_lift.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "54992fca_3e0f_4572_a63f_6b7b1015d377",
	"file_version": 100,
	"cache_content": "HIDE \nexecute @s ~ ~ ~ clone ~5 ~-2 ~5 ~-5 ~4 ~-5 ~-5 ~4 ~-5 masked move\nexecute @e[r=10] ~ ~ ~ tp @s ~ ~6 ~\nsummon a:move_helper\nexecute @e[r=3,type=a:move_helper] ~ ~ ~ tag @s add drop_back_down\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bEarth Lift\"}]}\nscoreboard players add @s sub_level 2\nplaysound dig.grass\nplaysound dig.gravel\nplaysound dig.grass\nplaysound dig.gravel"
}