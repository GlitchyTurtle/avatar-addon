{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_shove.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "4abe6b75_ebcd_4eed_817e_b6070b56e00c",
	"file_version": 120,
	"cache_content": "HIDE \ntag @s add selfearth\nsetblock ~ ~ ~1 dirt\nsetblock ~ ~ ~-1 dirt\nsetblock ~1 ~ ~ dirt\nsetblock ~-1 ~ ~ dirt\nsetblock ~ ~ ~2 dirt\nsetblock ~ ~ ~-2 dirt\nsetblock ~2 ~ ~ dirt\nsetblock ~-2 ~ ~ dirt\nsetblock ~ ~ ~3 dirt\nsetblock ~ ~ ~-3 dirt\nsetblock ~3 ~ ~ dirt\nsetblock ~-3 ~ ~ dirt\nexecute @s[scores={level=0..5}] ~ ~ ~ damage @e[r=2] 4 none\nexecute @s[scores={level=6..10}] ~ ~ ~ damage @e[r=2] 6 none\nexecute @s[scores={level=11..99}] ~ ~ ~ damage @e[r=2] 10 none\nexecute @s[scores={level=100..}] ~ ~ ~ damage @e[r=2] 12 none\neffect @s resistance 1 255 true\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bEarth Shove\"}]}\nscoreboard players add @s sub_level 1\ntag @s remove selfearth\nplaysound dig.grass\nplaysound dig.gravel"
}