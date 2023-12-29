import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useAuth } from "../../auth/AuthContext";

const URI = "http://localhost:8000/subscription/";

const FormSubs = () => {
  const { token, login } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          login(storedToken); // Si hay un token en localStorage, actualiza el estado con ese token
        }
        if (!token) {
          console.error("No hay token de autenticación.");
          return;
        }
        const response = await axios.get(URI, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          const { subscription } = response.data.success;
          const { data } = response.data;
          const { fecha_subs } = data[0];

          // Calcula si ha pasado más de un mes desde la fecha de suscripción
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

          if (new Date(fecha_subs) < oneMonthAgo) {
            setSubscriptionStatus(0);
          } else {
            setSubscriptionStatus(subscription);
          }
        } else {
          console.error("Error al obtener el estado de la suscripción");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    getSubscriptionStatus();
  }, []); // La dependencia vacía asegura que este efecto solo se ejecute al montar el componente

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocusChange = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos de la tarjeta antes de enviar la solicitud al servidor
    if (!validateCardData()) {
      return;
    }

    try {
      const response = await axios.post(
        `${URI}subs`,
        {
          number: state.number,
          expiry: state.expiry,
          cvc: state.cvc,
          name: state.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Manejar la respuesta exitosa
        console.log("Suscripción exitosa");

        // Limpiar campos del formulario después de una suscripción exitosa
        setState({
          number: "",
          expiry: "",
          cvc: "",
          name: "",
          focus: "",
        });
      } else {
        // Manejar errores
        console.error("Error al procesar la suscripción");
      }
    } catch (error) {
      console.error("Error de red:", error);
      console.log("Server response:", error.response);
    }
  };

  const validateCardData = () => {
    // Validar el número de la tarjeta, la fecha de expiración y el cvc
    if (!/^\d{16}$/.test(state.number)) {
      setValidationError("Número de tarjeta inválido");
      return false;
    }

    if (!/^\d{4}$/.test(state.expiry)) {
      setValidationError("Fecha de expiración inválida");
      return false;
    }

    if (!/^\d{3,4}$/.test(state.cvc)) {
      setValidationError("CVC inválido");
      return false;
    }

    setValidationError(""); // Limpiar mensajes de error si la validación es exitosa
    return true;
  };

  return (
    <div className='container-fluid bg-image'>
      <div className='container col-12'>
        <h2 className='p-4 '>Subscripción</h2>
        <div className='card col-6'>
          <div className='card-body'>
            {subscriptionStatus === null ? (
              <p>La suscripción está inactiva.</p>
            ) : (
              <div className='mb-3'>
                <label htmlFor='paymentMethod' className='form-label'>
                  Método de Pago
                </label>
                <select id='tipo' className='form-select col'>
                  <option value='1'> ...</option>
                  <option value='2'> Tarjeta </option>
                </select>
              </div>
            )}
            <Link
              className='btn btn-outline-warning btn-sm me-4'
              to='/app/feed'>
              Atras
            </Link>
            <button
              type='submit'
              className='btn btn-outline-success btn-sm'
              onClick={handleSubmit}>
              Suscribirse
            </button>
          </div>
        </div>
        <div className='card col-6 p-3 mt-2'>
          <div>
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
            <form>
              <div className='form-group p-2'>
                <input
                  placeholder='Número de tarjeta'
                  type='text'
                  name='number'
                  id='number'
                  maxLength='16'
                  className='form-control'
                  onChange={handleInputChange}
                  onFocus={handleFocusChange}
                />
              </div>
              <div className='form-group p-2'>
                <input
                  placeholder='Nombre'
                  type='text'
                  name='name'
                  id='name'
                  maxLength='30'
                  className='form-control'
                  onChange={handleInputChange}
                  onFocus={handleFocusChange}
                />
              </div>
              <div className='row'>
                <div className='form-group p-2 col-md-6'>
                  <input
                    placeholder='Fecha de expiración'
                    type='text'
                    name='expiry'
                    id='expiry'
                    maxLength='4'
                    className='form-control'
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                  />
                </div>
                <div className='form-group p-2 col-md-6'>
                  <input
                    placeholder='cvc'
                    type='text'
                    name='cvc'
                    id='cvc'
                    maxLength='4'
                    className='form-control'
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubs;
