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

        // Agrupar usuarios por rol y contar la cantidad
        const rolCounts = {
          Jugador: 0,
          Tienda: 0,
          Administrador: 0,
        };

        usuarios.forEach((usuario) => {
          const rolName = getRolName(usuario.usuario_rol);
          rolCounts[rolName]++;
        });

        // Convertir los resultados en arrays para Chart.js
        const labels = Object.keys(rolCounts);
        const data = Object.values(rolCounts);

        // Datos de ejemplo
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "Usuarios por Rol",
              data: data,
              backgroundColor: [
                "rgba(75,192,192,0.4)",
                "rgba(255,99,132,0.4)",
                "rgba(54, 162, 235, 0.4)",
              ],
              borderColor: [
                "rgba(75,192,192,1)",
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
              ],
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
          plugins: {
            legend: {
              display: true,
              position: "top",
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
      <canvas id='myChart' width='400' height='150'></canvas>
    </div>
  );
};

export default Dashadmin;
