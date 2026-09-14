"use client";

import { useState } from "react";
import Dado from "./Dado";
import styles from "./JogoDados.module.css";

const TOTAL_RODADAS = 5;

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [vez, setVez] = useState(1); // 1 = jogador 1, 2 = jogador 2, 0 = ninguém (pausa)
  const [dadosJogador1, setDadosJogador1] = useState([null, null]);
  const [dadosJogador2, setDadosJogador2] = useState([null, null]);
  const [resultadoRodada, setResultadoRodada] = useState("");
  const [placar, setPlacar] = useState({ jogador1: 0, jogador2: 0, empates: 0 });
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState("");

  function jogarJogador1() {
    const d1 = rolarDado();
    const d2 = rolarDado();
    setDadosJogador1([d1, d2]);
    setResultadoRodada("");
    setVez(2);
  }

  function jogarJogador2() {
    const d1 = rolarDado();
    const d2 = rolarDado();
    setDadosJogador2([d1, d2]);

    const somaJogador1 = dadosJogador1[0] + dadosJogador1[1];
    const somaJogador2 = d1 + d2;

    let resultado = "";
    const novoPlacar = { ...placar };

    if (somaJogador1 > somaJogador2) {
      resultado = "Jogador 1 venceu a rodada!";
      novoPlacar.jogador1 += 1;
    } else if (somaJogador2 > somaJogador1) {
      resultado = "Jogador 2 venceu a rodada!";
      novoPlacar.jogador2 += 1;
    } else {
      resultado = "Empate na rodada!";
      novoPlacar.empates += 1;
    }

    setResultadoRodada(resultado);
    setPlacar(novoPlacar);
    setVez(0);

    if (rodada === TOTAL_RODADAS) {
      let final = "";
      if (novoPlacar.jogador1 > novoPlacar.jogador2) {
        final = "🏆 Jogador 1 venceu a partida!";
      } else if (novoPlacar.jogador2 > novoPlacar.jogador1) {
        final = "🏆 Jogador 2 venceu a partida!";
      } else {
        final = "🤝 A partida terminou empatada!";
      }
      setResultadoFinal(final);
      setJogoFinalizado(true);
    } else {
      setTimeout(() => {
        setRodada((r) => r + 1);
        setDadosJogador1([null, null]);
        setDadosJogador2([null, null]);
        setResultadoRodada("");
        setVez(1);
      }, 1400);
    }
  }

  function jogarNovamente() {
    setRodada(1);
    setVez(1);
    setDadosJogador1([null, null]);
    setDadosJogador2([null, null]);
    setResultadoRodada("");
    setPlacar({ jogador1: 0, jogador2: 0, empates: 0 });
    setJogoFinalizado(false);
    setResultadoFinal("");
  }

  return (
    <div className={styles.container}>
      <h1>Jogo de Dados</h1>

      {!jogoFinalizado && (
        <p className={styles.rodada}>
          Rodada {rodada} de {TOTAL_RODADAS}
        </p>
      )}

      <div className={styles.jogadores}>
        <div className={styles.jogador}>
          <h2>Jogador 1</h2>
          <div className={styles.dados}>
            <Dado valor={dadosJogador1[0]} />
            <Dado valor={dadosJogador1[1]} />
          </div>
          <button
            className={styles.botao}
            onClick={jogarJogador1}
            disabled={vez !== 1 || jogoFinalizado}
          >
            Jogar
          </button>
        </div>

        <div className={styles.jogador}>
          <h2>Jogador 2</h2>
          <div className={styles.dados}>
            <Dado valor={dadosJogador2[0]} />
            <Dado valor={dadosJogador2[1]} />
          </div>
          <button
            className={styles.botao}
            onClick={jogarJogador2}
            disabled={vez !== 2 || jogoFinalizado}
          >
            Jogar
          </button>
        </div>
      </div>

      {resultadoRodada && !jogoFinalizado && (
        <p className={styles.resultado}>{resultadoRodada}</p>
      )}

      <p className={styles.placar}>
        Placar — Jogador 1: {placar.jogador1} | Jogador 2: {placar.jogador2} | Empates: {placar.empates}
      </p>

      {jogoFinalizado && (
        <div className={styles.fim}>
          <h2>{resultadoFinal}</h2>
          <button className={styles.botao} onClick={jogarNovamente}>
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}
