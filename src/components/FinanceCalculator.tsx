import React, { useState } from 'react';
import { FinanceData } from '../types/FinanceData';
import { CalculatedResults } from '../types/CalculatedResults';
import Header from './Header';
import Footer from './Footer';
import TabSelector from './TabSelector';
import ActionButtons from './ActionButtons';
import InputPanel from './InputPanel';
import ResultsPanel from './ResultsPanel';

const FinanceCalculator: React.FC = () => {
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

  const resetForm = () => {
    setData({
      lucroLiquido: 0,
      patrimonioLiquido: 0,
      ativosTotais: 0,
      receitaLiquida: 0,
      valorFinal: 0,
      valorInicial: 0,
      anos: 0,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-6 md:py-8 px-2 sm:px-4 w-full">
  <div className="w-full max-w-7xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden flex flex-col">
    <Header />

    <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

    <div className="p-3 sm:p-4 md:p-6 flex flex-col gap-4">
      {/* Botões de Ação centralizados e responsivos */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <ActionButtons resetForm={resetForm} loadSampleData={loadSampleData} />
      </div>

      {/* Painéis com layout responsivo */}
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {/* Painel de Entrada ocupa 100% da largura no mobile e divide espaço no desktop */}
        <div className="w-full md:w-1/2">
          <InputPanel 
            data={data} 
            handleChange={handleChange} 
            activeTab={activeTab} 
          />
        </div>

        {/* Painel de Resultados ocupa 100% da largura no mobile e divide espaço no desktop */}
        <div className="w-full md:w-1/2">
          <ResultsPanel 
            results={results} 
            activeTab={activeTab} 
            showTooltip={showTooltip} 
            setShowTooltip={setShowTooltip} 
          />
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</div>

  );
};

export default FinanceCalculator;