import React, { useMemo, useState } from 'react';

import "./styles.css"
import api from '../../services/api';

import camera from '../../assets/camera.svg'

function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(event){
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await api.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/dashboard");
  }

  return (
    <form className="new-spot" onSubmit={handleSubmit}>
      <div className="form-input">
        <label>Photo</label>
        <input 
          type="file" 
          className="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
      </div>
      <div className="form-input">
        <label>Company</label>
        <input 
          type="text" 
          placeholder="Name of your company" 
          className="input-text"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>
      <div className="form-input">
        <label>Techs</label>
        <input 
          type="text" 
          placeholder="Tecnologies" 
          className="input-text"
          value={techs}
          onChange={(event) => setTechs(event.target.value)}
        />
      </div>
      <div className="form-input">
        <label>Price</label>
        <input 
          type="text" 
          placeholder="Price per day" 
          className="input-text"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <button type="submit">Sign new Spot</button>
    </form>
  );
}

export default New;