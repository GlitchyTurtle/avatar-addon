{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\scripts\\commands\\util\\togglebending.js",
	"file_type": "script",
	"format_version": 0,
	"file_uuid": "2af9b11e_aea2_434f_8293_f062a7d401ba",
	"file_version": 10,
	"cache_content": "import * as Minecraft from \"mojang-minecraft\";\r\n\r\nconst World = Minecraft.World;\r\nconst Commands = Minecraft.Commands;\r\n\r\nconst command = {\r\n    name: 'togglebending',\r\n    description: 'turns your bending on or off',\r\n    usage: '!togglebending',\r\n    category: 'util',\r\n    args: [],\r\n    execute(chat, args) {\r\n        player.runCommand(`/execute \"${chat.sender.name}\" ~ ~ ~ function toggle_bending`)\r\n    }\r\n}\r\n\r\nexport default command"
}