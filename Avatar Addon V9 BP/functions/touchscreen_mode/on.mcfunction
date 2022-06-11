give @s a:slot_1
give @s a:slot_2
give @s a:slot_3
give @s a:slot_4
give @s[scores={level=20..}] a:slot_5
give @s[scores={level=30..}] a:slot_6
tag @s add mmode
particle a:air_puff ~~~
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}
tellraw @s {"rawtext":[{"text":"§l§bMobile Mode:"}]}
tellraw @s {"rawtext":[{"text":"§rInstead of doing the action for each slot, just click the item! Disables the movement options, turn them back on by running /function touchscreen_mode/off or !mobile"}]}
tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}