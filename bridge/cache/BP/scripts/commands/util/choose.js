{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\scripts\\commands\\util\\choose.js",
	"file_type": "script",
	"format_version": 0,
	"file_uuid": "e8e28ff1_8ae1_4f12_8e57_aa804d548cfd",
	"file_version": 11,
	"cache_content": "import * as Minecraft from \"mojang-minecraft\";\r\n\r\nconst World = Minecraft.World;\r\nconst Commands = Minecraft.Commands;\r\n\r\nconst command = {\r\n    name: 'choose',\r\n    description: 'quickly bring up the choose menu', \r\n    usage: '!choose',\r\n    category: 'util',\r\n    args: [],\r\n    execute(chat, args) {\r\n        player.runCommand(`/execute \"${chat.sender.name}\" ~ ~ ~ function choose`)\r\n        player.runCommand(`/tellraw \"${chat.sender.name}\" {\"rawtext\":[{\"text\":\"§bChoosing!\"}]}`)\r\n    }\r\n}\r\n\r\nexport default command"
}