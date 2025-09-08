export const Header = ({ heading }) => (
  <header style={{
    textAlign: 'center',
    marginBottom: '2rem'
  }}>
    <div style={{
      marginBottom: '1.5rem',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    }}>
      <h2 style={{
        margin: 0,
        fontSize: '18px',
        color: '#64748b',
        fontWeight: '500'
      }}>
        Next.js 15 <small style={{ color: '#94a3b8' }}>(App Router)</small> + i18next
      </h2>
    </div>
    
    <h1 style={{
      margin: '0 0 1rem 0',
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#1e293b',
      lineHeight: '1.2'
    }}>
      {heading}
    </h1>
  </header>
)
