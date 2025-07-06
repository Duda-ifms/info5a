import React, { useState } from 'react';

export default function Cotacao() {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleCotacao = () => {
    if (!dataInicial || !dataFinal) {
      setErro('Por favor, preencha as duas datas.');
      setResultado(null);
      return;
    }
    if (dataFinal < dataInicial) {
      setErro('Data final não pode ser anterior à data inicial.');
      setResultado(null);
      return;
    }
    setErro('');
    setResultado({
      inicio: dataInicial,
      fim: dataFinal,
      valor: 'R$ 1.500,00',
    });
  };

  return (
    <div className="container">
      <h2 className="titulo">Cotação de Serviços</h2>

      <div className="formulario">
        <label className="label">
          Data Inicial
          <input
            type="date"
            className="input"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />
        </label>

        <label className="label">
          Data Final
          <input
            type="date"
            className="input"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </label>

        <button className="button" onClick={handleCotacao}>
          Calcular Cotação
        </button>
      </div>

      {erro && <div className="erro">{erro}</div>}

      {resultado && (
        <div className="resultado">
          <div className="item">
            <strong>Data Inicial:</strong> {resultado.inicio}
          </div>
          <div className="item">
            <strong>Data Final:</strong> {resultado.fim}
          </div>
          <div className="item">
            <strong>Valor Estimado:</strong> {resultado.valor}
          </div>
        </div>
      )}
    </div>
  );
}
