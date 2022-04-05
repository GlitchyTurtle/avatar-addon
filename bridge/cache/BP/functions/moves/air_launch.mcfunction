{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\air_launch.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "c2df4736_b1b3_4763_8898_d19a4c14f79d",
	"file_version": 17,
	"cache_content": "HIDE \nparticle minecraft:explosion_particle ~ ~ ~\nparticle minecraft:egg_destroy_emitter ~ ~ ~\neffect @s levitation 1 50 true\nscoreboard players set @s cooldown1 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bAir Launch\"}]}\nscoreboard players add @s sub_level 1\nplaysound firework.launch @s"
}