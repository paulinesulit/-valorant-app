import { useState } from "react";

const DisableButton = (props) => {
  const [userAgents, setUserAgents] = useState([]);
  const [isDisabled, setDisabled] = useState(false);

  const addAgent = (agent) => {
    const agentObject = {
      uuid: agent.object.uuid,
      displayName: agent.object.displayName,
      fullPortrait: agent.object.fullPortrait,
    };
    // console.log(agent);
    setUserAgents((current) => [...current, agentObject]);
    setDisabled(true);
  };

  return (
    <div>
      <button
        onClick={() => {
          addAgent(props);
        }}
        disabled={isDisabled}
      >
        {props.object.displayName}
      </button>
    </div>
  );
};

export default DisableButton;
