{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\fire_launch.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "71af2d10_9878_45ed_8eef_54f4cd79ad03",
	"file_version": 26,
	"cache_content": "HIDE \nsummon a:scooter\nexecute @s[tag=fire] ~ ~ ~ ride @s start_riding @e[r=3,type=a:scooter,c=1] teleport_ride\nexecute @s[tag=avatar] ~ ~ ~ ride @s start_riding @e[r=3,type=a:scooter,c=1] teleport_ride\nscoreboard players set @s cooldown 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFire Boosters\"}]}\nscoreboard players add @s sub_level 1\nexecute @a[tag=fire_launch] ~ ~ ~ particle minecraft:basic_flame_particle ~ ~ ~\nexecute @a[tag=fire_launch] ~ ~ ~ particle minecraft:mobflame_single ~ ~ ~\nexecute @a[tag=fire_launch] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~\nplaysound mob.ghast.fireball @s\nplaysound firework.launch @s"
}