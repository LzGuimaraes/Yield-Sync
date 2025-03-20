import React from 'react';
import { FinanceData } from '../types/FinanceData';
import { formatFieldName } from '../utils/formatters';
import { fieldGroups } from '../constants/fieldGroups';

interface InputPanelProps {
  data: FinanceData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeTab: 'inputs' | 'results';
}

const InputPanel: React.FC<InputPanelProps> = ({ data, handleChange, activeTab }) => {
  return (
    <div 
      className={`transition-all duration-500 w-full ${
        activeTab === 'inputs' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full hidden md:block md:opacity-100 md:translate-x-0'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mx-auto w-full">
        {fieldGroups.map((group) => (
          <div 
            key={group.title} 
            className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">{group.icon}</span> {group.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {group.fields.map((field) => (
                <div key={field} className="relative">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {formatFieldName(field)}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    {field !== 'anos' && (
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{field === 'precoAcao' || field === 'dividendosPagos' || field === 'lucroPorAcao' || field === 'valorPatrimonial' ? 'R$' : field === 'anos' ? '' : 'R$'}</span>
                      </div>
                    )}
                    <input
                      name={field}
                      type="number"
                      step="any"
                      value={data[field as keyof FinanceData] || ""}
                      onChange={handleChange}
                      className={`focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full ${field !== 'anos' ? 'pl-10' : 'pl-3'} text-xs sm:text-sm border border-gray-300 rounded-lg py-2 sm:py-3 hover:border-indigo-300 transition-colors`}
                      placeholder={field === 'anos' ? 'Anos' : ''}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputPanel;