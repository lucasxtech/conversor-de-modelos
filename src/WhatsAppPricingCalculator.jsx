import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, MapPin, MessageSquare, CheckCircle, Zap, Shield, Handshake, Users, Code, BookOpen, Settings, Smartphone } from 'lucide-react';

// --- DADOS SIMULADOS (sem alterações) ---
const pricingData = [
  {
    market: 'Brasil',
    currency: 'BRL',
    rates: {
      marketing: 0.3500,
      utility: 0.0755,
      authentication: 0.0625,
      service: 0.0705,
    },
  },
  {
    market: 'Brasil',
    currency: 'USD',
    rates: {
      marketing: 0.0625,
      utility: 0.0135,
      authentication: 0.0112,
      service: 0.0126,
    },
  },
  {
    market: 'México',
    currency: 'MXN',
    rates: {
      marketing: 0.8847,
      utility: 0.4424,
      authentication: 0.3981,
      service: 0.4197,
    },
  },
  {
    market: 'México',
    currency: 'USD',
    rates: {
      marketing: 0.0525,
      utility: 0.0263,
      authentication: 0.0236,
      service: 0.0249,
    },
  },
  {
    market: 'EUA e Canadá',
    currency: 'USD',
    rates: {
      marketing: 0.0150,
      utility: 0.0088,
      authentication: 0.0079,
      service: 0.0050,
    },
  },
  {
    market: 'Argentina',
    currency: 'ARS',
    rates: {
      marketing: 56.00,
      utility: 25.50,
      authentication: 22.00,
      service: 24.00,
    },
  },
  {
    market: 'Argentina',
    currency: 'USD',
    rates: {
      marketing: 0.0610,
      utility: 0.0280,
      authentication: 0.0240,
      service: 0.0260,
    },
  },
  {
    market: 'Chile',
    currency: 'CLP',
    rates: {
      marketing: 58.00,
      utility: 26.00,
      authentication: 23.00,
      service: 25.00,
    },
  },
  {
    market: 'Chile',
    currency: 'USD',
    rates: {
      marketing: 0.0620,
      utility: 0.0280,
      authentication: 0.0250,
      service: 0.0270,
    },
  },
  {
    market: 'Bolívia',
    currency: 'BOB',
    rates: {
      marketing: 0.45,
      utility: 0.21,
      authentication: 0.18,
      service: 0.20,
    },
  },
  {
    market: 'Bolívia',
    currency: 'USD',
    rates: {
      marketing: 0.0650,
      utility: 0.0300,
      authentication: 0.0260,
      service: 0.0290,
    },
  },
  {
    market: 'Peru',
    currency: 'PEN',
    rates: {
      marketing: 0.25,
      utility: 0.12,
      authentication: 0.10,
      service: 0.11,
    },
  },
  {
    market: 'Peru',
    currency: 'USD',
    rates: {
      marketing: 0.0670,
      utility: 0.0320,
      authentication: 0.0270,
      service: 0.0300,
    },
  },
  {
    market: 'Espanha',
    currency: 'EUR',
    rates: {
      marketing: 0.0790,
      utility: 0.0450,
      authentication: 0.0410,
      service: 0.0430,
    },
  },
  {
    market: 'Espanha',
    currency: 'USD',
    rates: {
      marketing: 0.0850,
      utility: 0.0490,
      authentication: 0.0440,
      service: 0.0470,
    },
  },
];

// --- DADOS DOS MODELOS DA API ---
const apiModels = [
  {
    id: 'marketing',
    name: 'Marketing',
    icon: <Zap size={24} />,
    description: 'Para campanhas promocionais e marketing',
    useCases: [
      'Promoções e ofertas especiais',
      'Lançamentos de produtos',
      'Campanhas sazonais',
      'Newsletters promocionais',
      'Eventos e webinars'
    ],
    restrictions: [
      'Deve incluir opção de cancelamento',
      'Horário limitado (8h às 20h)',
      'Template pré-aprovado obrigatório',
      'Não pode ser usado para transações'
    ],

  },
  {
    id: 'utility',
    name: 'Utilidade',
    icon: <CheckCircle size={24} />,
    description: 'Para informações úteis e atualizações',
    useCases: [
      'Confirmações de pedidos',
      'Atualizações de status',
      'Lembretes de compromissos',
      'Informações de conta',
      'Notificações de sistema'
    ],
    restrictions: [
      'Conteúdo informativo apenas',
      'Sem elementos promocionais',
      'Deve ser relevante para o usuário',
      'Template deve ser claro e objetivo'
    ],

  },
  {
    id: 'authentication',
    name: 'Autenticação',
    icon: <Shield size={24} />,
    description: 'Para códigos de verificação e segurança',
    useCases: [
      'Códigos de verificação (OTP)',
      'Confirmação de login',
      'Recuperação de senha',
      'Verificação de identidade',
      'Autenticação em duas etapas'
    ],
    restrictions: [
      'Apenas códigos numéricos',
      'Tempo de expiração obrigatório',
      'Não pode conter links',
      'Template deve ser simples'
    ],

  },
  {
    id: 'service',
    name: 'Serviço',
    icon: <Handshake size={24} />,
    description: 'Para suporte ao cliente e atendimento',
    useCases: [
      'Suporte ao cliente',
      'Agendamento de consultas',
      'Resolução de problemas',
      'Atendimento personalizado',
      'Solicitações de serviço'
    ],
    restrictions: [
      'Foco em atendimento ao cliente',
      'Pode incluir links de suporte',
      'Deve ser profissional',
      'Template deve facilitar o contato'
    ],

  }
];

// --- ESTILOS IN-LINE ---
const styles = {
  mainContainer: {
    backgroundColor: '#111827',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily: 'system-ui, sans-serif',
    color: 'white',
  },
  card: {
    width: '100%',
    maxWidth: '100%',
    margin: 'auto',
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: '1.5rem',
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: '1px solid #374151',
    overflow: 'hidden',
  },
  contentPadding: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #a78bfa, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: '0.5rem',
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
    borderBottom: '2px solid #374151',
  },
  tabButton: {
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderBottom: '3px solid transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  tabButtonActive: {
    color: '#a78bfa',
    borderBottomColor: '#a78bfa',
  },
  tabContent: {
    display: 'none',
  },
  tabContentActive: {
    display: 'block',
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  dropdownsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '1.5rem',
  },
  selectInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    backgroundColor: '#1f2937',
    border: '2px solid #374151',
    borderRadius: '0.5rem',
    color: 'white',
    transition: 'border-color 0.2s',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: '500',
    marginBottom: '0.75rem',
    color: '#d1d5db',
  },
  categoryButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.75rem',
  },
  categoryButton: {
    flex: 1,
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '2px solid #374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    backgroundColor: '#1f2937',
    color: '#d1d5db',
  },
  categoryButtonActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
    color: 'white',
    transform: 'scale(1.05)',
  },
  numberInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: '#1f2937',
    border: '2px solid #374151',
    borderRadius: '0.5rem',
    color: 'white',
  },
  resultsContainer: {
    marginTop: '2.5rem',
    paddingTop: '2rem',
    borderTop: '2px dashed #374151',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '2rem',
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #374151',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  resultLabel: {
    fontSize: '1rem',
    color: '#9ca3af',
    marginBottom: '0.5rem',
  },
  rateValue: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#a78bfa',
    wordBreak: 'break-all',
  },
  totalCostValue: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#4ade80',
    wordBreak: 'break-all',
  },
  footerText: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  // Estilos para a nova aba de modelos da API
  modelsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  modelCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #374151',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  modelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  modelIcon: {
    color: '#a78bfa',
  },
  modelTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#d1d5db',
  },
  modelDescription: {
    color: '#9ca3af',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  modelSection: {
    marginBottom: '1.5rem',
  },
  modelSectionTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#d1d5db',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  modelList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  modelListItem: {
    padding: '0.5rem 0',
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  modelListItemBullet: {
    color: '#8b5cf6',
    marginTop: '0.25rem',
  },
  codeBlock: {
    backgroundColor: '#1f2937',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #374151',
    overflow: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    color: '#d1d5db',
    marginTop: '1rem',
  },
  apiInfoSection: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #374151',
    marginBottom: '2rem',
  },
  apiInfoTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#d1d5db',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  apiInfoText: {
    color: '#9ca3af',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
};

// --- HOOK PERSONALIZADO PARA RESPONSIVIDADE ---
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Define o tamanho inicial

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// --- COMPONENTE PRINCIPAL ---
export default function WhatsAppPricingCalculator() {
  const [selectedMarket, setSelectedMarket] = useState('Brasil');
  const [selectedCurrency, setSelectedCurrency] = useState('BRL');
  const [selectedCategory, setSelectedCategory] = useState('marketing');
  const [conversationRate, setConversationRate] = useState(0);
  const [numberOfContacts, setNumberOfContacts] = useState(5000);
  const [activeTab, setActiveTab] = useState('calculator');
  const [hoveredModel, setHoveredModel] = useState(null);

  // Hook para obter o tamanho da janela
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 640;
  const isTablet = (width ?? 0) < 768;

  const markets = useMemo(() => [...new Set(pricingData.map((p) => p.market))], []);
  const currencies = useMemo(() => {
    const available = pricingData
      .filter((p) => p.market === selectedMarket)
      .map((p) => p.currency);
    return [...new Set(available)];
  }, [selectedMarket]);

  useEffect(() => {
    if (!currencies.includes(selectedCurrency)) {
      setSelectedCurrency(currencies[0] || '');
    }
  }, [selectedMarket, currencies, selectedCurrency]);

  useEffect(() => {
    const data = pricingData.find(
      (p) => p.market === selectedMarket && p.currency === selectedCurrency
    );
    if (data && data.rates[selectedCategory]) {
      setConversationRate(data.rates[selectedCategory]);
    } else {
      setConversationRate(0);
    }
  }, [selectedMarket, selectedCurrency, selectedCategory]);

  const formattedRate = useMemo(() => {
    try {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: selectedCurrency,
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      }).format(conversationRate);
    } catch (error) {
      return `${selectedCurrency} ${conversationRate.toFixed(4)}`;
    }
  }, [conversationRate, selectedCurrency]);

  const formattedTotalCost = useMemo(() => {
    const totalCost = conversationRate * numberOfContacts;
    try {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: selectedCurrency,
      }).format(totalCost);
    } catch (error) {
      return `${selectedCurrency} ${totalCost.toFixed(2)}`;
    }
  }, [conversationRate, numberOfContacts, selectedCurrency]);

  const categories = [
    { id: 'marketing', label: 'Marketing', icon: <Zap size={20} /> },
    { id: 'utility', label: 'Utilidade', icon: <CheckCircle size={20} /> },
    { id: 'authentication', label: 'Autenticação', icon: <Shield size={20} /> },
    { id: 'service', label: 'Serviço', icon: <Handshake size={20} /> },
  ];

  // --- ESTILOS DINÂMICOS PARA RESPONSIVIDADE ---
  const dynamicContentPadding = isMobile ? { padding: '1.5rem' } : styles.contentPadding;
  const dynamicDropdownsGrid = isTablet
    ? styles.dropdownsGrid
    : { ...styles.dropdownsGrid, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', maxWidth: '600px', margin: '0 auto' };
  const dynamicCategoryButtonsContainer = isMobile
    ? { ...styles.categoryButtonsContainer, flexDirection: 'column' }
    : styles.categoryButtonsContainer;
  const dynamicResultsGrid = isTablet
    ? styles.resultsGrid
    : { ...styles.resultsGrid, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', maxWidth: '800px', margin: '0 auto' };
  const dynamicModelsGrid = isMobile
    ? { ...styles.modelsGrid, gridTemplateColumns: '1fr' }
    : isTablet
    ? { ...styles.modelsGrid, gridTemplateColumns: 'repeat(2, 1fr)' }
    : styles.modelsGrid;

  // --- RENDERIZAÇÃO COM ESTILOS IN-LINE ---
  return (
    <div style={styles.mainContainer}>
      <div style={styles.card}>
        <div style={dynamicContentPadding}>
          <div style={styles.header}>
            <h1 style={styles.title}>Calculadora de Taxas do WhatsApp</h1>
            <p style={styles.subtitle}>Estime o custo por conversa e para campanhas em massa.</p>
          </div>

          {/* Sistema de Abas */}
          <div style={styles.tabsContainer}>
            <button
              style={activeTab === 'calculator' ? { ...styles.tabButton, ...styles.tabButtonActive } : styles.tabButton}
              onClick={() => setActiveTab('calculator')}
            >
              <DollarSign size={20} />
              Calculadora
            </button>
            <button
              style={activeTab === 'models' ? { ...styles.tabButton, ...styles.tabButtonActive } : styles.tabButton}
              onClick={() => setActiveTab('models')}
            >
              <Code size={20} />
              Modelos da API
            </button>
          </div>

          {/* Aba Calculadora */}
          <div style={activeTab === 'calculator' ? styles.tabContentActive : styles.tabContent}>
            <div style={styles.controlsContainer}>
              <div style={dynamicDropdownsGrid}>
                <div style={{ position: 'relative' }}>
                  <MapPin
                    size={20}
                    style={{ position: 'absolute', left: '0.75rem', top: '0.9rem', color: '#9ca3af' }}
                  />
                  <select
                    style={styles.selectInput}
                    value={selectedMarket}
                    onChange={(e) => setSelectedMarket(e.target.value)}
                  >
                    {markets.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ position: 'relative' }}>
                  <DollarSign
                    size={20}
                    style={{ position: 'absolute', left: '0.75rem', top: '0.9rem', color: '#9ca3af' }}
                  />
                  <select
                    style={styles.selectInput}
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    {currencies.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={styles.label}>
                  <MessageSquare size={20} />
                  Categoria da Conversa
                </label>
                <div style={dynamicCategoryButtonsContainer}>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      style={
                        selectedCategory === cat.id
                          ? { ...styles.categoryButton, ...styles.categoryButtonActive }
                          : styles.categoryButton
                      }
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="contacts" style={styles.label}>
                  <Users size={20} />
                  Simulador de Disparo
                </label>
                <input
                  type="number"
                  id="contacts"
                  style={styles.numberInput}
                  value={numberOfContacts}
                  onChange={(e) =>
                    setNumberOfContacts(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)
                  }
                />
              </div>
            </div>

            <div style={styles.resultsContainer}>
              <div style={dynamicResultsGrid}>
                <div style={styles.resultCard}>
                  <p style={styles.resultLabel}>Taxa por Conversa</p>
                  <p style={styles.rateValue}>{formattedRate}</p>
                </div>
                <div style={styles.resultCard}>
                  <p style={styles.resultLabel}>
                    Custo para {numberOfContacts.toLocaleString('pt-BR')} contatos
                  </p>
                  <p style={styles.totalCostValue}>{formattedTotalCost}</p>
                </div>
              </div>
              <p style={styles.footerText}>
                * Custo por conversa de 24 horas iniciada pela empresa. O valor total é uma estimativa.
              </p>
            </div>
          </div>

          {/* Aba Modelos da API */}
          <div style={activeTab === 'models' ? styles.tabContentActive : styles.tabContent}>
            <div style={styles.apiInfoSection}>
              <h2 style={styles.apiInfoTitle}>
                <BookOpen size={24} />
                Modelos da API Oficial do WhatsApp Business
              </h2>
              <p style={styles.apiInfoText}>
                A API oficial do WhatsApp Business oferece 4 categorias principais de templates de mensagem. 
                Cada categoria tem regras específicas, casos de uso e restrições que devem ser respeitadas 
                para aprovação dos templates.
              </p>
              <p style={styles.apiInfoText}>
                <strong>Importante:</strong> Todos os templates devem ser pré-aprovados pelo WhatsApp antes 
                de serem utilizados. O processo de aprovação pode levar de 24 horas a alguns dias.
              </p>
            </div>

            <div style={dynamicModelsGrid}>
              {apiModels.map((model) => (
                <div 
                  key={model.id} 
                  style={{
                    ...styles.modelCard,
                    borderColor: hoveredModel === model.id ? '#8b5cf6' : '#374151',
                    transform: hoveredModel === model.id ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                  onMouseEnter={() => setHoveredModel(model.id)}
                  onMouseLeave={() => setHoveredModel(null)}
                >
                  <div style={styles.modelHeader}>
                    <div style={styles.modelIcon}>
                      {model.icon}
                    </div>
                    <h3 style={styles.modelTitle}>{model.name}</h3>
                  </div>
                  
                  <p style={styles.modelDescription}>{model.description}</p>
                  
                  <div style={styles.modelSection}>
                    <h4 style={styles.modelSectionTitle}>
                      <CheckCircle size={16} />
                      Casos de Uso
                    </h4>
                    <ul style={styles.modelList}>
                      {model.useCases.map((useCase, index) => (
                        <li key={index} style={styles.modelListItem}>
                          <span style={styles.modelListItemBullet}>•</span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div style={styles.modelSection}>
                    <h4 style={styles.modelSectionTitle}>
                      <Shield size={16} />
                      Restrições
                    </h4>
                    <ul style={styles.modelList}>
                      {model.restrictions.map((restriction, index) => (
                        <li key={index} style={styles.modelListItem}>
                          <span style={styles.modelListItemBullet}>•</span>
                          {restriction}
                        </li>
                      ))}
                    </ul>
                  </div>
                  

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
