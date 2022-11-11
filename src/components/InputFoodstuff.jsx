import React from "react";

export const InputFoodstuff = (props) => {
    const {processList,onClickprocessEdit, onClickProcessDelete} = props;
  <div>
    <ul>
      {processList.map((process,index) => {
        return(
          <div key={process.id}>
            <p>手順{index+1}</p>
            <p>{process.ProcessName}</p>
            <button onClick={() => onClickprocessEdit(process)}>手順{index+1}を変更</button>
            <button onClick={() => onClickProcessDelete(index)}>削除</button>
          </div>
        )
      })}
    </ul>
  </div>
}