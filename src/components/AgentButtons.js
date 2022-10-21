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
    <div>
      <button onClick={addAgent} disabled={isDisabled}>
        {props.object.displayName}
      </button>

      {/* {console.log(props.object)} */}

      {isDisabled ? (
        <button onClick={remove}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      ) : null}
    </div>
  );
};

export default AgentButtons;
