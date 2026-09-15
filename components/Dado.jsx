export default function Dado({ valor }) {
  const imagem = valor
    ? `/dice/dado-${valor}.svg`
    : "/dice/dado-vazio.svg";

  return (
    <img
      src={imagem}
      alt={valor ? `Dado com valor ${valor}` : "Dado vazio"}
      width={90}
      height={90}
    />
  );
}
