import React from "react";
//食材インプット
export const InputFoodstuff = (props) => {
  const {foodstuffText, onChangeFoodstuffText, onKeyPressAddFoodstuff, amountText, onChangeAmountText} = props;
  return(
    <div>  
      <input placeholder="材料名(Shift+Enter)"
      value={foodstuffText} onChange={onChangeFoodstuffText}
      onKeyPress={onKeyPressAddFoodstuff}/>
      <input placeholder="分量(Shift+Enter)"
      value={amountText} onChange={onChangeAmountText}
      onKeyPress={onKeyPressAddFoodstuff}></input>
    </div>  
  )
}