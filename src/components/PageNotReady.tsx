const PageNotReady = () => {
  return (
    <div style={{
      height: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#eee',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#121212',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>¡Ups!</h1>
      <p style={{ fontSize: '24px', marginBottom: '10px' }}>
        Esta página aún no está lista.
      </p>
      <p style={{ fontSize: '18px', color: '#aaa' }}>
        Estamos trabajando para ofrecerte esta sección pronto.
      </p>
    </div>
  );
};

export default PageNotReady;
