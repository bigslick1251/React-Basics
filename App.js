const { useState } = React;

// Standard deck of 52 cards
const suits = ["♥", "♦", "♣", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

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
        if (deck.length === 0) {
            console.log("No cards left in the deck.");
            return;
        }
    
        const randomIndex = Math.floor(Math.random() * deck.length);
        const pickedCard = deck[randomIndex];
    
        console.log(`Drawing card: ${pickedCard.value} ${pickedCard.suit}`);
        console.log(`Remaining cards in deck: ${deck.length - 1}`);
    
        setDeck(deck.filter((_, index) => index !== randomIndex));
        setSelectedCards([...selectedCards, pickedCard]);
    };
    

    return (
        <div>
            <h1>React Card Game</h1>
            
            <div className="deck" onClick={handleDeckClick}>
                {deck.length > 0 ? "Deck" : "No cards remaining"}
            </div>

            <div className="card-container">
                {selectedCards.map((card, index) => (
                    <Card key={index} suit={card.suit} value={card.value} />
                ))}
            </div>
        </div>
    );
};

// Render React App
ReactDOM.render(<App />, document.getElementById("root"));
