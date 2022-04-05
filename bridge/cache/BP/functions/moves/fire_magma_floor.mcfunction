{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\fire_magma_floor.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "b130e054_92e6_4f15_83c6_f81235865055",
	"file_version": 23,
	"cache_content": "HIDE \neffect @s resistance 3 255 true\nparticle minecraft:mobflame_single ~ ~ ~\nparticle minecraft:egg_destroy_emitter ~ ~ ~\nscoreboard players set @s cooldown 0\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFire Shield\"}]}\nscoreboard players add @s sub_level 1"
}