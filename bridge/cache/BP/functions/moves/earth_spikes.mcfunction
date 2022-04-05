{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\earth_spikes.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "a64836f0_5e75_45b1_8079_7924838b3c8e",
	"file_version": 10,
	"cache_content": "HIDE \nsummon armor_stand ^ ^ ^2 k earthspikes\nexecute @e[name=earthspikes,type=armor_stand] ~ ~ ~ execute @s ~ ~ ~ tp @s ~ ~ ~ facing @p[tag=earth]\nexecute @e[name=earthspikes,type=armor_stand] ~ ~ ~ effect @s invisibility 1 1 true\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bEarth Spikes\"}]}\nscoreboard players add @s sub_level 1\nplaysound dig.grass\nplaysound dig.gravel"
}