import React from 'react';
import { CalculatedResults } from '../types/CalculatedResults';
import { formatNumber } from '../utils/formatters';
import { indicatorDescriptions } from '../constants/indicatorDescriptions';
import { getValueColor, getValueIcon } from '../utils/valueFormatters';

interface ResultsPanelProps {
  results: CalculatedResults;
  activeTab: 'inputs' | 'results';
  showTooltip: string | null;
  setShowTooltip: (key: string | null) => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  results, 
  activeTab, 
  showTooltip, 
  setShowTooltip 
}) => {
  return (
    <div 
      className={`transition-all duration-500 w-full ${
        activeTab === 'results' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full hidden'
      }`}
    >
      <div className="border rounded-xl p-3 sm:p-5 shadow-md bg-white mx-auto w-full">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
          <span className="mr-2">📊</span> Indicadores Financeiros
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mx-auto">
          {Object.entries(results).map(([key, value]) => (
            <div 
              key={key} 
              className="relative p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              onMouseEnter={() => setShowTooltip(key)}
              onMouseLeave={() => setShowTooltip(null)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base text-gray-800">{key}</span>
                <span className={`font-bold text-base sm:text-lg ${getValueColor(key, value)}`}>
                  {getValueIcon(key, value)} {' '}
                  {key === 'dividaEbitda' || key === 'liquidezCorrente' || key === 'PL' || key === 'PVP' 
                    ? (key === 'PL' || key === 'PVP' ? formatNumber(value) : key === 'dividaEbitda' ? formatNumber(value, 1) + 'x' : formatNumber(value))
                    : `${formatNumber(value)}%`}
                </span>
              </div>
              
              {showTooltip === key && (
                <div className="absolute left-0 right-0 -bottom-16 sm:-bottom-12 bg-gray-800 text-white p-2 rounded text-xs sm:text-sm z-10 shadow-lg">
                  {indicatorDescriptions[key as keyof CalculatedResults]}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Resumo dos números principais */}
        <div className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-6 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-base sm:text-lg font-semibold text-indigo-800 mb-2 sm:mb-3">Resumo da Análise</h3>
          <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
            A empresa apresenta um ROE de <span className={`font-semibold ${getValueColor('ROE', results.ROE)}`}>{formatNumber(results.ROE)}%</span>, 
            com margem líquida de <span className={`font-semibold ${getValueColor('margemLiquida', results.margemLiquida)}`}>{formatNumber(results.margemLiquida)}%</span>. 
            A relação P/L está em <span className={`font-semibold ${getValueColor('PL', results.PL)}`}>{formatNumber(results.PL)}</span> e 
            o rendimento de dividendos atual é de <span className={`font-semibold ${getValueColor('dividendYield', results.dividendYield)}`}>{formatNumber(results.dividendYield)}%</span>.
          </p>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6 p-3 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="text-xs sm:text-sm text-gray-600">
          <h3 className="font-semibold mb-2 sm:mb-3 text-indigo-700">Como interpretar:</h3>
          <ul className="space-y-1 sm:space-y-2 list-disc pl-4 sm:pl-5">
            <li>🔥 - Excelente desempenho</li>
            <li>👍 - Desempenho adequado</li>
            <li>👎 - Abaixo do esperado</li>
          </ul>
          <p className="mt-3 italic text-indigo-600">Passe o mouse sobre os indicadores para ver descrições detalhadas.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;