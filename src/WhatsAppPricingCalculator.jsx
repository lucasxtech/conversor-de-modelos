import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, MapPin, MessageSquare, CheckCircle, Zap, Shield, Handshake, Users, Code, BookOpen, Settings, Smartphone, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext.jsx';

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
    market: 'Brasil',
    currency: 'EUR',
    rates: {
      marketing: 0.0580,
      utility: 0.0125,
      authentication: 0.0104,
      service: 0.0117,
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
    market: 'México',
    currency: 'EUR',
    rates: {
      marketing: 0.0487,
      utility: 0.0244,
      authentication: 0.0219,
      service: 0.0231,
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
    market: 'EUA e Canadá',
    currency: 'EUR',
    rates: {
      marketing: 0.0139,
      utility: 0.0082,
      authentication: 0.0073,
      service: 0.0046,
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
    market: 'Argentina',
    currency: 'EUR',
    rates: {
      marketing: 0.0566,
      utility: 0.0260,
      authentication: 0.0223,
      service: 0.0241,
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
    market: 'Chile',
    currency: 'EUR',
    rates: {
      marketing: 0.0575,
      utility: 0.0260,
      authentication: 0.0232,
      service: 0.0250,
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
    market: 'Bolívia',
    currency: 'EUR',
    rates: {
      marketing: 0.0603,
      utility: 0.0278,
      authentication: 0.0241,
      service: 0.0269,
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
    market: 'Peru',
    currency: 'EUR',
    rates: {
      marketing: 0.0621,
      utility: 0.0297,
      authentication: 0.0250,
      service: 0.0278,
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
  {
    market: 'Colômbia',
    currency: 'COP',
    rates: {
      marketing: 250.00,
      utility: 120.00,
      authentication: 100.00,
      service: 110.00,
    },
  },
  {
    market: 'Colômbia',
    currency: 'USD',
    rates: {
      marketing: 0.0630,
      utility: 0.0302,
      authentication: 0.0252,
      service: 0.0277,
    },
  },
  {
    market: 'Colômbia',
    currency: 'EUR',
    rates: {
      marketing: 0.0584,
      utility: 0.0280,
      authentication: 0.0234,
      service: 0.0257,
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
    backgroundColor: 'var(--bg-primary)',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily: 'system-ui, sans-serif',
    color: 'var(--text-primary)',
  },
  card: {
    width: '100%',
    maxWidth: '100%',
    margin: 'auto',
    backgroundColor: 'var(--bg-card)',
    backdropFilter: 'blur(12px)',
    borderRadius: '1.5rem',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border-color)',
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
    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 25%, #a855f7 50%, #c084fc 75%, #f472b6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 2px 4px rgba(124, 58, 237, 0.3))',
  },
  subtitle: {
    color: 'var(--text-muted)',
    marginTop: '0.5rem',
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
    borderBottom: '2px solid var(--border-color)',
  },
  tabButton: {
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
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
    color: 'var(--accent-secondary)',
    borderBottomColor: 'var(--accent-secondary)',
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
    backgroundColor: 'var(--bg-secondary)',
    border: '2px solid var(--border-color)',
    borderRadius: '0.5rem',
    color: 'var(--text-primary)',
    transition: 'border-color 0.2s',
  },
  themeToggle: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.5rem',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '0.5rem',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: '500',
    marginBottom: '0.75rem',
    color: 'var(--text-secondary)',
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
    border: '2px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-secondary)',
  },
  categoryButtonActive: {
    backgroundColor: 'var(--accent-primary)',
    borderColor: 'var(--accent-primary)',
    color: 'white',
    transform: 'scale(1.05)',
  },
  numberInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'var(--bg-secondary)',
    border: '2px solid var(--border-color)',
    borderRadius: '0.5rem',
    color: 'var(--text-primary)',
  },
  resultsContainer: {
    marginTop: '2.5rem',
    paddingTop: '2rem',
    borderTop: '1px solid var(--border-color)',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '2rem',
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: 'var(--bg-card-hover)',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  resultLabel: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    marginBottom: '0.5rem',
  },
  rateValue: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: 'var(--accent-secondary)',
    wordBreak: 'break-all',
  },
  totalCostValue: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: 'var(--success-color)',
    wordBreak: 'break-all',
  },
  footerText: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
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
    backgroundColor: 'transparent',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid var(--border-color)',
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
    color: 'var(--accent-secondary)',
  },
  modelTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--text-secondary)',
  },
  modelDescription: {
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
    lineHeight: '1.7',
    fontSize: '1.05rem',
  },
  modelSection: {
    marginBottom: '1.5rem',
  },
  modelSectionTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
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
    padding: '0.75rem 0',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    lineHeight: '1.6',
  },
  modelListItemBullet: {
    color: 'var(--accent-primary)',
    marginTop: '0.25rem',
  },
  codeBlock: {
    backgroundColor: 'var(--bg-secondary)',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--border-color)',
    overflow: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    color: 'var(--text-secondary)',
    marginTop: '1rem',
  },
  apiInfoSection: {
    backgroundColor: 'transparent',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid var(--border-color)',
    marginBottom: '2rem',
  },
  apiInfoTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--text-secondary)',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  apiInfoText: {
    color: 'var(--text-muted)',
    lineHeight: '1.8',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
  },
  clintButton: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '3rem',
    paddingTop: '2rem',
    borderTop: '1px solid var(--border-color)',
    flexWrap: 'wrap',
  },
  clintButtonLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 2rem',
    backgroundColor: 'var(--accent-primary)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    fontSize: '1.125rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: 'none',
    cursor: 'pointer',
  },
  // Estilos para a aba "Como funciona"
  howItWorksContainer: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  howItWorksSection: {
    backgroundColor: 'transparent',
    padding: '2.5rem',
    borderRadius: '1rem',
    border: '1px solid var(--border-color)',
    marginBottom: '2.5rem',
  },
  howItWorksTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--text-secondary)',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  howItWorksText: {
    color: 'var(--text-muted)',
    lineHeight: '1.8',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
  },
  howItWorksHighlight: {
    backgroundColor: 'var(--bg-secondary)',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid var(--border-color)',
    marginBottom: '1.5rem',
  },
  howItWorksSubtitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '1.25rem',
    marginTop: '2rem',
  },
  howItWorksList: {
    listStyle: 'none',
    padding: 0,
    margin: '1.5rem 0',
  },
  howItWorksListItem: {
    padding: '0.75rem 0',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    borderBottom: 'none',
    lineHeight: '1.6',
  },
  howItWorksListItemBullet: {
    color: 'var(--accent-primary)',
    marginTop: '0.25rem',
    fontWeight: 'bold',
  },
  howItWorksNote: {
    backgroundColor: 'var(--accent-primary)',
    color: 'white',
    padding: '1rem',
    borderRadius: '0.75rem',
    marginTop: '1rem',
    fontSize: '0.9rem',
    fontWeight: '500',
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
  const { isDarkMode, toggleTheme } = useTheme();
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
    : { ...styles.modelsGrid, gridTemplateColumns: 'repeat(2, 1fr)' };

  // --- RENDERIZAÇÃO COM ESTILOS IN-LINE ---
  return (
    <div style={styles.mainContainer}>
      <div style={styles.card}>
        <div style={dynamicContentPadding}>
          {/* Botão de alternância de tema */}
          <button
            style={styles.themeToggle}
            onClick={toggleTheme}
            title={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div style={styles.header}>
            <h1 style={styles.title}>Conversão de Taxas do WhatsApp</h1>
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
            <button
              style={activeTab === 'how-it-works' ? { ...styles.tabButton, ...styles.tabButtonActive } : styles.tabButton}
              onClick={() => setActiveTab('how-it-works')}
            >
              <BookOpen size={20} />
              Como funciona
            </button>
          </div>

          {/* Aba Calculadora */}
          <div style={activeTab === 'calculator' ? styles.tabContentActive : styles.tabContent}>
            <div style={styles.controlsContainer}>
              <div style={dynamicDropdownsGrid}>
                <div style={{ position: 'relative' }}>
                  <MapPin
                    size={20}
                    style={{ position: 'absolute', left: '0.75rem', top: '0.9rem', color: 'var(--text-muted)' }}
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
                    style={{ position: 'absolute', left: '0.75rem', top: '0.9rem', color: 'var(--text-muted)' }}
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
                Modelos da API Oficial do WhatsApp
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
                    borderColor: hoveredModel === model.id ? 'var(--accent-primary)' : 'var(--border-color)',
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

          {/* Aba Como funciona */}
          <div style={activeTab === 'how-it-works' ? styles.tabContentActive : styles.tabContent}>
            <div style={styles.howItWorksContainer}>
              {/* Primeira seção: Uso da API Oficial */}
              <div style={styles.howItWorksSection}>
                <h2 style={styles.howItWorksTitle}>
                  <Code size={24} />
                  Uso da API Oficial do WhatsApp
                </h2>
                <p style={styles.howItWorksText}>
                  A API Oficial do WhatsApp é a solução liberada pela Meta (WhatsApp Business Platform) para empresas que querem se comunicar de forma escalável, segura e seguindo as políticas oficiais. Ela é utilizada através de provedores oficiais (BSPs - Business Solution Providers) ou diretamente via conta própria no Meta Business Manager.
                </p>
              </div>

              {/* Segunda seção: Como funciona a cobrança */}
              <div style={styles.howItWorksSection}>
                <h2 style={styles.howItWorksTitle}>
                  <DollarSign size={24} />
                  Como funciona a cobrança
                </h2>
                <p style={styles.howItWorksText}>
                  A cobrança é feita por conversa, e não por mensagem individual.
                </p>
                <p style={styles.howItWorksText}>
                  Uma conversa é uma janela de 24 horas iniciada a partir da primeira mensagem enviada ou recebida. Dentro dessa janela, você pode trocar quantas mensagens quiser sem custo adicional.
                </p>
                
                <div style={styles.howItWorksHighlight}>
                  <h3 style={styles.howItWorksSubtitle}>Existem 4 categorias de conversas, e cada uma tem um valor diferente (definido pela Meta e pode variar por país):</h3>
                  
                  <h4 style={styles.howItWorksSubtitle}>Conversas iniciadas pelo usuário (User-Initiated)</h4>
                  <ul style={styles.howItWorksList}>
                    <li style={styles.howItWorksListItem}>
                      <span style={styles.howItWorksListItemBullet}>•</span>
                      O cliente envia a primeira mensagem para você.
                    </li>
                    <li style={styles.howItWorksListItem}>
                      <span style={styles.howItWorksListItemBullet}>•</span>
                      Você pode responder livremente durante 24h sem custo extra além da abertura da conversa.
                    </li>
                  </ul>

                  <h4 style={styles.howItWorksSubtitle}>Conversas iniciadas pela empresa (Business-Initiated)</h4>
                  <ul style={styles.howItWorksList}>
                    <li style={styles.howItWorksListItem}>
                      <span style={styles.howItWorksListItemBullet}>•</span>
                      Você inicia o contato usando um template pré-aprovado pelo WhatsApp.
                    </li>
                    <li style={styles.howItWorksListItem}>
                      <span style={styles.howItWorksListItemBullet}>•</span>
                      Essas conversas sempre têm custo desde o início, mesmo que o cliente já tenha falado com você antes, se estiver fora da janela de 24h.
                    </li>
                  </ul>

                  <h4 style={styles.howItWorksSubtitle}>Conversas de autenticação</h4>
                  <ul style={styles.howItWorksList}>
                    <li style={styles.howItWorksListItem}>
                      <span style={styles.howItWorksListItemBullet}>•</span>
                      Usadas para enviar códigos de verificação, links de login ou validações rápidas.
                    </li>
                  </ul>

                  <h4 style={styles.howItWorksSubtitle}>Conversas de marketing</h4>
                  <ul style={styles.howItWorksList}>
                    <li style={styles.howItWorksListItem}>
                      <span style={styles.howItWorksListItemBullet}>•</span>
                      Para promoções, ofertas, campanhas, anúncios, novidades, etc.
                    </li>
                  </ul>
                </div>

                <div style={styles.howItWorksNote}>
                  💡 Obs.: Em alguns casos, a Meta oferece 1000 conversas gratuitas por mês (para empresas que usam conta própria), mas isso depende de como a conta foi configurada.
                </div>
              </div>

              {/* Terceira seção: Regras das conversas */}
              <div style={styles.howItWorksSection}>
                <h2 style={styles.howItWorksTitle}>
                  <Shield size={24} />
                  Regras das conversas
                </h2>
                <p style={styles.howItWorksText}>
                  A API segue políticas rígidas da Meta para garantir qualidade e evitar spam:
                </p>

                <h3 style={styles.howItWorksSubtitle}>Templates para iniciar conversa</h3>
                <p style={styles.howItWorksText}>
                  Se for falar com o cliente fora da janela de 24h, precisa enviar usando um modelo de mensagem aprovado.
                </p>

                <h3 style={styles.howItWorksSubtitle}>Conteúdo permitido</h3>
                <ul style={styles.howItWorksList}>
                  <li style={styles.howItWorksListItem}>
                    <span style={styles.howItWorksListItemBullet}>•</span>
                    Mensagens relacionadas ao atendimento, transações, atualizações de pedidos, suporte e promoções (respeitando categorias e aprovação).
                  </li>
                </ul>

                <h3 style={styles.howItWorksSubtitle}>Conteúdo proibido</h3>
                <ul style={styles.howItWorksList}>
                  <li style={styles.howItWorksListItem}>
                    <span style={styles.howItWorksListItemBullet}>•</span>
                    Materiais enganosos, conteúdo ilegal, adult, jogos de azar não autorizados, spam.
                  </li>
                </ul>

                <h3 style={styles.howItWorksSubtitle}>Limite de qualidade</h3>
                <p style={styles.howItWorksText}>
                  Se muitos clientes bloquearem ou denunciarem sua conta, a Meta pode reduzir o limite de envio ou até suspender o número.
                </p>

                <h3 style={styles.howItWorksSubtitle}>Política de 24h</h3>
                <p style={styles.howItWorksText}>
                  Fora desse período, só é possível responder usando templates — e isso abre uma nova conversa (com custo).
                </p>
              </div>

              {/* Seção final: Resumo */}
              <div style={styles.howItWorksSection}>
                <h2 style={styles.howItWorksTitle}>
                  <CheckCircle size={24} />
                  Resumo
                </h2>
                <p style={styles.howItWorksText}>
                  Usando a API oficial do WhatsApp, sua empresa envia e recebe mensagens dentro das regras da Meta, com segurança e alta taxa de entrega. A cobrança é feita por janela de 24h, e o valor varia conforme o tipo de conversa (suporte, marketing, autenticação ou iniciada pelo cliente). Fora do período de 24h, é preciso usar um modelo pré-aprovado para reabrir o contato.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botões de ajuda */}
        <div style={styles.clintButton}>
          <a 
            href="https://ajuda.clint.digital/pt-BR/articles/9854773-como-utilizar-o-whatsapp-oficial-na-clint" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.clintButtonLink}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            <MessageSquare size={20} />
            Como utilizar a API Oficial
          </a>
          
          <a 
            href="https://ajuda.clint.digital/pt-BR/articles/11155266-como-fazer-uma-campanha-de-whatsapp-oficial" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.clintButtonLink}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            <Users size={20} />
            Como realizar um disparo em massa
          </a>
        </div>
      </div>
    </div>
  );
}
