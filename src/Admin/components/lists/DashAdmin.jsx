import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const Dashadmin = () => {
  const URL = "http://localhost:8000/usuario";

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de usuarios desde el servidor
        const response = await axios.get(URL);
        const usuarios = response.data;

        // Crear un array de nombres de rol y contar cuántos hay
        const labels = usuarios.map((usuario) =>
          getRolName(usuario.usuario_rol)
        );
        const data = usuarios.map(() => 1);

        // Datos de ejemplo
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "Usuarios por Rol",
              data: data,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        };

        // Configuración del gráfico
        const options = {
          scales: {
            x: {
              type: "category",
              position: "bottom",
            },
            y: {
              beginAtZero: true,
              precision: 0,
            },
          },
        };

        // Crear el gráfico
        const ctx = document.getElementById("myChart");
        const myChart = new Chart(ctx, {
          type: "bar", // Cambiado a horizontalBar
          data: chartData,
          options: options,
        });

        // Actualizar el estado del gráfico
        setChartData(myChart);
      } catch (error) {
        console.error("Error al obtener datos de usuarios:", error);
      }
    };

    // Llamada a la función para obtener datos y renderizar el gráfico
    fetchData();

    // Limpieza al desmontar el componente
    return () => {
      if (chartData) {
        chartData.destroy();
      }
    };
  }, []); // Solo se ejecuta en el montaje

  // Función para obtener el nombre del rol
  const getRolName = (rol) => {
    switch (rol) {
      case 1:
        return "Jugador";
      case 2:
        return "Tienda";
      case 3:
        return "Administrador";
    }
  };

  return (
    <div className='card p-3 m-2'>
      <canvas id='myChart' width='400' height='200'></canvas>
    </div>
  );
};

export default Dashadmin;
