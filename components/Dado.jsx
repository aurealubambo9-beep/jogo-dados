type DadoProps = {
  valor: number;
};

export default function Dado({ valor }: DadoProps) {
  return (
    <img
      src={`/dados/${valor}.svg`}
      alt={`Dado mostrando ${valor}`}
      width={70}
      height={70}
    />
  );
}
