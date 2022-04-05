{
	"file_path": "C:\\Users\\gross\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Avatar Addon 2!\\functions\\assets\\disable_and_enable_bending.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "d83c359e_cf4e_427b_8127_4d5520340b07",
	"file_version": 14,
	"cache_content": "HIDE \nplaysound random.levelup @s\ntag @s[tag=bending] add bendingtransfer\ntag @s[tag=!bending] remove nobending\ntag @s[tag=!bending] add bending\ntellraw @s[tag=bendingtransfer] {\"rawtext\":[{\"text\":\"§cYou no longer have your bending!§f\"}]}\ntellraw @s[tag=!bendingtransfer] {\"rawtext\":[{\"text\":\"§aYou have your bending now!§f\"}]}\ntag @s[tag=bending] remove antimagic\ntag @s[tag=bendingtransfer] remove bending\ntag @s[tag=bendingtransfer] add nobending\ntag @s[tag=bendingtransfer] remove bendingtransfer\ntag @s[tag=nobending] add antimagic"
}