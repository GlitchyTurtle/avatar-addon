{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\assets\\avatar_choose1.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "b1498cce_5399_4238_8e0a_3e66b056ee8d",
	"file_version": 10,
	"cache_content": "HIDE \r\nexecute @s[tag=chooseslot1,scores={detect_left=1,detect_sneak=0}] ~ ~ ~ scoreboard players add @s chooseslot 1\r\nexecute @s[tag=chooseslot1,scores={detect_left=1}] ~ ~ ~ scoreboard players set @s detect_left 0\r\nexecute @s[tag=chooseslot1] ~ ~ ~ function assets/avatar_choose_menu\r\nexecute @s[tag=chooseslot1,scores={chooseslot=45..}] ~ ~ ~ scoreboard players set @s chooseslot 0\r\nexecute @s[scores={detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {\"rawtext\":[{\"text\":\"§3You chose the move for slot 1!\"}]}\r\nexecute @s[tag=chooseslot1,scores={chooseslot=0..45,detect_sneak=1}] ~ ~ ~ scoreboard players operation @s moveslot1 = @s chooseslot\r\nexecute @s[tag=chooseslot1,scores={chooseslot=0..45,detect_sneak=1}] ~ ~ ~ tag @s remove chooseslot1"
}