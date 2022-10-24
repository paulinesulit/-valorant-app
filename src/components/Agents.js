import axios from "axios";
import { useEffect, useState } from "react";
import AgentButtons from "./AgentButtons";

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Click to select characters use wants to randomize
  const addAgent = (agent) => {
    const agentObject = {
      uuid: agent.uuid,
      displayName: agent.displayName,
      fullPortrait: agent.fullPortrait,
    };
    setUserAgents((current) => [...current, agentObject]);
  };

  // Randomize agents selected
  const randomizeAgent = () => {
    const randomNum = Math.floor(Math.random() * userAgents.length);
    setRandomAgent(userAgents[randomNum]);
  };

  // Randomize all agents
  const randomizeAllAgents = () => {
    const randomNum = Math.floor(Math.random() * allAgents.length);
    setRandomAgent(allAgents[randomNum]);
  };

  // add X to remove selected characters
  const removeAgent = (id) => {
    const newList = userAgents.filter((e) => {
      return e.displayName !== id.displayName
    });
    setUserAgents(newList);
  };

  return (
    <div className="wrapper">
      <main>
        <section className="allAgents">
          {allAgents.map((eachAgent, index) => {
            return (
              <div key={index}>
                <AgentButtons
                  object={eachAgent}
                  selected={userAgents}
                  handleClick={() => {
                    addAgent(eachAgent);
                  }}
                  removeClick={() => {
                    removeAgent(eachAgent);
                  }}
                />
              </div>
            );
          })}
          <div className="randomizeBtns">
            <button
              className="randomAll"
              onClick={() => {
                randomizeAllAgents();
              }}
            >
              Randomize All Agents
            </button>
            <button
              className="randomSelected"
              onClick={() => {
                randomizeAgent();
              }}
              disabled={userAgents.length === 0 ? true : false}
            >
              Randomize Selected Agents
            </button>
          </div>
        </section>

        <section className="agentContainer">
          {randomAgent.length === 0 ? null : (
            <div className="randomAgent">
              <h2>{randomAgent.displayName}</h2>
              <img src={randomAgent.fullPortrait} alt="agent" />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};;;

export default Agents;
