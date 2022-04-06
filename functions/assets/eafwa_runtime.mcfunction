#bridge-file-version: #2
HIDE 
#Actual Power Runtimes
execute @a[tag=air,tag=!antimagic] ~ ~ ~ function runtimes/air
execute @a[tag=earth,tag=!antimagic] ~ ~ ~ function runtimes/earth
execute @a[tag=water,tag=!antimagic] ~ ~ ~ function runtimes/water
execute @a[tag=fire,tag=!antimagic] ~ ~ ~ function runtimes/fire
execute @a[tag=avatar,tag=!antimagic] ~ ~ ~ function runtimes/avatar
execute @a[tag=chooseslot1,tag=!antimagic,tag=!avatar] ~ ~ ~ function assets/slot1choice
execute @a[tag=chooseslot2,tag=!antimagic,tag=!avatar] ~ ~ ~ function assets/slot2choice
execute @a[tag=chooseslot3,tag=!antimagic,tag=!avatar] ~ ~ ~ function assets/slot3choice
execute @a[tag=chooseslot4,tag=!antimagic,tag=!avatar] ~ ~ ~ function assets/slot4choice
execute @a[tag=chooseslot1,tag=!antimagic,tag=avatar] ~ ~ ~ function assets/avatar_choose1
execute @a[tag=chooseslot2,tag=!antimagic,tag=avatar] ~ ~ ~ function assets/avatar_choose2
execute @a[tag=chooseslot3,tag=!antimagic,tag=avatar] ~ ~ ~ function assets/avatar_choose3
execute @a[tag=chooseslot4,tag=!antimagic,tag=avatar] ~ ~ ~ function assets/avatar_choose4
execute @a[tag=!choose,tag=!air,tag=!earth,tag=!water,tag=!fire,tag=!avatar] ~ ~ ~ function chiblocking/chiblocking_main