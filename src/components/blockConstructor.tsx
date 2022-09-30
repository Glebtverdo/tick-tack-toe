import React from 'react';
import {blockWidth, blockHeigth} from "../utils/blockConstructorUtils"
import {ReactComponent as Circle} from "../SVGs/circle.svg"
import {ReactComponent as Cross} from "../SVGs/cross.svg"
function BlockConstructor(props: {type: string, callback?: () => void}) {

  const clickHandler = () => {
    if(props.type === "empty" && props.callback)
      props.callback()
  }

  return (
    <div style={{width: blockWidth, height: blockHeigth}} className="block-body" onClick={clickHandler}>
      {props.type === "cross" && <Cross />}
      {props.type === "circle" && <Circle />}
    </div>
  );
}

export default BlockConstructor;