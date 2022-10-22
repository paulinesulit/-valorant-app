import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const AgentButtons = (props) => {
  const [isDisabled, setDisabled] = useState(false);

  const addAgent = () => {
    props.handleClick();
    setDisabled(true);
  };

  const remove = () => {
    props.removeClick();
    setDisabled(false);
  };

  return (
    <div className="agentBtns">
      <button onClick={addAgent} disabled={isDisabled} className="agentBtn">
        {props.object.displayName}
      </button>

      {isDisabled ? (
        <button onClick={remove} className="xBtn">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      ) : null}
    </div>
  );
};

export default AgentButtons;
