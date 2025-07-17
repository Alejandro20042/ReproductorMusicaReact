import './LoadingScreen.css'; 

const LoadingScreen = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-content">
        <p>Cargando contenido, por favor espera...</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
