import React, { useState , useCallback , useReducer, useRef} from 'react';
import produce from 'immer';

const numR = 30;
const numC = 30;
const actions = [[0,1],[0,-1],[1,-1],[-1,1],[1,1],[-1,-1],[1,0],[-1,0]];
const genBlankBoard = () => {
  const rows = [];
  for(let i = 0; i < numR; i ++){
    rows.push(Array.from(Array(numC), () => 0 ));
  }
  return rows;
}

function Game() {
  const [board, setBoard] = useState(()=>{
    return genBlankBoard();
  });

  const [act, setAct] = useState(false);
  const actRef = useRef(act);


  const simulate = useCallback(()=> {
     if(!actRef.current){
       return;
     };
  
     setBoard(base => {
       // current Board
       return produce(base, draft => {
        for(let i = 0; i < numR; i++){
          for(let j = 0; j <numC; j++){
            // compute the number of neighbors it has
            let neighbors = 0;
            actions.forEach(([x,y])=> {
              const newI = i + x;
              const newJ = j + y;
              // check make sure we should not
              if(newI >= 0 && newI <numR && newJ >=0 && newJ < numC){
                neighbors += base[newI][newJ]
              }
            })
            // rules
            if(neighbors < 2 || neighbors > 3){
              draft[i][j] = 0;
            } else if(base[i][j] === 0 && neighbors ===3){
              draft[i][j] = 1;
            }
          }
        }
       });
    
      });
     setTimeout(simulate, 100);
   },[]);

  return(
    <div>
    <button onClick={()=> {
      if(!act){
        actRef.current = true;
        simulate();
      }
    }}
      >
        Play
      </button>
      <button onClick={()=> {
        setAct(act);
        actRef.current = false;
    }}
      >
       Pause
      </button>
      <button onClick={()=>{
        const rows = [];
        for(let i = 0; i < numR; i ++){
          rows.push(Array.from(Array(numC), () => Math.random() > .7 ? 1: 0));
        }
        setBoard(rows);        

      }}>Step</button>

    <button onClick={()=> {
      setBoard(genBlankBoard());
    }}>Reset</button>
    
    <div
        style= {{
          display:"grid",
          gridTemplateColumns: `repeat(${numC}, 20px)`
        }}>

      {board.map((rows, i) =>
         rows.map((col, j) =>
          <div 
            key={`${i}-${j}`}
            onClick={() => {
              const newBoard = produce(board, draft => {
                draft[i][j] = board[i][j] ? 0 : 1;
              })
              setBoard(newBoard);
            }}
            style={{ 
              width:20, 
              height:20, 
              backgroundColor: board[i][j] ? "lightblue" : undefined,
              border: "solid 1px black"
          }}
        />
         ))
        }
    </div>
    </div>
  );
}

export default Game;
