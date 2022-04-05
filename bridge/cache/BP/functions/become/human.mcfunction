{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\become\\human.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "791fc74f_abc1_4b7f_8392_9131f17622bf",
	"file_version": 19,
	"cache_content": "HIDE \ntag @s remove avatar\ntag @s remove fire\ntag @s remove air\ntag @s remove water\ntag @s remove earth\ntag @s add human\nscoreboard players set @s moveslot1 0\nscoreboard players set @s moveslot2 0\nscoreboard players set @s moveslot3 0\nscoreboard players set @s moveslot4 0\nevent entity @s become_human\ntag @s remove choose\ntellraw @s {\"rawtext\":[{\"text\":\"-----------------------------------------§r\"}]}\ntellraw @s {\"rawtext\":[{\"text\":\"§l§bHuman§r\"}]}\ntellraw @s {\"rawtext\":[{\"text\":\"-----------------------------------------§r\"}]}\ntellraw @s {\"rawtext\":[{\"text\":\"§bChi Block §r- If you can land 6 consecutive hits on a player without being hit back, you can disable their chi - which means they can't bend anymore. The duration of this attack is dependent on your level, for instance level 10 can disable for 10 seconds.\"}]}\ntellraw @s {\"rawtext\":[{\"text\":\"-----------------------------------------§r\"}]}"
}