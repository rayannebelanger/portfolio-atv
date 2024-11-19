import foto from "./assets/foto.png"; 
const About = () => {
  return (
    <div className="about">
      <h2>Sobre Mim</h2>
      <div className="about-content">
        <img src={foto} alt="Minha foto" className="about-photo" />
        <p>
          Olá! Meu nome é Rayanne, tenho 21 anos e sou apaixonada por programação. Tenho experiência
          com suporte técnico, desenvolvimento web e sempre estou aprendendo algo novo na área de TI.
        </p>
      </div>
    </div>
  );
};

export default About;