{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\moves\\fire_blast.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "02db6b47_818a_4ea8_85aa_aafb42d94792",
	"file_version": 33,
	"cache_content": "HIDE \nparticle minecraft:lava_drip_particle ^ ^1 ^0.5\nparticle minecraft:lava_drip_particle ^ ^1 ^1\nparticle minecraft:lava_drip_particle ^ ^1 ^1.5\nparticle minecraft:lava_drip_particle ^ ^1 ^2\nparticle minecraft:lava_drip_particle ^ ^1 ^2.5\nparticle minecraft:lava_drip_particle ^ ^1 ^3\nparticle minecraft:lava_drip_particle ^ ^1 ^3.5\nparticle minecraft:lava_drip_particle ^ ^1 ^4\nparticle minecraft:egg_destroy_emitter ^ ^1 ^4\nexecute @s[scores={level=0..5}] ^ ^ ^4 damage @e[r=2] 1 none\nexecute @s[scores={level=6..10}] ^ ^ ^4 damage @e[r=2] 2 none\nexecute @s[scores={level=11..99}] ^ ^ ^4 damage @e[r=2] 4 none\nexecute @s[scores={level=100..}] ^ ^ ^4 damage @e[r=2] 10 none\nscoreboard players set @s cooldown1 50\ntellraw @s[tag=!chatmsgoff] {\"rawtext\":[{\"text\":\"You used \"},{\"text\":\"§bFire Blast\"}]}\nscoreboard players add @s sub_level 1\nplaysound mob.ghast.fireball"
}