import { ActionFormData } from "@minecraft/server-ui";
import { toRomanNumeral, getScore, getBendingStyle, setScore } from "./../util.js";
import { levelTrees } from "../passives/levelTrees.js";

export function textureLogic(tier) {
    return Math.max(tier <= 6 ? tier : tier >= 10 ? 10 : 6, 1);
}

export function checkForUnlocks(source, prefix, type, level) {
    // Select the specific bending and skill type
    const levelTree = levelTrees[prefix][type];
    if (!levelTree[level]) return source.sendMessage(`§7You have become more powerful...`);

    // Show upgrade message and run upgrade
    levelTree[level].execute(source);
    source.sendMessage(`----------------\n§rLvl ${level} unlocked: §b${levelTree[level].name}§r\n§r${levelTree[level].desc}\n----------------`);
}

export function skillTreeMenu(source) {
    const OFF_TIER = getScore("offTier", source);
    const DEF_TIER = getScore("defTier", source);
    const UTI_TIER = getScore("utiTier", source);
    const MOB_TIER = getScore("mobTier", source);

    if (OFF_TIER + DEF_TIER + UTI_TIER + MOB_TIER >= 40) return source.sendMessage("§7WOW. Good job, you have no more upgrades!");

    const scoreboards = ["offTier", "defTier", "utiTier", "mobTier"];

    let requiredSkillPoints = 0;
    scoreboards.forEach(branch => requiredSkillPoints += Math.floor(getScore(branch, source)));

	let skillTree = new ActionFormData();
    skillTree.title("Skill Tree");
    if (requiredSkillPoints === 0) {
        skillTree.body(`§8\n  §oTry it out for with no skill essence.   \n `);
    } else {
        skillTree.body(`§8\n                   §r §b${getScore("skill_points", source)}/${requiredSkillPoints}\n `);  
    }
	skillTree.button(`Offense | §l${toRomanNumeral(OFF_TIER)}`, `textures/ui/avatar/skill_tree/offence_${textureLogic(OFF_TIER)}`);
	skillTree.button(`Defence | §l${toRomanNumeral(DEF_TIER)}`, `textures/ui/avatar/skill_tree/defence_${textureLogic(DEF_TIER)}`);
    skillTree.button(`Utility | §l${toRomanNumeral(UTI_TIER)}`, `textures/ui/avatar/skill_tree/utility_${textureLogic(UTI_TIER)}`);
    skillTree.button(`Mobility | §l${toRomanNumeral(MOB_TIER)}`, `textures/ui/avatar/skill_tree/mobility_${textureLogic(MOB_TIER)}`);
    
    skillTree.show(source).then((ActionFormResponse) => {
        const { selection } = ActionFormResponse;

        if (selection == undefined) return source.sendMessage("§cYou didn't select anything.");
        const scoreBefore = getScore(scoreboards[selection], source);

        if (scoreBefore > 9) return source.sendMessage("§cYou can't upgrade that any more.");
        if (getScore("skill_points", source) < requiredSkillPoints) return source.sendMessage(`§cYou don't have enough skill points. You need at least ${requiredSkillPoints}.`);
        
        setScore(source, "skill_points", -requiredSkillPoints, true);
        setScore(source, scoreboards[selection], 1, true);
        checkForUnlocks(source, getBendingStyle(source).toLowerCase(), scoreboards[selection], scoreBefore + 1);
    });
}