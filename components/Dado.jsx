export default function Dado({ valor }) {
  return (
    <img
      src={`/dice/dado-${valor}.svg`}
      alt={`Dado com valor ${valor}`}
      width={90}
      height={90}
    />
  );
}
