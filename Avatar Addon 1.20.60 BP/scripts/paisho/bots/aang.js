export const aang = {
    nameplate: "§lAang:§r",
    think_time: 20,
    getRandomLine(moveNumber, gameState = "ongoing") {
        const greeting_quotes = [
            "May the winds of fortune guide our Pai Sho match! Ready to play?",
            "Hope your day is as peaceful as a calm breeze. Ready to play Pai Sho?",
            "Air high-five! Time for a Pai Sho showdown, my friend!",
            "Yip yip! Time to ride the currents of Pai Sho skill!",
            "Hello, fellow Pai Sho aficionado! May the tiles be ever in your bending favor.",
            "Let's weave a tapestry of tiles as intricate as the Northern Water Tribe's ice sculptures.",
            "Let's play! I promise I won't airbend your tiles off the board this time!",
            "Namaste, my Pai Sho companion! Let's channel our inner Iroh for this game.",
            "Hello, friends! May our Pai Sho game be as balanced as the world when all nations are at peace."
        ];

        const random_quotes = [
            "Hey, let's keep it fun and light, just like airbending!",
            "I'm all about balance, in pai sho and in life.",
            "Air is all around us, just like the tiles on this pai sho board!",
            "I bet Appa would be a great pai sho player if he had opposable thumbs.",
            "Water flows, earth stands firm, fire burns, and pai sho tiles... well, they're just tiles.",
            "Did you know the Air Nomads had their own version of pai sho? It was called 'Sky Tiles.'",
            "I once played pai sho with Monk Gyatso for hours. He was a tricky opponent!",
            "Pai sho is like the four elements combined - a perfect harmony.",
            "If only I could airbend these tiles into the perfect formation!",
            "Katara's always telling me to focus, but pai sho is all about going with the flow!",
            "Sokka, you're great at strategy, but I bet you can't beat me in a game of pai sho!",
            "I wonder if I can use my Avatar State to win at pai sho. Just kidding!",
            "I feel a strong connection with these pai sho tiles, like they're part of the cosmic energy.",
            "I may be the Avatar, but even I need a break for some pai sho fun!",
            "Momo, you can't play pai sho. You'd eat all the tiles!",
            "Airbenders are light on their feet, just like a well-played pai sho move.",
            "Playing pai sho with Toph is like trying to airbend through a rock wall - challenging!",
            "I hope playing pai sho doesn't awaken the spirit of Koh. That would be a pai sho nightmare!",
            "Pai sho is like bending, but with tiles instead of elements. Still cool, though!",
            "I wish I could use my glider to zoom around the pai sho board. That'd be fun!",
            "I bet Roku was a pai sho master in his time. I should ask him about it next time we meet.",
            "I'll bet anyone a whole bag of airbender fruit pies that I can beat them at pai sho!",
            "Zuko, remember, pai sho is about finding your inner balance. Maybe it'll help you calm down.",
            "I wonder if I can incorporate airbending moves into my pai sho strategy...",
            "A game of pai sho is like a journey - you never know what's around the next turn!",
            "These pai sho tiles are like the nations - each one has its strengths and weaknesses.",
            "I bet I could use my glider to reach a whole new level of pai sho strategy!",
            "Let's keep the pai sho game friendly, just like the air temples.",
            "I feel the energy of the pai sho tiles - it's like the harmony of the elements.",
            "I once played pai sho with a spirit in the Spirit World. It was a wild game!",
            "Pai sho is about balance, like standing on the tip of an airbending staff.",
            "I've traveled the world, but the mysteries of pai sho still baffle me sometimes.",
            "Air Nomads had a saying: 'May your pai sho tiles always be in harmony.'",
            "Pai sho is like a dance - you have to move with the rhythm of the tiles.",
            "I wonder if I can use my airbending to predict your pai sho moves...",
            "I once played pai sho with a group of lemurs. They cheated, but it was still fun!",
            "I feel a strong breeze of victory coming my way in this pai sho game!",
            "Just like the Avatar Cycle, pai sho has its own cycle of strategies and moves.",
            "I should ask the Lion Turtle for some pai sho tips. They've been around for a long time!",
            "Pai sho is a lot like bending - you need to be flexible and adapt to your opponent.",
            "I bet playing pai sho with Uncle Iroh would be a tea-rrific experience!",
            "I'll use my airbending to blow away the competition in this pai sho game!",
            "Playing pai sho with the spirit of Yangchen watching over us - talk about pressure!",
            "I once played pai sho with a sky bison. Appa had a natural talent for it!",
            "I wish Gyatso were here. He always knew how to lighten the mood with pai sho.",
            "I can feel the energy of the elements flowing through these pai sho tiles.",
            "Pai sho is like meditation for the mind - a perfect way to find balance.",
            "I'm ready to bring my Aang-game to this pai sho match!",
            "Playing pai sho with Gyatso is like playing with a living airbending encyclopedia!",
            "I once played pai sho with the spirits in the Foggy Swamp. It was a bit murky, but fun!",
            "Pai sho is all about strategy, like planning an invasion - but way more peaceful.",
            "I wonder if I can use my airbending to give me an edge in this pai sho game...",
            "I'll bet I can use my avatar state to foresee your pai sho moves. Just kidding!",
            "Playing pai sho with Sokka is always entertaining - he comes up with the wildest strategies!",
            "I wonder if there's a secret pai sho move that only the Avatar knows. Time to find out!",
            "I once played pai sho with a dragon. It was a fiery match!",
            "Pai sho is like the elements - you have to master the basics before you can do anything fancy.",
            "I bet the swamp benders have their own unique style of pai sho. I should visit them sometime.",
            "I'll use my airbending to keep the pai sho tiles in perfect harmony!",
            "I once played pai sho with a group of Air Acolytes. They take their tiles seriously!",
            "Pai sho is like a journey - full of twists, turns, and unexpected surprises.",
            "Playing pai sho with Bumi is like playing with a master of unpredictability!",
            "I wonder if I can use my connection to the past Avatars to gain an advantage in pai sho...",
            "I'll bet the spirit of Wan Shi Tong has a library of pai sho strategies. Too bad it's off-limits!",
            "Pai sho is a lot like bending - you have to be in tune with the flow of the game.",
            "I once played pai sho with the moon spirit. It was a luminous experience!",
            "I bet playing pai sho with Kyoshi would be an earth-shattering experience!",
            "Pai sho is all about balance, like standing on a flying bison's saddle!",
            "I wonder if I can use my airbending to create a Pai Sho-nado. That would be something!",
            "I once played pai sho with a spirit in the Spirit World. It was a game of cosmic proportions!"
        ]

        const winning_quotes = [
            "Wow, that was a really bending-tastic game!",
            "I guess you could say I'm the Avatar of this game!",
            "Yip yip! Victory is just another element for me.",
            "I feel the energy flowing through me, just like when I bend!",
            "Everyone did their best, but I guess the Avatar spirit guided me to victory.",
            "This victory is like mastering all four elements - challenging, but worth it!",
            "The winds of fortune were definitely on my side this time!",
            "Looks like my bending skills extend to this game too!",
            "Victory dances are a lot like airbending, light on your feet and full of joy!",
            "I may not have mastered the game, but I've definitely mastered winning!"
        ]
        
        const losing_quotes = [
            "Well, I guess I'll have to work on my bending... and my pai sho skills!",
            "No worries, losing is just another step in the journey to improvement.",
            "I may have lost this game, but the real game is finding balance, right?",
            "I'll take this loss with the same calmness as a peaceful breeze.",
            "I guess I need more training in this game's bending techniques.",
            "Even the Avatar can't win every time. Time for some reflection and growth.",
            "Maybe losing this game is just the universe's way of teaching me humility.",
            "It's okay; losing is just another way of learning how to win next time.",
            "I may not have won, but I definitely had fun! That's what matters, right?",
            "Sometimes you lose, and sometimes you learn. Today, I did a bit of both."
        ]
        
        const draw_quotes = [
            "Looks like we're all in perfect balance. A tie it is!",
            "Well, that was a bending showdown, and it ended in a draw. Harmony in all things!",
            "A draw? I guess the elements are in perfect harmony today.",
            "Just like the balance of the four nations, this game ends in a draw!",
            "I guess we're all equally skilled pai sho'ers in this game!",
            "The game ends in a draw, just like the yin and yang of the world.",
            "No clear winner, but we all had a great time! That's what matters.",
            "A tie? That's like a gentle breeze - calm and balanced.",
            "This game reminds me that sometimes balance means no one comes out on top.",
            "A draw? I guess the universe couldn't decide who was the better pai sho'er."
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