import React, { useState, useEffect } from "react";

export default function Yarn() {
  const [yarnData, setYarns] = useState([]);
  const [isEditing, setEditing] = useState({});

  useEffect(() => {
    async function fetchYarns() {
      const res = await fetch("/api/yarns");
      const yarns = await res.json();
      setYarns(yarns);
    }
    fetchYarns();
  }, []);

  async function submitYarn(event) {
    event.preventDefault();
    console.log(event);
    const newYarn = {
      name: event.target.name.value,
      brand: event.target.brand.value,
      fibers: event.target.fibers.value,
      weight: event.target.weight.value
    };

    const url = "/api/yarns";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newYarn)
    });
    const yarn = await res.json();
    setYarns([...yarnData, yarn]);
  }

  function editYarn(id) {
    setEditing({ ...isEditing, [id]: !isEditing[id] });
  }

  async function updateYarn(event, id) {
    event.preventDefault();
    setEditing({ ...isEditing, [id]: !isEditing[id] });
    console.log(event);
    const updatedYarn = {
      name: event.target.name.value,
      brand: event.target.brand.value,
      fibers: event.target.fibers.value,
      weight: event.target.weight.value
    };

    const url = `/api/yarns/${id}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedYarn)
    });
    const yarn = await res.json();
    console.log(yarn);

    setYarns(
      yarnData.map(item => {
        if (item.id !== id) {
          return item;
        } else {
          return yarn;
        }
      })
    );
  }

  const yarnList = yarnData.map((item, index) => {
    if (!isEditing[item.id]) {
      return (
        <li key={index}>
          <h2>{item.name}</h2>{" "}
          <button onClick={() => editYarn(item.id)}>Edit</button>
          <button>Delete</button>
          <ul>
            <li>{item.brand}</li>
            <li>{item.weight}</li>
            <li>{item.fibers}</li>
          </ul>
        </li>
      );
    } else {
      return (
        <form onSubmit={event => updateYarn(event, item.id)}>
          <li key={index}>
            <input type="text" id="name" defaultValue={item.name}></input>
            <button>Delete</button>
            <ul>
              <li>
                <input type="text" id="brand" defaultValue={item.brand}></input>
              </li>
              <li>
                <input
                  type="text"
                  id="weight"
                  defaultValue={item.weight}
                ></input>
              </li>
              <li>
                <input
                  type="text"
                  id="fibers"
                  defaultValue={item.fibers}
                ></input>
              </li>
            </ul>
            <button>Submit</button>
          </li>
        </form>
      );
    }
  });

  return (
    <div>
      <ul>{yarnList}</ul>
      <form onSubmit={submitYarn}>
        <h3>Add yarn</h3>
        <label htmlFor="name">Yarn name</label>
        <input type="text" id="name"></input>
        <label htmlFor="brand">Brand</label>
        <input type="text" id="brand"></input>
        <label htmlFor="weight">Weight</label>
        <input type="text" id="weight"></input>
        <label htmlFor="fibers">Fibers</label>
        <input type="text" id="fibers"></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}
