import { ActionFormData } from "@minecraft/server-ui";

// YOOOOOO these guys are the best
const patreonRank = {
	"Creature5870": 2,
    "Bushy963": 2,
    "Chakurow": 2,
    "DracoRex1912": 2,
    "Blockmaster4744": 2,
    "PixelatedJon": 2,
    "FrostySh4dow": 2,
    "NatureCaller774": 2,
    "Cageypeak2174": 2,
    "Kidajgaming": 2,
    "zmija33": 2,
    "DBFBGamerEX": 2,
    "hammerofreage": 2,
    "hammerofrage": 2,
    "thee_court_jester": 2,
    "Cageypeak2174": 2,
    "Soma4811": 2,
    "Kobethatboy": 2,

    "Tfue Ruler": 3,
    "MisterAtari2600": 3,
    "SansyTD": 3,
    "D3athB0t35": 3,
    "GlitchyTurtle32": 3
};


export function patreonMenu(source) {
	const capeMenu = new ActionFormData()
	    .title("Choose a cape!")
	    .body("§7Thank you; your generosity fuels my passion, and I'm honestly grateful for each one of you. Together, we're creating something special. This isn't a perfect way to give back, but the capes are pretty sick!\n ")
        .button("Unequip Cape")
	    .button("Iron Cape", "textures/ui/avatar/capes/iron");

    if (patreonRank[source.name] > 1) capeMenu.button("Gold Cape", "textures/ui/avatar/capes/gold");
    if (patreonRank[source.name] > 2) capeMenu.button("Emerald Cape", "textures/ui/avatar/capes/emerald");

    const selectionList = ["Unequip", "Iron Cape", "Gold Cape", "Emerald Cape"]

    capeMenu.show(source).then((ActionFormResponse) => {
        const { selection } = ActionFormResponse;
        switch(selectionList[selection]) {
            case "Unequip":
                source.triggerEvent("a:remove_all_capes")
                break;
            case "Iron Cape":
                source.triggerEvent("a:equip_iron_patron_cape")
                break;
            case "Gold Cape":
                source.triggerEvent("a:equip_gold_patron_cape")
                break;
            case "Emerald Cape":
                source.triggerEvent("a:equip_emerald_patron_cape")
                break;
        }
    })
}