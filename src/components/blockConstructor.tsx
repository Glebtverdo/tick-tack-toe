import React from 'react';
import {circle, cross, blockWidth, blockHeigth} from "../utils/blockConstructorUtils"

function BlockConstructor(props: {type: string}) {
  return (
    <span style={{width: blockWidth, height: blockHeigth}} className="block-body">
      
    </span>
  );
}

export default BlockConstructor;