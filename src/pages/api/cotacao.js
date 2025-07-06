export default async function handler(req, res) {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ erro: 'Datas de início e fim são obrigatórias.' });
  }

  try {
    // Simulação de dados reais (você pode trocar por uma API real depois)
    const dias = gerarIntervaloDatas(start, end);
    const cotacoes = {};

    dias.forEach((data) => {
      cotacoes[data] = (5 + Math.random()).toFixed(2); // Simulando valor do dólar
    });

    res.status(200).json(cotacoes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao obter cotações.' });
  }
}

function gerarIntervaloDatas(inicio, fim) {
  const datas = [];
  let atual = new Date(inicio);
  const dataFim = new Date(fim);

  while (atual <= dataFim) {
    const yyyy = atual.getFullYear();
    const mm = String(atual.getMonth() + 1).padStart(2, '0');
    const dd = String(atual.getDate()).padStart(2, '0');
    datas.push(`${yyyy}-${mm}-${dd}`);
    atual.setDate(atual.getDate() + 1);
  }

  return datas;
}
