import React, { useEffect, useMemo, useState } from 'react';
import socketio from 'socket.io-client';

import api from '../../services/api';
import "./styles.css";

import background from '../../assets/background.jpeg';

function Dashboard({ history }) {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem("user");

  const socket = useMemo(() => socketio("http://localhost:3333", {
    query: { user_id },
  }), [user_id]);

  useEffect(() => {
    socket.on("booking_request", data => {
      setRequests([...requests, data]);
    })
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots(){
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, [])

  async function handleAccept(id){
    await api.post(`/bookings/${id}/approvals`);

    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id){
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <div className="box">
      <div className="notification">
        {requests.map(request => (
          <>
            <p>{request.user.email} está soliciando uma reserva em <strong>{request.spot.company}</strong> para dia <strong>{request.date}</strong></p>
            <button className="accept" onClick={() => handleAccept(request._id)}>Accept</button>
            <button className="decline" onClick={() => handleReject(request._id)}>Decline</button>
          </>
        ))}
      </div>
      <div className="list">
        {spots.map(spot => (
          <div className="list-item">
            <img src={spot.thumbnail_url}/>
            <h2>{spot.company}</h2>
            <p>{spot.price ? `R$ ${spot.price}/dia` : "Gratuito"}</p>
          </div>
        ))}
      </div>
      <button className="new-button" onClick={() => history.push("new")}>New Spot</button>
    </div>
  );
}

export default Dashboard;