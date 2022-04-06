{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\assets\\cooldown.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "96d74c7e_d3a1_488e_a68d_b27c338aa591",
	"file_version": 0,
	"cache_content": "HIDE\r\n#Cooldowns & Charges\r\nexecute @a[scores={cooldown1=!100}] ~ ~ ~ scoreboard players add @s cooldown1 1\r\nexecute @a[tag=!chi_blocked,tag=cooldown1,scores={cooldown1=100}] ~ ~ ~ titleraw @s actionbar {\"rawtext\":[{\"text\":\"§3Move Cooldown \"},{\"score\":{\"name\": \"@s\",\"objective\": \"cooldown1\"}},{\"text\":\"%\"}]}\r\nexecute @a[scores={cooldown1=100}] ~ ~ ~ tag @s remove cooldown1\r\nexecute @a[scores={cooldown1=!100}] ~ ~ ~ tag @s add cooldown1\r\nexecute @a[tag=!chi_blocked,tag=cooldown1] ~~~ titleraw @s actionbar {\"rawtext\":[{\"text\":\"§3Move Cooldown \"},{\"score\":{\"name\": \"@s\",\"objective\": \"cooldown1\"}},{\"text\":\"%\"}]}\r\nexecute @a[tag=chi_blocked,tag=cooldown1,tag=!avatar_state] ~~~ titleraw @s actionbar {\"rawtext\":[{\"text\":\"§3You have been chi blocked. You will get your bending back in a minute.\"}]}\r\nexecute @a[tag=chi_blocked,tag=cooldown1,tag=!avatar_state] ~~~ effect @s slowness 1 1 true"
}