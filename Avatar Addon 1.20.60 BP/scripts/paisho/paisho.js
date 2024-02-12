import { system, Player, ItemStack, MolangVariableMap } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { delayedFunc, toCamelCase } from "../util.js";

import { ChessFormData } from "../extensions/forms.js";
import { findBestMoveFromFen, fenAfterMove, getLegalMoves, getGameState } from "./paishoAi.js";

import { aang } from "./bots/aang.js";
import { iroh } from "./bots/iroh.js";

const START_FEN = "rb1qk1br/pnppppnp/8/8/8/8/PNPPPPNP/RB1QK1BR w KQkq - 0 1";
const MAP = {
    "p": "textures/ui/avatar/pai_sho/r/pawn",
    "n": "textures/ui/avatar/pai_sho/r/knight",
    "b": "textures/ui/avatar/pai_sho/r/bishop",
    "r": "textures/ui/avatar/pai_sho/r/rook",
    "k": "textures/ui/avatar/pai_sho/r/king",
    "q": "textures/ui/avatar/pai_sho/r/queen",
    "P": "textures/ui/avatar/pai_sho/w/pawn",
    "N": "textures/ui/avatar/pai_sho/w/knight",
    "B": "textures/ui/avatar/pai_sho/w/bishop",
    "R": "textures/ui/avatar/pai_sho/w/rook",
    "K": "textures/ui/avatar/pai_sho/w/king",
    "Q": "textures/ui/avatar/pai_sho/w/queen"
}

const aiLogic = {
    iroh: iroh,
    aang: aang,
}

export function paiShoMenu(player) {
	const paiShoMenu = new ActionFormData();
    paiShoMenu.title("Pai Sho: Main");
    paiShoMenu.body("Challenge another player to a game of pai sho, or challenge someone from team avatar to a fight!");
	//paiShoMenu.button("Send Challenge", "textures/ui/avatar/pai_sho/w/queen");


    paiShoMenu.button("Aang (beginner)", "textures/ui/avatar/pai_sho/w/pawn");
    //paiShoMenu.button("Zuko (intermediate)", "textures/ui/avatar/pai_sho/w/knight");
    //paiShoMenu.button("Katara (intermediate)", "textures/ui/avatar/pai_sho/w/bishop");
    paiShoMenu.button("Iroh (master)", "textures/ui/avatar/pai_sho/w/king");

    paiShoMenu.show(player).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
        if (selection === undefined) return player.sendMessage("§cYou exited the menu.");

        if (selection == 0) {
            playAi(player, "aang", START_FEN);
        } else if (selection == 1) {
            playAi(player, "iroh", START_FEN);
        }

        //playAi(player, "iroh", START_FEN);
        //playAi(player, "aang", START_FEN);

        //makeMoveUI(player, START_FEN)
    });
}

function pickPlayerToChallenge(player) {
	let playerNames = [];
	let players = [];
    for (let player of world.getPlayers()) {
        playerNames.push(player.name);
		players.push(player);
    }

	let playerSettingMenuLevel = new ModalFormData();
    playerSettingMenuLevel.title("Select player to challenge");
	playerSettingMenuLevel.dropdown("Player Name:", playerNames, 0);

	playerSettingMenuLevel.show(player).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return player.sendMessage("§cYou exited the menu, so your selection was not saved!");

		const [playerSelected] = formValues;
		const target = players[playerSelected];
		
        player.sendMessage(`${player.name} challenges ${target.name}`);

	})
}

function makeMoveUI(player, fen, test = false, selectedIndex = null) {
    let paishoGame;
    const tags = player.getTags();
	for (let i = 0; i < tags.length; i++) {
		if (tags[i].startsWith("PaiSho:")) {
			paishoGame = tags[i].replace("PaiSho:","");
			break;
		}
	}

    //PaiSho:rb1qk1br/pnppppnp/8/8/8/8/PNPPPPNP/RB1QK1BR w KQkq - 0 1.GlitchyTurtle32.Johndoe
    //        fen                                                           w           b

    player.sendMessage(paishoGame)

    const form = new ChessFormData()

    form.title('§rPai Sho')
    form.body(`§lOpponent:§r\n${"tst"}`)

    const filledIndexes = [];
    const fenParts = fen.split(" ");
    const piecePlacement = fenParts[0];
    let row = 0; // Start with the 8th rank (index 7) and move down to the 1st rank (index 0)
    let col = 0; // Start with the a-file (index 0) and move right to the h-file (index 7)

    for (let i = 0; i < piecePlacement.length; i++) {
        const c = piecePlacement[i];
        if (c == '/') {
            // Move to the next rank and reset the column counter
            row++;
            col = 0;
        } else if (!isNaN(c - parseFloat(c))) {
            // Empty squares, skip the specified number of squares
            const emptySquares = parseInt(c, 36)
            col += emptySquares;
        } else {
            //board[row * 8 + col] = MAP[c];
            
            form.button(MAP[c], row * 8 + col);
            filledIndexes.push(row * 8 + col)
            col++;
        }
    }

    let highlight = [];
    if (selectedIndex != null && !test) {
        highlight = getLegalMoves(fen, selectedIndex);
        for (let i = 0; i < highlight.length; i++) {
            if (filledIndexes.includes(highlight[i])) continue;
            form.button("textures/ui/avatar/pai_sho/highlight", highlight[i]);
        }
        test = true;
    }

    form.show(player).then(async response => {
        const { selection } = response;
        if (selection === undefined) return player.sendMessage("§cYou exited the menu.");

        if (highlight.length && selectedIndex != null && highlight.includes(selection)) {
            fen = fenAfterMove(fen, selectedIndex, selection);
            const gameState = getGameState(fen);
            player.sendMessage(gameState)
        } else {
            test = false;
        }

        makeMoveUI(player, fen, test, selection)
    });
}


function playAi(player, aiName, fen, moveNumber = 1, selectedIndex = null, test = false, playMoveNextTurn = false) {
    player.addTag("in_paisho_game");
    const form = new ChessFormData()
    const ai = aiLogic[aiName];

    form.title('§rPai Sho')
    form.body(`${ai.nameplate}\n${ai.getRandomLine(moveNumber, "ongoing")}`)

    const filledIndexes = [];
    const fenParts = fen.split(" ");
    const piecePlacement = fenParts[0];
    let row = 0; // Start with the 8th rank (index 7) and move down to the 1st rank (index 0)
    let col = 0; // Start with the a-file (index 0) and move right to the h-file (index 7)

    for (let i = 0; i < piecePlacement.length; i++) {
        const c = piecePlacement[i];
        if (c == '/') {
            // Move to the next rank and reset the column counter
            row++;
            col = 0;
        } else if (!isNaN(c - parseFloat(c))) {
            // Empty squares, skip the specified number of squares
            const emptySquares = parseInt(c, 36)
            col += emptySquares;
        } else {
            //board[row * 8 + col] = MAP[c];
            
            form.button(MAP[c], row * 8 + col);
            filledIndexes.push(row * 8 + col)
            col++;
        }
    }

    let highlight = [];
    if (selectedIndex != null && !test) {
        highlight = getLegalMoves(fen, selectedIndex);
        for (let i = 0; i < highlight.length; i++) {
            if (filledIndexes.includes(highlight[i])) continue;
            form.button("textures/ui/avatar/pai_sho/highlight", highlight[i]);
        }
        test = true;
    }

    form.show(player).then(async response => {
        const { selection } = response;
        if (selection === undefined) return player.removeTag("in_paisho_game");

        if (highlight.length && selectedIndex != null && highlight.includes(selection)) {
            fen = fenAfterMove(fen, selectedIndex, selection);

            const gameState = getGameState(fen);
            if (gameState != "ongoing") {
                return lastMoveAi(player, aiName, fen, gameState)
            }

            playMoveNextTurn = true;
        } else {
            test = false;
        }

        if (playMoveNextTurn) {
            fen = await findBestMoveFromFen(fen, ai.think_time);
            playMoveNextTurn = false;

            const gameState = getGameState(fen);
            if (gameState != "ongoing") {
                return lastMoveAi(player, aiName, fen, gameState)
            }
        }

        playAi(player, aiName, fen, (moveNumber + 1), selection, test, playMoveNextTurn);  
    });
}

function lastMoveAi(player, aiName, fen, state) {
    player.removeTag("in_paisho_game");
    const form = new ChessFormData()
    const ai = aiLogic[aiName];

    let displayState = "You Draw";
    if (state == "win") {
        displayState = "You Lose."
    } else if (state == "lose") {
        displayState = "You Win"
    }
    
    form.title(`§rPai Sho: ${displayState}`);
    form.body(`${ai.nameplate}\n${ai.getRandomLine(10, state)}`)

    const fenParts = fen.split(" ");
    const piecePlacement = fenParts[0];
    let row = 0; // Start with the 8th rank (index 7) and move down to the 1st rank (index 0)
    let col = 0; // Start with the a-file (index 0) and move right to the h-file (index 7)

    for (let i = 0; i < piecePlacement.length; i++) {
        const c = piecePlacement[i];
        if (c == '/') {
            // Move to the next rank and reset the column counter
            row++;
            col = 0;
        } else if (!isNaN(c - parseFloat(c))) {
            // Empty squares, skip the specified number of squares
            const emptySquares = parseInt(c, 36)
            col += emptySquares;
        } else {
            form.button(MAP[c], row * 8 + col);
            col++;
        }
    }

    form.show(player).then(async response => {});
}