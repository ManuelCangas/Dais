import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const URIpost = "http://localhost:8000/post";

const Calendario = () => {
  const [events, setEvents] = useState([]);

  const getPost = async () => {
    try {
      const response = await axios.get(URIpost);
      const postEvents = response.data.map((post) => ({
        title: post.titulo,
        start: new Date(post.fecha),
        end: new Date(post.fecha),
      }));
      setEvents(postEvents);
    } catch (error) {
      console.error("Error al capturar publicaciones:", error.message);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className='card col m-2'>
      <div className='card-body'>
        <h6 className='d-flex justify-content-center col'>Calendario</h6>
        <div style={{ height: 500 }}>
          <Calendar localizer={localizer} events={events} />
        </div>
      </div>
    </div>
  );
};

export default Calendario;
