function App() {
    return (
        <div>
            <h1>Card Game</h1>
            <Deck />
        </div>
    );
}

function Deck() {
    const handleClick = () => {
        console.log("Deck clicked! (Will deal a card in future steps)");
    };
    
    return (
        <div className="deck" onClick={handleClick}>Deck of Cards</div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
