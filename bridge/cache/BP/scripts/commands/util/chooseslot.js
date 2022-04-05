{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\scripts\\commands\\util\\chooseslot.js",
	"file_type": "script",
	"format_version": 0,
	"file_uuid": "90801fd5_f116_4aa1_9924_2dd592c90d95",
	"file_version": 5,
	"cache_content": "import * as Minecraft from \"mojang-minecraft\";\r\n\r\nconst World = Minecraft.World;\r\nconst Commands = Minecraft.Commands;\r\n\r\nconst command = {\r\n    name: 'chooseslot',\r\n    description: 'quickly bring up the slot moves menu',\r\n    usage: '!chooseslot <1-4>',\r\n    category: 'util',\r\n    args: [\r\n        \"slot\"\r\n    ],\r\n    execute(chat, args) {\r\n        player.runCommand(`/execute \"${chat.sender.name}\" ~ ~ ~ function choose/slot_${args[0]}`)\r\n        player.runCommand(`/tellraw \"${chat.sender.name}\" {\"rawtext\":[{\"text\":\"§bChoosing Slot ${args[0]}!\"}]}`)\r\n    }\r\n}\r\n\r\nexport default command"
}