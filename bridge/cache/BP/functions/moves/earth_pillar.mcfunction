{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_pillar.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "56fc5cd5_e85c_442c_bbc3_382ad77cb831",
	"file_version": 48,
	"cache_content": "HIDE \nexecute @s[tag=!antimagic,scores={cooldown1=100,ground=1}] ~ ~ ~ tp @s ~ ~4 ~\nexecute @s[tag=!antimagic,scores={cooldown1=100,ground=1}] ~ ~ ~ clone ~ ~-8 ~ ~ ~-4 ~ ~ ~-4 ~\nexecute @s[tag=!antimagic,scores={cooldown1=100,ground=1}] ~ ~ ~ scoreboard players set @s cooldown1 50\nexecute @s[tag=!antimagic,scores={cooldown1=50,ground=1}] ~ ~ ~ fill ~ ~-8 ~ ~ ~-5 ~ air\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bEarth Pillar\"}]}\nscoreboard players add @s sub_level 1\nplaysound dig.grass"
}