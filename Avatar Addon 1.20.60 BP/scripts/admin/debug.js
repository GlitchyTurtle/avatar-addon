import { system } from "@minecraft/server";
import { getScore } from "./../util.js";

// Tags that need to be removed
const avatarTags = [
    "setup",
	"air",
	"earth",
	"fire",
	"water",
	"avatar",
	"avatar_state",
	"kb_up",
	"sub_projectile",
	"avatar_particles",
	"fast_cooldown",
	"super_fast_cooldown",
	"antimagic",
	"spirit",
	"chi_blocked",
	"permKbSafe",
	"double_jump",
    "alreadyChose"
];

// Scores that need to be reset
const avatarScores = [
	"level",
	"sub_level",
	"skill_points",
	"defTier",
	"offTier",
	"utiTier",
	"mobTier",
	"moveslot1",
	"moveslot2",
	"moveslot3",
	"moveslot4",
	"moveslot5",
	"moveslot6",
	"moveslot7",
	"moveslot8",
	"moveslot9",
]

function getCurrentTPS() {
    const start = Date.now();
    let tps = 0;
    return new Promise((resolve) => {
        const run = system.runInterval(() => {
            if (Date.now() - start < 1000) {
                tps += 1;
            } else {
                system.clearRun(run);
                resolve(tps);
            }
        });
    });
}

export async function debug(player) {

    const tagList = [];
    const scoreList = [];

	const tags = player.getTags();
	for (const tag of tags) {
		if (tag.startsWith('sub_') || tag.startsWith('Moveset:') || avatarTags.includes(tag)) {
			tagList.push(tag);
		}
	}
	for (const score of avatarScores) {
		scoreList.push(`${score}: ${getScore(score, player)}`);
	}

	const tps = await getCurrentTPS();
    player.sendMessage(`----------------\n§bPlayer:§r §h${player.nameTag}\n§bWorld:§r §h${getScore("settings", player)}\n§bTags:§r §h${tagList.join(', ')}\n§bScores:§r §h${scoreList.join(', ')}\n§bTicks/Second:§r §h${tps}\n§r----------------`);
}