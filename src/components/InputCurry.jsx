import React from 'react';
//コンポーネント化(exportが必要)
export const InputCurry = (props) => {
    const { onChange, value } = props;
    return(
        <div className="curry-name-input-area">
        <input 
            placeholder="カレー名入力"
            onChange={onChange}
            value={value}
        /><br/>
        </div> 
    )
}