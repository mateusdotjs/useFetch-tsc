import { useState } from "react";
import UseFetch from "./UseFetch";

type Produto = {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  descricao: string;
  internacional: boolean;
};

function App() {
  const [id, setId] = useState("p001");
  const produtos = UseFetch<Produto[]>("https://data.origamid.dev/produtos");
  const produto = UseFetch<Produto>(`https://data.origamid.dev/produtos/${id}`);

  return (
    <section style={{ display: "flex" }}>
      <div style={{ marginRight: "1rem" }}>
        {produtos.data &&
          produtos.data.map((produto) => (
            <button key={produto.id} onClick={() => setId(produto.id)}>
              {produto.id}
            </button>
          ))}
      </div>
      <div>
        {produto.loading && "Carregando..."}
        {produto.data && (
          <ul>
            <li>{produto.data.id}</li>
            <li>{produto.data.nome}</li>
            <li>{produto.data.preco}</li>
            <li>{produto.data.quantidade}</li>
            <li>{produto.data.descricao}</li>
            <li>{produto.data.internacional}</li>
          </ul>
        )}
      </div>
    </section>
  );
}

export default App;
