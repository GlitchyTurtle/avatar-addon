{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\chiblocking\\chiblocking_main.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "596ecbb3_d9c4_4082_bd4c_75f1e23e6946",
	"file_version": 42,
	"cache_content": "HIDE \nexecute @s[scores={combo=1..5}] ~~~ titleraw @s actionbar {\"rawtext\":[{\"text\":\"§3Hits needed to Block Chi: \"},{\"score\":{\"name\": \"@s\",\"objective\": \"combo\"}},{\"text\":\"/6\"}]}\n \nfunction chiblocking/chiblock\n \nexecute @a[tag=chi_blocked] ~~~ tag @s add antimagic\nexecute @s[scores={combo=6..}] ~~~ scoreboard players add @s sub_level 2\nexecute @s[scores={combo=6..}] ~~~ scoreboard players set @s combo 0\nexecute @a[tag=antimagic,tag=chi_blocked,scores={cooldown1=100}] ~~~ tag @s remove antimagic\nexecute @a[tag=chi_blocked,scores={cooldown1=100}] ~~~ tag @s remove chi_blocked"
}