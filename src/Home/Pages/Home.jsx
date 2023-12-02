import React from "react";
import "../Landing.css";

function Home() {
  return (
    <main>
      <section className='bg-image d-flex align-content-around flex-wrap container-fluid'>
        <h1 className='ms-5 w-25 font-monospace '>Bienvenido a Dais</h1>
        <a
          className='badge text-bg-primary btn-unir d-flex rounded-5 '
          href='#'>
          Conseguir app
          <i className='bi bi-google-play ps-3'></i>
        </a>
      </section>
      <div className='container-fluid'>
        <div className='row'>
          <section className='community-section bg-success bg-opacity-25 d-flex flex-wrap shadow col-8'>
            <h1 className='community-title bg-opacity-25'>
              Bienvenido a tu red de juegos de mesa
            </h1>
            <p className='text-center fs-5'>
              Somos una plataforma para llevar los eventos y torneos de tus
              juegos favoritos en donde estés, con los diferentes espacios y
              tiendas disponibles en la aplicación, reuniendote con otros
              jugadores y compartiendo con una gran comunidad
            </p>
          </section>
          <div className='icon-image col-4'></div>
        </div>
        <div className='row justify-content-end'>
          <section className='tienda-section bg-success bg-opacity-25 d-flex flex-wrap shadow'>
            <h1 className='tienda-title'>
              Gestiona tus eventos & participa a los eventos de tus tiendas
              favoritas
            </h1>
            <p className='text-center fs-5'>
              Dentro de la plataforma de Dais puedes seas un jugador o una
              tienda, te ayudamos a concretar tus juntas y gestionar tus eventos
              dentro de la platafroma para la comunidad, los jugadores podrán
              asistir y enterarse de todo lo que sucede dentro de la plataforma
              mediante sus intereses, obteniendo jugozos descuentos para sus
              juegos favoritos.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Home;
