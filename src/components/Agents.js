import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DisableButton from "./DisableButton";

const Agents = () => {
  const [allAgents, setAllAgents] = useState([]);
  const [userAgents, setUserAgents] = useState([]);
  const [randomAgent, setRandomAgent] = useState([]);
  const [isDisabled, setDisabled] = useState(false);

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
        // setDisabled(new Array(res.data.length).fill(false));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(isDisabled);

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
  // REMOVE DUPLICATES IN USER AGENTS - IT THROWS AN ERROR AND MESSES UP REMOVE BUTTON FUNCTIONALITY, POSSIBLY DUE TO HAVING THE SAME KEY

  // const object = (agent) => {
  //   userAgents.push(agent);
  //   console.log(userAgents.push(agent));
  // };

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
                {/* <button
                  onClick={() => {
                    addAgent(eachAgent);
                  }}
                  // disabled={isDisabled}
                >
                  {eachAgent.displayName}
                </button> */}
                <DisableButton object={eachAgent} />
                {/* {console.log(eachAgent)} */}
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
