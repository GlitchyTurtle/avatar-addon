HIDE
#Bending Scroll
tellraw @s[hasitem={item=a:bending_scroll,quantity=2..}] {"rawtext":[{"text":"§cYou don't need more than one scroll."}]}
clear @s[hasitem={item=a:bending_scroll,quantity=2..}] a:bending_scroll -1 1
#Slot Choice
tellraw @s[hasitem={item=a:slot_1,quantity=2..}] {"rawtext":[{"text":"§cYou don't need more than one slot 1 item."}]}
tellraw @s[hasitem={item=a:slot_2,quantity=2..}] {"rawtext":[{"text":"§cYou don't need more than one slot 2 item."}]}
tellraw @s[hasitem={item=a:slot_3,quantity=2..}] {"rawtext":[{"text":"§cYou don't need more than one slot 3 item."}]}
tellraw @s[hasitem={item=a:slot_4,quantity=2..}] {"rawtext":[{"text":"§cYou don't need more than one slot 4 item."}]}
tellraw @s[hasitem={item=a:slot_6,quantity=2..}] {"rawtext":[{"text":"§cYou don't need more than one slot 5 item."}]}
tellraw @s[hasitem={item=a:slot_6,quantity=2..}] {"rawtext":[{"text":"§cYou don't need more than one slot 6 item."}]}
clear @s[hasitem={item=a:slot_1,quantity=2..}] a:slot_1 -1 1
clear @s[hasitem={item=a:slot_2,quantity=2..}] a:slot_2 -1 1
clear @s[hasitem={item=a:slot_3,quantity=2..}] a:slot_3 -1 1
clear @s[hasitem={item=a:slot_4,quantity=2..}] a:slot_4 -1 1
clear @s[hasitem={item=a:slot_5,quantity=2..}] a:slot_3 -1 1
clear @s[hasitem={item=a:slot_6,quantity=2..}] a:slot_4 -1 1

