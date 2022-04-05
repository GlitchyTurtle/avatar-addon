{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\chiblocking\\chiblocking_main.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "2fea1d44_a884_46ac_a2de_7a67c8ac04fe",
	"file_version": 38,
	"cache_content": "HIDE\r\nexecute @s[scores={combo=1..5}] ~~~ titleraw @s actionbar {\"rawtext\":[{\"text\":\"§3Hits needed to Block Chi: \"},{\"score\":{\"name\": \"@s\",\"objective\": \"combo\"}},{\"text\":\"/6\"}]}\r\n\r\nfunction chiblocking/chiblock\r\n\r\nexecute @a[tag=chi_blocked] ~~~ tag @s add antimagic\r\nexecute @s[scores={combo=6..}] ~~~ scoreboard players add @s sub_level 2\r\nexecute @s[scores={combo=6..}] ~~~ scoreboard players set @s combo 0\r\nexecute @a[tag=antimagic,tag=chi_blocked,scores={cooldown1=100}] ~~~ tag @s remove antimagic\r\nexecute @a[tag=chi_blocked,scores={cooldown1=100}] ~~~ tag @s remove chi_blocked"
}