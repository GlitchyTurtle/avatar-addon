HIDE
#Choose
execute @a[tag=choose,scores={aas=1,detect_left=1,detect_sneak=0}] ~ ~ ~ scoreboard players add @s choose 5
execute @a[tag=choose,scores={aas=1,detect_left=1}] ~ ~ ~ scoreboard players set @s detect_left 0
execute @a[tag=choose,scores={aas=1,choose=0..5}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6[Fire] §3[Earth] [Water] [Air] [Human]"}]}
execute @a[tag=choose,scores={aas=1,choose=6..10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] §6[Earth] §3[Water] [Air] [Human]"}]}
execute @a[tag=choose,scores={aas=1,choose=11..15}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] §6[Water] §3[Air] [Human]"}]}
execute @a[tag=choose,scores={aas=1,choose=16..20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] [Water] §6[Air] §3[Human]"}]}
execute @a[tag=choose,scores={aas=1,choose=21..25}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] [Water] [Air] §6[Human]"}]}
execute @a[tag=choose,scores={aas=1,choose=26..}] ~ ~ ~ scoreboard players set @s choose 5
execute @a[tag=choose,scores={aas=1,choose=0..5,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Fire"}]}
execute @a[tag=choose,scores={aas=1,choose=6..10,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Earth"}]}
execute @a[tag=choose,scores={aas=1,choose=11..15,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Water"}]}
execute @a[tag=choose,scores={aas=1,choose=16..20,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Air"}]}
execute @a[tag=choose,scores={aas=1,choose=21..25,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Human"}]}
execute @a[tag=choose,scores={aas=1,choose=0..5,detect_sneak=1}] ~ ~ ~ function become/fire
execute @a[tag=choose,scores={aas=1,choose=6..10,detect_sneak=1}] ~ ~ ~ function become/earth
execute @a[tag=choose,scores={aas=1,choose=11..15,detect_sneak=1}] ~ ~ ~ function become/water
execute @a[tag=choose,scores={aas=1,choose=16..20,detect_sneak=1}] ~ ~ ~ function become/air
execute @a[tag=choose,scores={aas=1,choose=21..25,detect_sneak=1}] ~ ~ ~ function become/human
 
#Choose (with avatar allowed)
execute @a[tag=choose,scores={aas=0,choose=!26,detect_left=1,detect_sneak=0}] ~ ~ ~ scoreboard players add @s choose 5
execute @a[tag=choose,scores={aas=0,choose=!26,detect_left=1}] ~ ~ ~ scoreboard players set @s detect_left 0
execute @a[tag=choose,scores={aas=0,choose=0..5}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6[Fire] §3[Earth] [Water] [Air] [Avatar] [Human]"}]}
execute @a[tag=choose,scores={aas=0,choose=6..10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] §6[Earth] §3[Water] [Air] [Avatar] [Human]"}]}
execute @a[tag=choose,scores={aas=0,choose=11..15}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] §6[Water] §3[Air] [Avatar] [Human]"}]}
execute @a[tag=choose,scores={aas=0,choose=16..20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] [Water] §6[Air] §3[Avatar] [Human]"}]}
execute @a[tag=choose,scores={aas=0,choose=21..25}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] [Water] [Air] §6[Avatar] §3[Human]"}]}
execute @a[tag=choose,scores={aas=0,choose=26..30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§3[Fire] [Earth] [Water] [Air] [Avatar] §6[Human]"}]}
execute @a[tag=choose,scores={aas=0,choose=31..}] ~ ~ ~ scoreboard players set @s choose 5
execute @a[tag=choose,scores={aas=0,choose=0..5,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Fire"}]}
execute @a[tag=choose,scores={aas=0,choose=6..10,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Earth"}]}
execute @a[tag=choose,scores={aas=0,choose=11..15,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Water"}]}
execute @a[tag=choose,scores={aas=0,choose=16..20,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Air"}]}
execute @a[tag=choose,scores={aas=0,choose=21..25,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Avatar"}]}
execute @a[tag=choose,scores={aas=0,choose=26..30,detect_sneak=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"text":"§6You picked Human"}]}
execute @a[tag=choose,scores={aas=0,choose=0..5,detect_sneak=1}] ~ ~ ~ function become/fire
execute @a[tag=choose,scores={aas=0,choose=6..10,detect_sneak=1}] ~ ~ ~ function become/earth
execute @a[tag=choose,scores={aas=0,choose=11..15,detect_sneak=1}] ~ ~ ~ function become/water
execute @a[tag=choose,scores={aas=0,choose=16..20,detect_sneak=1}] ~ ~ ~ function become/air
execute @a[tag=choose,scores={aas=0,choose=21..25,detect_sneak=1}] ~ ~ ~ function become/avatar
execute @a[tag=choose,scores={aas=0,choose=26..30,detect_sneak=1}] ~ ~ ~ function become/human
