import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Análise Financeira Inteligente</h1>
      </div>
      <p className="mt-2 opacity-80 text-sm sm:text-base">Calcule e interprete os principais indicadores financeiros para análise de investimentos</p>
    </div>
  );
};

export default Header;