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
            setPickedIndex(index);  // Select card
        } else if (pickedIndex === index) {
            setPickedIndex(null);  // Unselect if clicked again
        } else {
            // Swap selected cards
            let newSelectedCards = [...selectedCards];
            [newSelectedCards[pickedIndex], newSelectedCards[index]] = [newSelectedCards[index], newSelectedCards[pickedIndex]];
            
            setSelectedCards(newSelectedCards);
            setPickedIndex(null);  // Deselect after swap
        }
    };

    const tossCard = () => {
        if (pickedIndex === null) return; // No card selected

        let newSelectedCards = [...selectedCards];
        newSelectedCards.splice(pickedIndex, 1); // Remove selected card

        setSelectedCards(newSelectedCards);
        setPickedIndex(null); // Clear selection
    };

    const regroupCards = () => {
        if (selectedCards.length < 2) return; // No need to shuffle if 1 or 0 cards

        let shuffledCards = [...selectedCards];

        // Fisher-Yates Shuffle Algorithm
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }

        setSelectedCards(shuffledCards);
    };
    const addWildcard = () => {
        // Generate a random suit and value
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        const randomValue = values[Math.floor(Math.random() * values.length)];
        const wildcardCard = { suit: randomSuit, value: randomValue };
    
        // Add the new card to selected cards
        setSelectedCards([...selectedCards, wildcardCard]);
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
                <button onClick={tossCard}>Toss</button>  
                <button onClick={regroupCards}>Regroup</button>
                <button onClick={addWildcard}>Wildcard</button>  
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
