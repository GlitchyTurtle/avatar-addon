#bridge-file-version: #1
HIDE 
execute @s[scores={combo=6..,level=0..19}] ~~~ execute @p[rm=0.1,r=10,tag=human] ~~~ function chiblocking/chi_cooldown10
execute @s[scores={combo=6..,level=20..29}] ~~~ execute @p[rm=0.1,r=10,tag=human] ~~~ function chiblocking/chi_cooldown20
execute @s[scores={combo=6..,level=30..39}] ~~~ execute @p[rm=0.1,r=10,tag=human] ~~~ function chiblocking/chi_cooldown30
execute @s[scores={combo=6..,level=40..49}] ~~~ execute @p[rm=0.1,r=10,tag=human] ~~~ function chiblocking/chi_cooldown40
execute @s[scores={combo=6..,level=50..59}] ~~~ execute @p[rm=0.1,r=10,tag=human] ~~~ function chiblocking/chi_cooldown50
execute @s[scores={combo=6..,level=60..}] ~~~ execute @p[rm=0.1,r=10,tag=human] ~~~ function chiblocking/chi_cooldown60
execute @s[scores={combo=6..}] ~~~ execute @p[rm=0.1,r=10,tag=human] ~~~ particle minecraft:egg_destroy_emitter ~~~
 
execute @s[scores={combo=6..,level=0..19}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Blocked"},{"selector":"@p[rm=0.1,r=10,tag=human]"},{"text":"'s Chi for 10 seconds."}]}
execute @s[scores={combo=6..,level=20..29}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Blocked"},{"selector":"@p[rm=0.1,r=10,tag=human]"},{"text":"'s Chi for 20 seconds."}]}
execute @s[scores={combo=6..,level=30..39}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Blocked"},{"selector":"@p[rm=0.1,r=10,tag=human]"},{"text":"'s Chi for 30 seconds."}]}
execute @s[scores={combo=6..,level=40..49}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Blocked"},{"selector":"@p[rm=0.1,r=10,tag=human]"},{"text":"'s Chi for 40 seconds."}]}
execute @s[scores={combo=6..,level=50..59}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Blocked"},{"selector":"@p[rm=0.1,r=10,tag=human]"},{"text":"'s Chi for 50 seconds."}]}
execute @s[scores={combo=6..,level=60..}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Blocked"},{"selector":"@p[rm=0.1,r=10,tag=human]"},{"text":"'s Chi for 60 seconds."}]}