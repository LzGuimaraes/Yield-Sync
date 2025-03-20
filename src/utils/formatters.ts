// Função para formatar os nomes dos campos
export const formatFieldName = (key: string): string => {
  // Capitaliza a primeira letra
  const formatted = key.charAt(0).toUpperCase() + key.slice(1);
  // Adiciona espaços antes de letras maiúsculas
  return formatted.replace(/([A-Z])/g, ' $1');
};

// Formatação de números para exibição
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(value);
};

// Formatação de números sem símbolo de moeda
export const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};