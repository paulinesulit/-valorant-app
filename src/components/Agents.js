import axios from "axios";
import { useEffect, useState } from "react";

const Agents = () => {
  const [allAgents, setAllAgents] = useState([]);
  const [userAgents, setUserAgents] = useState([]);
  const [randomAgent, setRandomAgent] = useState([]);

  // API call
  useEffect(() => {
    axios({
      url: "https://valorant-api.com/v1/agents",
      dataResponse: "json",
      method: "GET",
      params: {
        isPlayableCharacter: true,
      },
    })
      .then((res) => {
        setAllAgents(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Click to select characters use wants to randomize
  const addAgent = (agent) => {
    const agentObject = {
      name: agent.displayName,
      description: agent.description,
      photo: agent.fullPortrait,
    };

    setUserAgents((current) => [...current, agentObject]);
  };

  // Randomize agents selected
  const randomizeAgent = () => {
    const randomNum = Math.floor(Math.random() * userAgents.length);
    setRandomAgent(userAgents[randomNum]);
  };

  return (
    <div>
      <section>
        <h2>Agents here</h2>
        {allAgents.map((eachAgent) => {
          return (
            <div>
              <button
                onClick={() => {
                  addAgent(eachAgent);
                }}
              >
                {eachAgent.displayName}
              </button>
            </div>
          );
        })}
        <button
          class="randomBtn"
          onClick={() => {
            randomizeAgent();
          }}
        >
          Randomize
        </button>
        {console.log(randomAgent)}
        <p>{randomAgent.name}</p>
        <img src={randomAgent.photo} alt="photo of agent" />
      </section>
    </div>
  );
};

export default Agents;
