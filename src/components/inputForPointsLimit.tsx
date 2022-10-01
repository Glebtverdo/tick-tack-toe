import React, {useRef} from 'react';


export default function InputForPointsLimit(props: {callback: (pointsToWin: number) => void}) {
  const bufferForInput = useRef<number>()

  const setBufferForInput = (e: unknown) => {
      const input = (e as Event).target as HTMLInputElement
      bufferForInput.current = parseInt(input.value ?? "0")
    }
  const submit = () => {
      if(bufferForInput.current && bufferForInput.current > 2 && bufferForInput.current <= 100)
        props.callback(bufferForInput.current)
  }
  
  return ( <div className='input-container'>
    <h3 className="input-title">Write how musch point you need to  min = 3 max = 100 </h3>
    <span>
      <input className='input-for-points' onChange={setBufferForInput} /> 
      <button className='btn-submit'
        onClick={submit}>Submit 
      </button>
    </span>
  </div>)
}