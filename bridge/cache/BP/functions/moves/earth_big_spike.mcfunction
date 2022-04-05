{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_big_spike.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "cc9b63e9_49e8_4d33_98c9_be318f8985dc",
	"file_version": 64,
	"cache_content": "HIDE \nstructure load earth_1 ^ ^ ^5\nexecute @s[scores={level=0..5}] ^ ^ ^5 damage @e[r=2] 1 none\nexecute @s[scores={level=6..10}] ^ ^ ^5 damage @e[r=2] 2 none\nexecute @s[scores={level=11..99}] ^ ^ ^5 damage @e[r=2] 4 none\nexecute @s[scores={level=100..}] ^ ^ ^5 damage @e[r=2] 10 none\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bBig Spike\"}]}\nscoreboard players add @s sub_level 1\nplaysound dig.grass\nplaysound dig.gravel"
}