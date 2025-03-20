import { useState } from "react";

interface FinanceData {
  lucroLiquido: number;
  patrimonioLiquido: number;
  ativosTotais: number;
  receitaLiquida: number;
  valorFinal: number;
  valorInicial: number;
  anos: number;
  dividaLiquida: number;
  ebitda: number;
  ativosCirculantes: number;
  passivosCirculantes: number;
  precoAcao: number;
  dividendosPagos: number;
  lucroPorAcao: number;
  valorPatrimonial: number;
}

// Função para formatar os nomes dos campos
const formatFieldName = (key: string): string => {
  // Capitaliza a primeira letra
  const formatted = key.charAt(0).toUpperCase() + key.slice(1);
  // Adiciona espaços antes de letras maiúsculas
  return formatted.replace(/([A-Z])/g, ' $1');
};

// Agrupar campos relacionados para melhor organização
const fieldGroups = [
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

// Interface para resultados calculados
interface CalculatedResults {
  ROE: number;
  ROA: number;
  margemLiquida: number;
  CAGR: number;
  dividaEbitda: number;
  liquidezCorrente: number;
  PL: number;
  PVP: number;
  dividendYield: number;
}

// Descrições dos indicadores financeiros
const indicatorDescriptions: Record<keyof CalculatedResults, string> = {
  ROE : "Retorno sobre Patrimônio Líquido - Mede a eficiência da empresa em gerar lucro a partir do seu patrimônio",
  ROA: "Retorno sobre Ativos - Indica quão eficiente a empresa é em usar seus ativos para gerar lucros",
  margemLiquida: "Margem Líquida - Percentual de lucro em relação à receita líquida",
  CAGR: "Taxa Composta de Crescimento Anual - Mede o retorno médio anual de um investimento",
  dividaEbitda: "Dívida/EBITDA - Indica quantos anos seria necessário para pagar a dívida com o EBITDA atual",
  liquidezCorrente: "Liquidez Corrente - Capacidade da empresa de pagar dívidas de curto prazo",
  PL: "Preço/Lucro - Relação entre o preço da ação e o lucro por ação",
  PVP: "Preço/Valor Patrimonial - Relação entre o preço da ação e seu valor patrimonial",
  dividendYield: "Rendimento de Dividendos - Rendimento dos dividendos em relação ao preço da ação"
};

export default function FinanceCalculator() {
  const [data, setData] = useState<FinanceData>({
    lucroLiquido: 0,
    patrimonioLiquido: 0,
    ativosTotais: 0,
    receitaLiquida: 0,
    valorFinal: 0,
    valorInicial: 0,
    anos: 1,
    dividaLiquida: 0,
    ebitda: 0,
    ativosCirculantes: 0,
    passivosCirculantes: 0,
    precoAcao: 0,
    dividendosPagos: 0,
    lucroPorAcao: 0,
    valorPatrimonial: 0,
  });
  
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inputs' | 'results'>('inputs');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const calculate = (): CalculatedResults => {
    const {
      lucroLiquido,
      patrimonioLiquido,
      ativosTotais,
      receitaLiquida,
      valorFinal,
      valorInicial,
      anos,
      dividaLiquida,
      ebitda,
      ativosCirculantes,
      passivosCirculantes,
      precoAcao,
      dividendosPagos,
      lucroPorAcao,
      valorPatrimonial,
    } = data;

    return {
      ROE: patrimonioLiquido ? (lucroLiquido / patrimonioLiquido) * 100 : 0,
      ROA: ativosTotais ? (lucroLiquido / ativosTotais) * 100 : 0,
      margemLiquida: receitaLiquida ? (lucroLiquido / receitaLiquida) * 100 : 0,
      CAGR: valorInicial && anos ? (((valorFinal / valorInicial) ** (1 / anos)) - 1) * 100 : 0,
      dividaEbitda: ebitda ? dividaLiquida / ebitda : 0,
      liquidezCorrente: passivosCirculantes ? ativosCirculantes / passivosCirculantes : 0,
      PL: lucroPorAcao ? precoAcao / lucroPorAcao : 0,
      PVP: valorPatrimonial ? precoAcao / valorPatrimonial : 0,
      dividendYield: precoAcao ? (dividendosPagos / precoAcao) * 100 : 0,
    };
  };

  const results = calculate();

  // Função para determinar a cor com base no valor e indicador
  const getValueColor = (key: string, value: number): string => {
    switch (key) {
      case 'ROE':
      case 'ROA':
      case 'margemLiquida':
      case 'CAGR':
      case 'dividendYield':
        return value > 10 ? "text-emerald-600" : value > 5 ? "text-amber-600" : "text-rose-600";
      case 'liquidezCorrente':
        return value > 1.5 ? "text-emerald-600" : value > 1 ? "text-amber-600" : "text-rose-600";
      case 'dividaEbitda':
        return value < 2 ? "text-emerald-600" : value < 3.5 ? "text-amber-600" : "text-rose-600";
      case 'PL':
        return value < 15 ? "text-emerald-600" : value < 25 ? "text-amber-600" : "text-rose-600";
      case 'PVP':
        return value < 1.5 ? "text-emerald-600" : value < 3 ? "text-amber-600" : "text-rose-600";
      default:
        return "text-blue-600";
    }
  };

  // Função para determinar um ícone com base no valor
  const getValueIcon = (key: string, value: number): string => {
    switch (key) {
      case 'ROE':
      case 'ROA':
      case 'margemLiquida':
      case 'CAGR':
      case 'dividendYield':
        return value > 10 ? "🔥" : value > 5 ? "👍" : "👎";
      case 'liquidezCorrente':
        return value > 1.5 ? "🔥" : value > 1 ? "👍" : "👎";
      case 'dividaEbitda':
        return value < 2 ? "🔥" : value < 3.5 ? "👍" : "👎";
      case 'PL':
        return value < 15 ? "🔥" : value < 25 ? "👍" : "👎";
      case 'PVP':
        return value < 1.5 ? "🔥" : value < 3 ? "👍" : "👎";
      default:
        return "";
    }
  };

  const resetForm = () => {
    setData({
      lucroLiquido: 0,
      patrimonioLiquido: 0,
      ativosTotais: 0,
      receitaLiquida: 0,
      valorFinal: 0,
      valorInicial: 0,
      anos: 1,
      dividaLiquida: 0,
      ebitda: 0,
      ativosCirculantes: 0,
      passivosCirculantes: 0,
      precoAcao: 0,
      dividendosPagos: 0,
      lucroPorAcao: 0,
      valorPatrimonial: 0,
    });
  };

  // Exemplo de dados predefinidos (valores fictícios para demonstração)
  const loadSampleData = () => {
    setData({
      lucroLiquido: 1500000,
      patrimonioLiquido: 10000000,
      ativosTotais: 15000000,
      receitaLiquida: 12000000,
      valorFinal: 150000,
      valorInicial: 100000,
      anos: 5,
      dividaLiquida: 4000000,
      ebitda: 2500000,
      ativosCirculantes: 5000000,
      passivosCirculantes: 3000000,
      precoAcao: 25,
      dividendosPagos: 1.5,
      lucroPorAcao: 2.1,
      valorPatrimonial: 18,
    });
  };

  // Formatação de números para exibição
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Análise Financeira Inteligente</h1>
            <div className="hidden md:flex space-x-4">
              <button 
                onClick={() => setActiveTab('inputs')}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 ${
                  activeTab === 'inputs' 
                    ? 'bg-white text-blue-700 shadow-md' 
                    : 'bg-blue-700/30 text-white hover:bg-blue-700/50'
                }`}
              >
                Dados de Entrada
              </button>
              <button 
                onClick={() => setActiveTab('results')}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 ${
                  activeTab === 'results' 
                    ? 'bg-white text-blue-700 shadow-md' 
                    : 'bg-blue-700/30 text-white hover:bg-blue-700/50'
                }`}
              >
                Indicadores
              </button>
            </div>
          </div>
          <p className="mt-2 opacity-80">Calcule e interprete os principais indicadores financeiros para análise de investimentos</p>
        </div>

        {/* Apenas para telas pequenas */}
        <div className="md:hidden grid grid-cols-2 gap-4 bg-gray-100 p-4">
          <button 
            onClick={() => setActiveTab('inputs')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'inputs' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-blue-700'
            }`}
          >
            Dados de Entrada
          </button>
          <button 
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'results' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-blue-700'
            }`}
          >
            Indicadores
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-end mb-4 space-x-3">
            <button 
              onClick={resetForm}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
            >
              <span className="mr-1">🗑️</span> Limpar
            </button>
            <button 
              onClick={loadSampleData}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition shadow-md flex items-center"
            >
              <span className="mr-1">📋</span> Carregar Exemplo
            </button>
          </div>

          {/* Paineis com animação de transição */}
          <div className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
            {/* Painel de entradas */}
            <div 
              className={`transition-all duration-500 absolute w-full ${
                activeTab === 'inputs' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
              }`}
              style={{ display: activeTab === 'inputs' ? 'block' : 'none' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {fieldGroups.map((group) => (
                  <div 
                    key={group.title} 
                    className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">{group.icon}</span> {group.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {group.fields.map((field) => (
                        <div key={field} className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {formatFieldName(field)}
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">R$</span>
                            </div>
                            <input
                              name={field}
                              type="number"
                              step="any"
                              value={data[field as keyof FinanceData] || ""}
                              onChange={handleChange}
                              className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border border-gray-300 rounded-lg py-3 hover:border-indigo-300 transition-colors"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Painel de resultados */}
            <div 
              className={`transition-all duration-500 absolute w-full ${
                activeTab === 'results' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
              style={{ display: activeTab === 'results' ? 'block' : 'none' }}
            >
              <div className="border rounded-xl p-5 shadow-md bg-white">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📊</span> Indicadores Financeiros
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Object.entries(results).map(([key, value]) => (
                    <div 
                      key={key} 
                      className="relative p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      onMouseEnter={() => setShowTooltip(key)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">{key}</span>
                        <span className={`font-bold text-lg ${getValueColor(key, value)}`}>
                          {getValueIcon(key, value)} {' '}
                          {key === 'dividaEbitda' || key === 'liquidezCorrente' || key === 'PL' || key === 'PVP' 
                            ? (key === 'PL' || key === 'PVP' ? value.toFixed(2) : formatCurrency(value))
                            : `${value.toFixed(2)}%`}
                        </span>
                      </div>
                      
                      {showTooltip === key && (
                        <div className="absolute left-0 right-0 -bottom-12 bg-gray-800 text-white p-2 rounded text-sm z-10 shadow-lg">
                          {indicatorDescriptions[key as keyof CalculatedResults]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Resumo dos números principais */}
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3">Resumo da Análise</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A empresa apresenta um ROE de <span className={getValueColor('ROE', results.ROE)}>{results.ROE.toFixed(2)}%</span>, 
                    com margem líquida de <span className={getValueColor('margemLiquida', results.margemLiquida)}>{results.margemLiquida.toFixed(2)}%</span>. 
                    A relação P/L está em <span className={getValueColor('PL', results.PL)}>{formatCurrency(results.PL)}</span> e 
                    o rendimento de dividendos atual é de <span className={getValueColor('dividendYield', results.dividendYield)}>{results.dividendYield.toFixed(2)}%</span>.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm text-gray-600">
                  <h3 className="font-semibold mb-3 text-indigo-700">Como interpretar:</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>🔥 - Excelente desempenho</li>
                    <li>👍 - Desempenho adequado</li>
                    <li>👎 - Abaixo do esperado</li>
                  </ul>
                  <p className="mt-3 italic text-indigo-600">Passe o mouse sobre os indicadores para ver descrições detalhadas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200 text-center p-5 text-sm text-gray-700 font-medium">
          Calculadora de Indicadores Financeiros © 2025 | Analise empresas com mais precisão
        </footer>
      </div>
    </div>
  );
}