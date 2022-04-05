{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\fire_launch.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "f9a56766_4a36_47bf_89d2_10b5c3db9836",
	"file_version": 25,
	"cache_content": "HIDE \nsummon a:scooter\nexecute @s[tag=fire] ~ ~ ~ ride @s start_riding @e[r=3,type=a:scooter,c=1] teleport_ride\nscoreboard players set @s cooldown 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFire Boosters\"}]}\nscoreboard players add @s sub_level 1\nexecute @a[tag=fire_launch] ~ ~ ~ particle minecraft:basic_flame_particle ~ ~ ~\nexecute @a[tag=fire_launch] ~ ~ ~ particle minecraft:mobflame_single ~ ~ ~\nexecute @a[tag=fire_launch] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~\nplaysound mob.ghast.fireball @s\nplaysound firework.launch @s"
}