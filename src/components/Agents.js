import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
    // console.log(agent);
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
    const newList = userAgents;
    newList.splice(id, 1);
    // newList.slice(id);
    console.log(id);
    // deletes first index character, not the character being clicked, FIXXX!!
    setUserAgents([...newList]);
  };

  // clear all selected characters
  const resetList = (id) => {
    const newList = userAgents;
    newList.splice(id, userAgents.length);
    setUserAgents([...newList]);
  };

  return (
    <div className="wrapper">
      <main>
        <section className="allAgents">
          <h2>All Agents here</h2>
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
                {/* {console.log(userAgents)} */}
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
          <button
            className="randomBtn"
            onClick={() => {
              randomizeAgent();
            }}
          >
            Randomize Selected Agents
          </button>
        </section>

        <section>
          <h2>Selected Agents</h2>
          {userAgents.map((selectedAgents) => {
            return (
              <div key={selectedAgents.uuid} className="selectedAgents">
                <p>{selectedAgents.displayName}</p>
                {/* {console.log(selectedAgents)} */}
              </div>
            );
          })}
        </section>

        <section className="selectedAgents">
          <h2>Selected Agents</h2>
          {userAgents.map((selectedAgents) => {
            return (
              <div key={selectedAgents.uuid} className="selectedAgents">
                <p>{selectedAgents.displayName}</p>
                {/* {console.log(selectedAgents)} */}
                <button onClick={() => removeAgent(selectedAgents.id)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            );
          })}

          {userAgents.length === 0 ? null : (
            <button onClick={() => resetList(userAgents.id)}>
              Clear All Selected Agents
            </button>
          )}

          <button
            className="randomBtn"
            onClick={() => {
              randomizeAgent();
            }}
          >
            Randomize Selected Agents
          </button>
        </section>

        <section>
          {randomAgent.length === 0 ? null : (
            <div className="randomAgent">
              <p>{randomAgent.displayName}</p>
              <img src={randomAgent.fullPortrait} alt="agent" />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};;

export default Agents;
