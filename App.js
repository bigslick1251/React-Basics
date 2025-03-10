const { useState } = React;

// Standard deck of 52 cards
const suits = ["♥", "♦", "♣", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Function to generate a full deck
const generateDeck = () => {
    return suits.flatMap(suit => values.map(value => ({ suit, value })));
};

const Card = ({ suit, value }) => {
    return (
        <div className="card">
            {value} {suit}
        </div>
    );
};

const App = () => {
    const [deck, setDeck] = useState(generateDeck());
    const [selectedCards, setSelectedCards] = useState([]);

    const handleDeckClick = () => {
        if (deck.length === 0) return;

        const randomIndex = Math.floor(Math.random() * deck.length);
        const pickedCard = deck[randomIndex];

        setDeck(deck.filter((_, index) => index !== randomIndex));
        setSelectedCards([...selectedCards, pickedCard]);
    };

    const dealCards = (num) => {
        if (deck.length < num) return;

        let newDeck = [...deck];
        let newCards = [];

        for (let i = 0; i < num; i++) {
            const randomIndex = Math.floor(Math.random() * newDeck.length);
            newCards.push(newDeck[randomIndex]);
            newDeck = newDeck.filter((_, index) => index !== randomIndex);
        }

        setDeck(newDeck);
        setSelectedCards(newCards);
    };

    const resetGame = () => {
        setDeck(generateDeck()); // Restore full deck
        setSelectedCards([]); // Clear selected cards
    };

    return (
        <div>
            <h1>React Card Game</h1>

            <div className="deck" onClick={handleDeckClick}>
                {deck.length > 0 ? "Deck" : "No cards remaining"}
            </div>

            <div className="buttons">
                <button onClick={() => dealCards(5)}>Deal 5</button>
                <button onClick={() => dealCards(7)}>Deal 7</button>
                <button onClick={resetGame}>Reset</button>  
            </div>

            <div className="card-container">
                {selectedCards.map((card, index) => (
                    <Card key={index} suit={card.suit} value={card.value} />
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
