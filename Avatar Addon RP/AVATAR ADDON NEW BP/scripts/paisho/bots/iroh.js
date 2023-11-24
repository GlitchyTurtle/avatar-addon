export const iroh = {
    nameplate: "§lIroh:§r",
    think_time: 500,
    getRandomLine(moveNumber, gameState = "ongoing") {
        const greeting_quotes = [
            "It's a joy to share a Pai Sho board with you. Let the game begin!",
            "The tiles are set, and the game is afoot.",
            "Greetings, my friend, and may the spirits of strategy guide our every move on this sacred board.",
            "Ah, a delightful moment to engage in the dance of Pai Sho.",
            "Greetings, young friend! The board awaits our moves, like the unfolding petals of a blooming lotus.",
            "Greetings, my esteemed opponent! May our tiles dance harmoniously in the winds of fate.",
            "Ah, the joy of a new Pai Sho game! May the spirits smile upon our moves and grant us wisdom.",
            "Welcome, my friend! Let the ancient game of Pai Sho unfold like a tapestry of destiny before us.",
            "In the spirit of balance, I bid you good fortune on this Pai Sho journey. Let the elements guide us.",
            "Ah, the delightful prospect of a new game! May our tiles weave a story as intricate as the tapestries of Ba Sing Se.",
            "Ah, the sweet melody of Pai Sho commences. May our moves be as harmonious as a well-brewed tea.",
            "Hello, my esteemed opponent! Let the winds of strategy blow through the tiles as we commence our duel.",
            "Welcome to the Pai Sho table, my friend. May our moves be as unpredictable as the flames of a dragon.",
            "May our moves be as fluid as a waterfall, yet as grounded as the earth beneath our feet."
        ];

        const random_quotes = [
            "Ah, the delicate dance of the lotus tiles. Much like the dance of life, don't you think?",
            "In this game, as in life, one must always strive for balance.",
            "The lotus tile is like a good cup of tea - both require patience and finesse.",
            "Ah, the White Lotus. A symbol of unity and wisdom, much like this game.",
            "I find that pai sho is an excellent way to clear the mind and focus the spirit.",
            "The Fire Nation may be known for aggression, but a good pai sho player knows the power of subtlety.",
            "Sometimes, the key to victory is knowing when to sacrifice a piece for the greater strategy.",
            "One must approach the game with the serenity of a flowing stream, adapting to the twists and turns.",
            "The jasmine dragon tile - a symbol of good fortune and unexpected turns of fate.",
            "A game of pai sho is like a journey, and each move is a step toward enlightenment.",
            "Just as a wise man learns more from his enemies than his friends, a skilled pai sho player learns from every move.",
            "The beauty of the white jade is matched only by the elegance of a well-played opening gambit.",
            "In the tapestry of pai sho, each move is a thread carefully woven into the fabric of destiny.",
            "The dragon of the east brings luck, but beware the serpent of the west - a reminder of challenges ahead.",
            "A good pai sho player can read the board like a map and navigate the currents of fate.",
            "Much like bending, pai sho requires understanding the flow of energy and redirecting it to your advantage.",
            "The lotus gambit - a strategy of patience and precision, much like the brewing of a perfect pot of tea.",
            "Do not rush the game; let it unfold like the petals of a lotus flower in the morning sun.",
            "A cup of tea and a game of pai sho - the simple pleasures that make life truly rich.",
            "In pai sho, as in war, one must be prepared to make sacrifices for the greater good.",
            "The white lotus tile is a reminder that even in the darkest times, there is always hope.",
            "Just as a bonsai requires careful pruning, so does a successful pai sho strategy.",
            "The wise player sees not just the tiles on the board but the spaces between them - the potential for movement.",
            "In pai sho, as in life, the key to success is adaptation. Be like the reed that bends but does not break.",
            "Ah, the mysteries of the universe are reflected in the patterns of the pai sho board.",
            "The ivory bison - a symbol of strength and resilience, much like the player who wields it.",
            "The key to victory is not always in the grand gestures but in the small, calculated moves.",
            "A true master of pai sho knows that sometimes the best move is the one left unplayed.",
            "The art of redirection, my friend, is not just for firebenders but for pai sho players as well.",
            "Much like the four elements, the tiles on this board must find harmony to create a masterpiece.",
            "The lotus gambit - a dance of tiles that requires grace and foresight.",
            "The calligraphy of a well-played pai sho game is as beautiful as the strokes of a skilled artist.",
            "The phoenix rises from the ashes, and a skilled pai sho player rises from setbacks with grace and determination.",
            "The game of pai sho is like a puzzle, and each move is a piece that fits into the grand design.",
            "In the dance of tiles, as in the dance of life, one must be prepared for unexpected turns and sudden pivots.",
            "The beauty of pai sho lies not just in the victory but in the journey of the game itself.",
            "The lotus gambit - a dance of strategy and elegance that unfolds with every move.",
            "In pai sho, as in nature, one must be attuned to the changing seasons and adapt accordingly.",
            "The secret to a good game of pai sho is to embrace the ebb and flow of the tiles like the tide.",
            "The tea may cool, but the thrill of a well-played pai sho game lingers in the memory.",
            "Like the lotus flower, the skilled pai sho player must rise above the mud to bloom in the sunlight.",
            "The board is a canvas, and each move is a brushstroke in the masterpiece of pai sho.",
            "The ivory bison may seem docile, but in the right hands, it becomes a formidable force on the board.",
            "In the game of pai sho, as in the game of life, sometimes you must let go of what you love to move forward.",
            "Much like the tea leaves in a pot, the tiles on the board reveal the story of the game.",
            "In pai sho, as in destiny, one must be patient and let the pieces fall into place.",
            "The lotus gambit - a dance of tiles that requires both precision and intuition.",
            "The ivory bison charges forward, and so too must the skilled pai sho player pursue victory.",
            "In the silence between moves, one can hear the whispers of destiny guiding the game.",
            "The dragon of the east guards its treasures, and so must the pai sho player protect their strategic advantages.",
            "A game of pai sho is like a cup of tea - best enjoyed with good company and thoughtful conversation.",
            "The ivory bison - a symbol of strength that must be wielded with care and strategic foresight.",
            "The tiles on the board are like the stars in the night sky - each one a point of light.",
            "The lotus gambit - a dance of strategy and intuition that unfolds with each carefully chosen move.",
            "In pai sho, as in life, one must learn to appreciate the beauty of simplicity.",
            "The lotus tile blooms in adversity, and so too does the skilled pai sho player thrive in challenging situations.",
            "The tea may be bitter, but the taste of victory in pai sho is sweet indeed.",
            "The white lotus tile - a reminder that even in the chaos of the board, there is order and purpose.",
            "The key to a successful pai sho game is to stay calm and focused, like a serene pond reflecting the moonlight.",
            "The phoenix tile - a symbol of rebirth and renewal, much like the second chances granted in a pai sho game.",
            "The dance of tiles is like a symphony, and the skilled pai sho player is the conductor orchestrating the moves.",
            "In pai sho, as in the art of war, one must know when to advance and when to retreat.",
            "The lotus gambit - a dance of tiles that requires both skill and intuition to master.",
            "The tiles on the board are like the seasons - constantly changing, yet part of a greater cycle.",
            "The beauty of pai sho lies not just in the victory but in the harmony of the tiles on the board.",
            "The jasmine dragon tile - a symbol of good fortune and unexpected twists in the game of pai sho.",            
        ]

        const winning_quotes = [
            "Ah, victory is a cup of jasmine tea, sweet and satisfying.",
            "In the game of Pai Sho, as in life, one must know when to strike and when to wait patiently.",
            "The flames of success burn bright, my friend. Let them warm your spirit.",
            "Destiny has smiled upon me today, much like the rising sun over the Fire Nation.",
            "The key to triumph is often found in the harmony of one's moves, like a well-played melody.",
            "Ah, the taste of victory - a flavor as rich as roasted barley tea on a cool evening.",
            "The lotus tile of victory has blossomed in my favor. Delightful.",
            "As the dragon of fortune soars, so does my success in this game.",
            "In the tapestry of life, this victory is but a beautifully woven thread.",
            "Well played, my friend. A game won is a lesson learned, and the journey continues.",
            "A strategist is like a skilled tea master, blending flavors to achieve the perfect outcome.",
            "The winds of fortune have filled my sails, and I have sailed to victory.",
            "One must always savor the taste of success, like a fine cup of ginseng tea.",
            "Fortune favors not only the bold but those who understand the ebb and flow of the game.",
            "The flames of my skill burn brightly, much like the eternal flame at the Sun Warrior's temple.",
            "A wise general wins without bloodshed; a wise Pai Sho player wins without a single tile broken.",
            "The leaves have settled, and the outcome is clear. Victory is mine, my friend.",
            "Much like a well-brewed tea, this victory was worth the patience and precision it required.",
            "In the dance of strategy, I have led, and victory has followed.",
        ]

        const losing_quotes = [
            "Ah, defeat is a bitter cup, but even bitter tea has its own lessons to teach.",
            "In the tapestry of setbacks, this loss is but a thread, a reminder of the dance that continues.",
            "The winds of fortune have shifted, and I find myself on the other side of the board.",
            "Much like the fading embers, my chances have dwindled. A lesson learned, indeed.",
            "The lotus tile of victory eludes me this time. Such is the nature of Pai Sho and life.",
            "A loss is like a poorly brewed tea - disappointing but a chance to refine one's skills.",
            "The dragon of fortune did not favor me today, but tomorrow is a new sunrise.",
            "The leaves have scattered in the wind, and my strategy unraveled. A setback, not defeat.",
            "In the game of Pai Sho, as in life, one must gracefully accept defeat and learn from it.",
            "A wise Pai Sho player knows that even the greatest masters taste the bitterness of defeat.",
            "The dance of strategy is unpredictable, and today, the rhythm was not in my favor.",
            "The flame of my skill flickers low today, but tomorrow it may burn brighter than ever.",
            "Ah, a loss - a humbling experience that teaches us the impermanence of victory.",
            "Like a tea leaf carried away by the wind, my chances slipped through my fingers.",
            "The river of strategy flows in unexpected directions. Today, it led me to defeat.",
            "In the mosaic of victories and defeats, this loss is but a small, necessary piece.",
            "The path to mastery is paved with setbacks. Today, I've added another stone to that path.",
            "The taste of defeat is a bitter herb, but it is in bitterness that we find the seeds of growth.",
            "A loss is a call to reflection, a chance to understand the balance of the game and oneself.",
            "The sun sets on this game, but the dawn of new opportunities awaits.",
        ]
        
        const draw_quotes = [
            "Ah, a draw - the dance of balance continues, neither winning nor losing.",
            "In the world of Pai Sho, a draw is a poetic reminder of the delicate equilibrium we seek.",
            "Like the yin and yang, this game finds harmony in the balance of our moves.",
            "A stalemate, a delicate pause in the melody of our Pai Sho symphony.",
            "The lotus tile remains unclaimed, and the game ends in a graceful tie.",
            "In the tapestry of this game, we've woven a pattern of balance and mutual respect.",
            "A draw, my friend, is a shared cup of tea where both flavors find harmony.",
            "In the dance of strategy, we've matched each other step for step, creating a beautiful tableau.",
            "The dragon of fortune hesitates, unsure of where to breathe its fire - a draw is the result.",
            "A tie is like a moment frozen in time, where victory and defeat stand hand in hand.",
            "The leaves settle, neither blown by victory nor defeat but caught in the stillness of a draw.",
            "The winds of fate have blown us to a draw, a moment of reflection before the next move.",
            "Ah, a draw - a reminder that even in competition, there is room for balance and camaraderie.",
            "The tapestry of this game is woven with threads of equal strength, resulting in a draw.",
            "A draw, my friend, is a conversation in moves, a dialogue where neither prevails.",
            "Much like the calming center of a storm, a draw is a moment of peace amid the chaos of competition.",
            "The lotus tile rests untouched, and the game concludes in a tie, a testament to our skill.",
            "In the dance of Pai Sho, we've twirled and spun, creating a pattern of balance and mutual respect.",
            "The river of strategy meanders, and in this game, it has led us to a tranquil pool of equilibrium.",
            "A draw, like the breath between sips of tea, is a moment of shared stillness in the game.",
        ]            

        if (moveNumber == 1 && gameState == "ongoing") {
            const index = Math.floor(Math.random() * greeting_quotes.length);
            return greeting_quotes[index];
        } else if (gameState == "ongoing") {
            const index = Math.floor(Math.random() * random_quotes.length);
            return random_quotes[index];
        } else if (gameState == "win") {
            const index = Math.floor(Math.random() * winning_quotes.length);
            return winning_quotes[index];
        } else if (gameState == "loss") {
            const index = Math.floor(Math.random() * losing_quotes.length);
            return losing_quotes[index];
        } else if (gameState == "draw") {
            const index = Math.floor(Math.random() * draw_quotes.length);
            return draw_quotes[index];
        }
    }
}