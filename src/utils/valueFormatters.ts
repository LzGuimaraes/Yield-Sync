// Função para determinar a cor com base no valor e indicador
export const getValueColor = (key: string, value: number): string => {
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
export const getValueIcon = (key: string, value: number): string => {
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