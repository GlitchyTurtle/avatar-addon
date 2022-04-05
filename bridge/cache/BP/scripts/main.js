{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\scripts\\main.js",
	"file_type": "script",
	"format_version": 0,
	"file_uuid": "802c3332_7c11_4727_b49a_050989fe4b10",
	"file_version": 20,
	"cache_content": "import * as Minecraft from \"mojang-minecraft\";\r\n\r\nconst World = Minecraft.World;\r\nconst Commands = Minecraft.Commands;\r\n\r\nimport commands from './commands/import.js';\r\n\r\nWorld.events.beforeChat.subscribe((chat) => {\r\n    if (chat.message.startsWith('!')) {\r\n        const args = chat.message.slice('!'.length).trim().split(/ +/g)\r\n        const cmd = args.shift().toLowerCase()\r\n        const command = commands[cmd]\r\n        chat.cancel = true\r\n        if (command) {\r\n            if (command.args.length > args.length) {\r\n                Commands.run(`/tellraw \"${chat.sender.name}\" {\"rawtext\":[{\"text\":\"§cImproper Usage: ${command.usage}\"}]}`, World.getDimension('overworld'))\r\n            } else {\r\n                command.execute(chat, args)\r\n            }\r\n        } else {\r\n            Commands.run(`/tellraw \"${chat.sender.name}\" {\"rawtext\":[{\"text\":\"§cThe command ${cmd} doesnt exist\"}]}`, World.getDimension('overworld'))\r\n        }\r\n    }\r\n})"
}