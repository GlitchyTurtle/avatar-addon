{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\movelist.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "94704d0b_c092_4c42_ae2c_bc49c8322d12",
	"file_version": 5,
	"cache_content": "execute @s[tag=air] ~ ~ ~ function become/movelist_air\r\nexecute @s[tag=fire] ~ ~ ~ function become/movelist_fire\r\nexecute @s[tag=water] ~ ~ ~ function become/movelist_water\r\nexecute @s[tag=earth] ~ ~ ~ function become/movelist_earth\r\nexecute @s[tag=avatar] ~ ~ ~ function become/movelist_avatar\r\nexecute @s[tag=!avatar,tag=!air,tag=!fire,tag=!water,tag=!earth] ~ ~ ~ tellraw  @s  {\"rawtext\":[{\"text\":\"§cPlease pick a bending style to get a moveset.\"}]}"
}