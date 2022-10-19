import { useState } from "react";

const AgentButtons = (props) => {
  const [isDisabled, setDisabled] = useState(false);

  const addAgent = () => {
    props.handleClick();
    setDisabled(true);
    // props.selected.map((each) => {
    //   // console.log(each.uuid);
    //   // console.log(props.object.uuid);
    //   if (each.uuid === props.object.uuid) {
    //     console.log(each.uuid, "yes");
    //     setDisabled(false);
    //   } else {
    //     setDisabled(true);
    //   }
    // });

    // props.selected.map((each) => {
    //   // console.log(each.uuid);
    //   // console.log(props.object.uuid);
    //   if (each.uuid !== props.object.uuid) {
    //     console.log(each.uuid, "yes");
    //     setDisabled(true);
    //   }
    // });
  };

  // console.log(props);

  return (
    <div>
      <button onClick={addAgent} disabled={isDisabled}>
        {props.object.displayName}
      </button>
      {/* {console.log(props.object)} */}
    </div>
  );
};

export default AgentButtons;
