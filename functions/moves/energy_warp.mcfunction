#bridge-file-version: #50
HIDE
tag @s add selfshove
scoreboard players set @s cooldown1 0
gamemode 6
effect @s invisibility 1 1 true
particle minecraft:redstone_ore_dust_particle^.7^1^     
particle minecraft:redstone_ore_dust_particle^-.7^1^
particle minecraft:redstone_ore_dust_particle^-.7^1.5^
particle minecraft:redstone_ore_dust_particle^.7^1.5^
scoreboard players set @s cooldown1 0
gamemode default
particle minecraft:redstone_ore_dust_particle^.7^1^     
particle minecraft:redstone_ore_dust_particle^-.7^1^
particle minecraft:redstone_ore_dust_particle^-.7^1.5^
particle minecraft:redstone_ore_dust_particle^.7^1.5^
playsound mob.enderman.teleport @a[r=2]
tag @s remove selfshove
