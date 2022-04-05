{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\assets\\toggle_movemessage.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "7941ea87_9732_44a7_a71a_d5bf1c7ed926",
	"file_version": 17,
	"cache_content": "HIDE \nplaysound random.levelup @s\ntag @s[tag=msgm] add msgtransfer\ntag @s[tag=!msgm] remove nomsg\ntag @s[tag=!msgm] add msgm\ntellraw @s[tag=msgtransfer] {\"rawtext\":[{\"text\":\"§cYou will no longer see move messages!§f\"}]}\ntellraw @s[tag=!msgtransfer] {\"rawtext\":[{\"text\":\"§aYou will now see move messages!§f\"}]}\ntag @s[tag=msgm] remove chatmsgoff\neffect @s[tag=msgtransfer] invisibility 0\neffect @s[tag=msgtransfer] night_vision 0\ntag @s[tag=msgtransfer] remove msgm\ntag @s[tag=msgtransfer] add nomsg\ntag @s[tag=msgtransfer] remove msgtransfer\ntag @s[tag=nomsg] add chatmsgoff"
}