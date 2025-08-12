import React from 'react';
import { Zap, CheckCircle, Shield, Handshake, BookOpen, AlertTriangle, Clock, Users, MessageSquare, Target, Key, Headphones } from 'lucide-react';

const WhatsAppCategoriesGuide = () => {
  const categories = [
    {
      id: 'marketing',
      title: 'Marketing',
      icon: <Zap size={24} />,
      description: 'Categoria destinada a campanhas promocionais e ações de marketing para divulgar produtos, serviços e ofertas especiais.',
      useCases: [
        'Promoções e ofertas especiais com desconto',
        'Lançamentos de novos produtos ou serviços',
        'Campanhas sazonais (Black Friday, Natal, etc.)',
        'Newsletters promocionais com novidades',
        'Eventos, webinars e workshops',
        'Programas de fidelidade e recompensas',
        'Anúncios de liquidações e queima de estoque',
        'Convites para eventos corporativos'
      ],
      restrictions: [
        'Deve incluir opção clara de cancelamento de inscrição',
        'Envio permitido apenas entre 8h e 20h (horário local)',
        'Template deve ser pré-aprovado pelo WhatsApp',
        'Não pode ser usado para transações financeiras',
        'Conteúdo deve ser verdadeiro e não enganoso',
        'Não pode conter spam ou conteúdo inadequado',
        'Deve respeitar as políticas de privacidade'
      ]
    },
    {
      id: 'utility',
      title: 'Utilidade',
      icon: <CheckCircle size={24} />,
      description: 'Categoria para enviar informações úteis e atualizações importantes sobre produtos, serviços ou conta do cliente.',
      useCases: [
        'Confirmações de pedidos e compras',
        'Atualizações de status de entrega',
        'Lembretes de compromissos e agendamentos',
        'Informações sobre conta e perfil',
        'Notificações de sistema e manutenção',
        'Avisos sobre mudanças de política',
        'Confirmações de reservas e bookings',
        'Atualizações sobre serviços contratados',
        'Lembretes de pagamentos e vencimentos',
        'Informações sobre garantias e suporte'
      ],
      restrictions: [
        'Conteúdo deve ser puramente informativo',
        'Não pode conter elementos promocionais',
        'Informação deve ser relevante para o usuário',
        'Template deve ser claro e objetivo',
        'Não pode ser usado para marketing',
        'Deve focar em benefício direto ao cliente'
      ]
    },
    {
      id: 'authentication',
      title: 'Autenticação',
      icon: <Shield size={24} />,
      description: 'Categoria específica para códigos de verificação, confirmações de segurança e processos de autenticação.',
      useCases: [
        'Códigos de verificação (OTP) para login',
        'Confirmação de acesso em nova conta',
        'Recuperação de senha e reset de conta',
        'Verificação de identidade em transações',
        'Autenticação em duas etapas (2FA)',
        'Confirmação de alterações de dados',
        'Códigos de ativação de serviços',
        'Verificação de dispositivos novos',
        'Códigos de acesso temporários',
        'Confirmação de operações sensíveis'
      ],
      restrictions: [
        'Apenas códigos numéricos são permitidos',
        'Tempo de expiração deve ser claramente informado',
        'Não pode conter links externos',
        'Template deve ser simples e direto',
        'Não pode incluir conteúdo promocional',
        'Deve incluir aviso de segurança',
        'Código deve ser único e não reutilizável'
      ]
    },
    {
      id: 'service',
      title: 'Serviço ao Cliente',
      icon: <Handshake size={24} />,
      description: 'Categoria para suporte ao cliente, atendimento personalizado e resolução de problemas e solicitações.',
      useCases: [
        'Suporte técnico e resolução de problemas',
        'Agendamento de consultas e atendimentos',
        'Acompanhamento de solicitações de suporte',
        'Atendimento personalizado e consultoria',
        'Resolução de reclamações e dúvidas',
        'Orientações sobre produtos e serviços',
        'Agendamento de manutenções e visitas',
        'Solicitações de orçamentos e propostas',
        'Acompanhamento de processos e status',
        'Atendimento pós-venda e garantia'
      ],
      restrictions: [
        'Foco deve ser no atendimento ao cliente',
        'Pode incluir links de suporte e ajuda',
        'Tom deve ser profissional e cordial',
        'Template deve facilitar o contato',
        'Não pode ser usado para marketing',
        'Deve priorizar a resolução do problema',
        'Informações de contato devem estar claras'
      ]
    }
  ];

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      color: '#1f2937',
      backgroundColor: '#ffffff',
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
      padding: '2rem',
      backgroundColor: '#f8fafc',
      borderRadius: '1rem',
      border: '1px solid #e2e8f0',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#64748b',
      lineHeight: '1.6',
      maxWidth: '800px',
      margin: '0 auto',
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
      marginTop: '2rem',
    },
    categoryCard: {
      backgroundColor: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #f1f5f9',
    },
    categoryIcon: {
      color: '#3b82f6',
      backgroundColor: '#eff6ff',
      padding: '0.75rem',
      borderRadius: '0.5rem',
    },
    categoryTitle: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: 0,
    },
    categoryDescription: {
      fontSize: '1.125rem',
      color: '#475569',
      lineHeight: '1.6',
      marginBottom: '2rem',
      fontStyle: 'italic',
    },
    section: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      padding: '0.75rem 0',
      borderBottom: '1px solid #f1f5f9',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      fontSize: '1rem',
      color: '#475569',
      lineHeight: '1.5',
    },
    listItemBullet: {
      color: '#3b82f6',
      fontWeight: 'bold',
      marginTop: '0.125rem',
      flexShrink: 0,
    },
    warningSection: {
      backgroundColor: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginTop: '3rem',
    },
    warningTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#92400e',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    warningText: {
      color: '#92400e',
      lineHeight: '1.6',
      marginBottom: '0.5rem',
    },
    infoSection: {
      backgroundColor: '#eff6ff',
      border: '1px solid #3b82f6',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginTop: '2rem',
    },
    infoTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1e40af',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    infoText: {
      color: '#1e40af',
      lineHeight: '1.6',
      marginBottom: '0.5rem',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <BookOpen size={32} />
          Guia Completo das Categorias do WhatsApp Business
        </h1>
        <p style={styles.subtitle}>
          Entenda como escolher a categoria correta para seus templates de mensagem e maximize 
          a eficiência da sua comunicação com clientes através da API oficial do WhatsApp Business.
        </p>
      </div>

      <div style={styles.categoriesGrid}>
        {categories.map((category) => (
          <div key={category.id} style={styles.categoryCard}>
            <div style={styles.categoryHeader}>
              <div style={styles.categoryIcon}>
                {category.icon}
              </div>
              <h2 style={styles.categoryTitle}>{category.title}</h2>
            </div>
            
            <p style={styles.categoryDescription}>
              {category.description}
            </p>
            
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <Target size={20} />
                Casos de Uso Comuns
              </h3>
              <ul style={styles.list}>
                {category.useCases.map((useCase, index) => (
                  <li key={index} style={styles.listItem}>
                    <span style={styles.listItemBullet}>•</span>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <AlertTriangle size={20} />
                Restrições e Boas Práticas
              </h3>
              <ul style={styles.list}>
                {category.restrictions.map((restriction, index) => (
                  <li key={index} style={styles.listItem}>
                    <span style={styles.listItemBullet}>•</span>
                    {restriction}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.warningSection}>
        <h3 style={styles.warningTitle}>
          <Clock size={20} />
          Processo de Aprovação
        </h3>
        <p style={styles.warningText}>
          <strong>Importante:</strong> Todos os templates devem ser pré-aprovados pelo WhatsApp antes de serem utilizados. 
          O processo de aprovação pode levar de 24 horas a alguns dias úteis.
        </p>
        <p style={styles.warningText}>
          <strong>Dica:</strong> Mantenha seus templates simples, claros e alinhados com as políticas do WhatsApp 
          para acelerar o processo de aprovação.
        </p>
      </div>

      <div style={styles.infoSection}>
        <h3 style={styles.infoTitle}>
          <Users size={20} />
          Como Escolher a Categoria Correta
        </h3>
        <p style={styles.infoText}>
          <strong>Marketing:</strong> Use quando quiser promover produtos, ofertas ou campanhas promocionais.
        </p>
        <p style={styles.infoText}>
          <strong>Utilidade:</strong> Use para informar sobre status de pedidos, confirmações e atualizações importantes.
        </p>
        <p style={styles.infoText}>
          <strong>Autenticação:</strong> Use exclusivamente para códigos de verificação e processos de segurança.
        </p>
        <p style={styles.infoText}>
          <strong>Serviço ao Cliente:</strong> Use para suporte, atendimento e resolução de problemas dos clientes.
        </p>
      </div>
    </div>
  );
};

export default WhatsAppCategoriesGuide;
