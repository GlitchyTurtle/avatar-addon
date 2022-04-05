{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\scripts\\commands\\util\\togglemovemessages.js",
	"file_type": "script",
	"format_version": 0,
	"file_uuid": "d78ae9ba_fee6_43b8_89a0_d2487b0a94c8",
	"file_version": 10,
	"cache_content": "import * as Minecraft from \"mojang-minecraft\";\r\n\r\nconst World = Minecraft.World;\r\nconst Commands = Minecraft.Commands;\r\n\r\nconst command = {\r\n    name: 'togglemovemessages',\r\n    description: 'turns your move messages on or off',\r\n    usage: '!togglemovemessages',\r\n    category: 'util',\r\n    args: [],\r\n    execute(chat, args) {\r\n        player.runCommand(`/execute \"${chat.sender.name}\" ~ ~ ~ function toggle_movemessages`)\r\n    }\r\n}\r\n\r\nexport default command"
}