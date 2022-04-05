{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\fire_smite.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "3ce5525d_6a6c_42dd_affb_bf5aa16aa309",
	"file_version": 19,
	"cache_content": "HIDE \nexecute @e[r=10,rm=0.1] ~~~ summon lightning_bolt\ndamage @s 10 none\nscoreboard players set @s cooldown 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFire Smite\"}]}\nscoreboard players add @s sub_level 1"
}