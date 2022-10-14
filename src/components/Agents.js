import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { conditionalExpression } from "@babel/types";

const Agents = () => {
  const [allAgents, setAllAgents] = useState([]);
  const [userAgents, setUserAgents] = useState([]);
  const [randomAgent, setRandomAgent] = useState([]);
  const [randomAllAgents, setRandomAllAgents] = useState([]);

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
      id: agent.uuid,
      name: agent.displayName,
      description: agent.description,
      photo: agent.fullPortrait,
    };
    setUserAgents((current) => [...current, agentObject]);
  };
  // Add a conditional that doesn't let user add duplicate

  // Randomize agents selected

  const randomizeAgent = () => {
    const randomNum = Math.floor(Math.random() * userAgents.length);
    setRandomAgent(userAgents[randomNum]);
  };

  // Randomize all agents if none are selected (randomAgent is empty)
  const randomizeAllAgents = () => {
    const randomNum = Math.floor(Math.random() * allAgents.length);
    setRandomAllAgents(allAgents[randomNum]);
  };

  // console.log(randomAllAgents);

  // add X to remove selected characters and clear all
  const removeAgent = (id) => {
    const newList = userAgents;
    newList.splice(id, 1);
    setUserAgents([...newList]);
  };

  return (
    <div>
      <main>
        <section className="allAgents">
          <h2>All Agents here</h2>
          {allAgents.map((eachAgent, index) => {
            return (
              <div key={index}>
                <button
                  onClick={() => {
                    addAgent(eachAgent);
                  }}
                >
                  {/* {addToList ? eachAgent.displayName : "✓"} */}
                  {/* {console.log(addToList, eachAgent.displayName)} */}
                  {/* {console.log(userAgents.name)} */}
                  {eachAgent.displayName}
                  {/* {console.log(userAgents)} */}
                </button>
              </div>
            );
          })}
          <button
            className="randomBtn"
            onClick={() => {
              randomizeAllAgents();
            }}
          >
            Randomize All
          </button>
        </section>

        <section className="selectedAgents">
          <h2>Selected Agents</h2>
          {userAgents.map((selectedAgents) => {
            return (
              <div key={selectedAgents.id} className="selectedAgents">
                <p>{selectedAgents.name}</p>
                <button onClick={() => removeAgent(selectedAgents.id)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            );
          })}

          <button
            className="randomBtn"
            onClick={() => {
              randomizeAgent();
            }}
          >
            Randomize
          </button>
        </section>

        <section>
          {randomAllAgents.length === 0 ? null : (
            <div>
              <p>{randomAllAgents.displayName}</p>
              <img src={randomAllAgents.fullPortrait} alt="photo of agent" />
            </div>
          )}
          {randomAgent.length === 0 ? null : (
            <div>
              <p>{randomAgent.name}</p>
              <img src={randomAgent.photo} alt="photo of agent" />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Agents;
