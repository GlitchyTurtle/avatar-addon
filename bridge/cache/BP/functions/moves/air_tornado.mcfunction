{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\air_tornado.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "52287e9f_eab8_4a48_86e0_a96546088ed2",
	"file_version": 29,
	"cache_content": "HIDE \nsummon a:move_helper ^ ^1 ^2\ntag @e[c=1,r=13,type=a:move_helper] add tornado\neffect @e[r=13,type=a:move_helper] fatal_poison 90 1 true\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bAir Blade\"}]}\nscoreboard players add @s sub_level 2"
}