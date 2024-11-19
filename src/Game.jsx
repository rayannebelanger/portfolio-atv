import React, { useState, useEffect } from "react";

function generateCode() {
  const digits = Array.from({ length: 10 }, (_, i) => i.toString());
  return Array.from({ length: 4 }, () => digits.splice(Math.floor(Math.random() * digits.length), 1)[0]).join("");
}

function evaluateGuess(code, guess) {
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === code[i]) {
      bulls++;
    } else if (code.includes(guess[i])) {
      cows++;
    }
  }

  return { bulls, cows };
}

const Game = () => {
  const [secretCode, setSecretCode] = useState(generateCode());
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [advice, setAdvice] = useState("");

  const fetchAdvice = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      setAdvice("Não foi possível carregar um conselho agora. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, [attempts]);

  const handleGuess = () => {
    if (gameOver) return;

    if (guess.length !== 4 || new Set(guess).size !== 4 || isNaN(guess)) {
      alert("Por favor, insira um palpite válido (4 dígitos únicos).");
      return;
    }

    const result = evaluateGuess(secretCode, guess);
    setAttempts([{ guess, result }, ...attempts]);

    if (result.bulls === 4) {
      setGameOver(true);
      alert("Parabéns, você descobriu o código secreto!");
    }

    setGuess("");
  };

  const restartGame = () => {
    setSecretCode(generateCode());
    setGuess("");
    setAttempts([]);
    setGameOver(false);
    fetchAdvice();
  };

  return (
    <div className="game">
      <h2>Jogo Senha</h2>
      <p>Adivinhe o código secreto de 4 dígitos. Cada dígito é único.</p>
      <div>
        <input
          type="text"
          maxLength="4"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Digite seu palpite"
          disabled={gameOver}
        />
        <button onClick={handleGuess} disabled={gameOver}>Enviar</button>
        <button onClick={() => alert(`Código secreto: ${secretCode}`)}>Revelar número</button>
        <button onClick={restartGame}>Reiniciar</button>
      </div>
      <div className="attempts">
        <h3>Tentativas Anteriores</h3>
        <ul>
          {attempts.map((attempt, index) => (
            <li key={index}>
              Palpite: {attempt.guess} - Bulls: {attempt.result.bulls}, Cows: {attempt.result.cows}
            </li>
          ))}
        </ul>
      </div>
      <div className="advice-section">
        <h3>Conselho do Dia (Utilizando API)</h3>
        <p>{advice}</p>
      </div>
    </div>
  );
};

export default Game;