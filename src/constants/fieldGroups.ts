// Agrupar campos relacionados para melhor organização
export const fieldGroups = [
  {
    title: "Dados da Empresa",
    fields: ["lucroLiquido", "patrimonioLiquido", "ativosTotais", "receitaLiquida", "dividaLiquida", "ebitda"],
    icon: "📈"
  },
  {
    title: "Dados de Circulação",
    fields: ["ativosCirculantes", "passivosCirculantes"],
    icon: "💰"
  },
  {
    title: "Dados da Ação",
    fields: ["precoAcao", "dividendosPagos", "lucroPorAcao", "valorPatrimonial"],
    icon: "📊"
  },
  {
    title: "Análise Temporal",
    fields: ["valorInicial", "valorFinal", "anos"],
    icon: "⏱️"
  }
];