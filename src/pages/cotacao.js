import { useState } from 'react';

export default function Cotacao() {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [cotacoes, setCotacoes] = useState([]);

  const buscarCotacao = async () => {
    if (!dataInicio || !dataFim) {
      alert("Preencha as duas datas!");
      return;
    }

    try {
      const res = await fetch(`/api/cotacao?start=${dataInicio}&end=${dataFim}`);
      const dados = await res.json();

      if (res.ok) {
        setCotacoes(Object.entries(dados).map(([data, valor]) => ({ data, valor })));
      } else {
        alert("Erro na resposta da API");
      }
    } catch (error) {
      alert("Erro ao buscar cotação");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Buscar Cotação USD/BRL</h2>

      <div>
        <label>Data Início: </label>
        <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
      </div>

      <div>
        <label>Data Fim: </label>
        <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
      </div>

      <button onClick={buscarCotacao}>Buscar</button>

      <ul>
        {cotacoes.map((c, i) => (
          <li key={i}>{c.data}: R$ {c.valor.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}
