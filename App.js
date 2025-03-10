const { useState } = React;

// Standard deck of 52 cards
const suits = ["♥", "♦", "♣", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const generateDeck = () => {
    return suits.flatMap(suit => values.map(value => ({ suit, value })));
};

const Card = ({ suit, value, isSelected, onClick }) => {
    return (
        <div 
            className={`card ${isSelected ? "selected" : ""}`} 
            onClick={onClick}
        >
            {value} {suit}
        </div>
    );
};

const App = () => {
    const [deck, setDeck] = useState(generateDeck());
    const [selectedCards, setSelectedCards] = useState([]);
    const [pickedIndex, setPickedIndex] = useState(null);  // Track selected card

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
        setDeck(generateDeck());
        setSelectedCards([]);
        setPickedIndex(null);
    };

    const handleCardClick = (index) => {
        if (pickedIndex === null) {
            // If no card is picked, select this one
            setPickedIndex(index);
        } else if (pickedIndex === index) {
            // If the same card is clicked again, unselect it
            setPickedIndex(null);
        } else {
            // Swap cards
            let newSelectedCards = [...selectedCards];
            [newSelectedCards[pickedIndex], newSelectedCards[index]] = [newSelectedCards[index], newSelectedCards[pickedIndex]];
            
            setSelectedCards(newSelectedCards);
            setPickedIndex(null);  // Deselect after swap
        }
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
                    <Card 
                        key={index} 
                        suit={card.suit} 
                        value={card.value} 
                        isSelected={index === pickedIndex} 
                        onClick={() => handleCardClick(index)} 
                    />
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
