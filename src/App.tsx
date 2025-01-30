import { useState } from 'react';
import './App.css';
import { Scanner } from "./parse";
import { le } from './code';

function App() {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [output, setOutput] = useState("出力：");
  const [outputError, setOutputError] = useState("");

  const compute = () => {
    setOutput("");
    setOutputError("");
    try {
      const x = inputA ? new Scanner(inputA).parse_term() : null;
      if (x === null) throw Error("Aの入力が必要です");
      const y = inputB ? new Scanner(inputB).parse_term() : null;
      if (y === null) throw Error("Bの入力が必要です");
      setOutput(`出力：${le(x, y)}`);
    } catch (error) {
      if (error instanceof Error) setOutputError(error.message);
      else setOutputError("不明なエラー");
      console.error("Error in compute:", error);
    }
  };

  return (
    <div className="app">
      <header>Signed Tree</header>
      <main>
        <p className="rdm">
          入力は、p(a), n(a)の形式で行ってください。
        </p>
        A:
        <input
          className="input is-primary"
          value={inputA}
          onChange={(e) => setInputA(e.target.value)}
          type="text"
          placeholder="入力A"
        />
        B:
        <input
          className="input is-primary"
          value={inputB}
          onChange={(e) => setInputB(e.target.value)}
          type="text"
          placeholder="入力B"
        />
        <div className="block">
          <button className="button is-primary" onClick={() => compute()}>
            A ≼ B
          </button>
        </div>
        <div className="box is-primary">
          {outputError !== "" ? (
            <div className="notification is-danger">{outputError}</div>
          ) : (
            <>{output}</>
          )}
        </div>
      </main>
      <footer>
        このページは<a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
      </footer>
    </div>
  );
}

export default App;