import React, { useState } from "react";
import "./styles.css";
import { v4 as uuid } from 'uuid';
import imgg from "./images/DSC_0211.JPG"
import {InputCurry} from './components/InputCurry'
import {InputFoodstuff} from './components/InputFoodstuff'

export const App = () => {
  // 変数関数たち
  const [curryTitleText,setCurryTitleText] = useState([]);//カレータイトルテキスト
  const [curryTitle,setCurryTitle] = useState([]);//カレータイトル
  const [foodstuffText,setFoodstuffText] = useState([]);//食材テキスト
  const [amountText,setAmountText] = useState([]);
  const [foodstuffList, setFoodstuffList] = useState([]);//食材
  const [processText, setProcessText] = useState([]);//手順テキスト
  const [processList, setProcessList] = useState([]);//手順
  const [completeRecipe ,setCompleteRecipe] = useState([]);//レシピ完成

  const onChangeCurryTitleText = (event) => {setCurryTitleText(event.target.value)};//カレーテキスト(入力感知)

  const onChangeFoodstuffText = (event) => {setFoodstuffText(event.target.value)};//材料(入力感知)
  const onChangeAmountText = (event => {setAmountText(event.target.value)});//分量(入力感知)
  const onKeyPressAddFoodstuff = (event) => {
    if(event.shiftKey && event.code === "Enter"){
      if(foodstuffText === "" || amountText === "")return;
      const newFoodstuff = [...foodstuffList,
      {
        id: uuid(),
        foodstuffName:foodstuffText,
        amount:amountText
      }]
      setFoodstuffList(newFoodstuff);
      setFoodstuffText("");
      setAmountText("");
    }
  }
  // 食材リスト削除ボタン
  const onClickFoodTextDelete = (index) => {
    const newFoodstuff = [...foodstuffList];
    newFoodstuff.splice(index, 1);
    setFoodstuffList(newFoodstuff);
  }
  // 手順追加ボタン
  const onKeyPressProcess = (event) => {
    if (event.shiftKey && event.code === "Enter"){
      event.stopPropagation()//Enterボタン無効
      event.preventDefault()//Enterボタン無効(本来の使い方でないため改行が入るため無効にしている)
      if (processText === "")return;
      const newProcessList = [...processList,
        {
          id: uuid(),
          ProcessName: processText,
          num: processList.length + 1
        }];
      setProcessList(newProcessList);
      setProcessText("");

    }
  }

  const onChangeProcessText = (event) => {setProcessText(event.target.value)}

  // 編集ボタン
  const onClickprocessEdit = (processEdit) => {
    if (processText === '')return;
    processList.map((process) => {
      if (process.id === processEdit.id) {/*もしprocess.id === processEdit(編集ボタンを押したときに走る関数の引数)の時そのオブジェクトの一部の要素(ProcessName)を更新する*/
        setProcessList((process) => process.map((processObj) => (processObj.id === processEdit.id ? {id: process.id, ProcessName: processText, num: process.num} : processObj)));
        setProcessText('');
      }
    })
  }
  // 手順削除ボタン
  const onClickProcessDelete = (index) => {
    const newProcessList = [...processList];
    newProcessList.splice(index,1);
    setProcessList(newProcessList);
  }
  //レシピ完成ボタン
  const onClikCompleteRecipe = () => {
    if ( curryTitleText === '' || foodstuffList.length === 0 || processList.length === 0){
      alert('未入力ところがあります確認してください');
    }else{
      const newCompleteRecipe = [...completeRecipe,
        {
          id: uuid(),
          completeCurryTitle:curryTitleText,
          completeFoodstuffList: foodstuffList,
          completeProcessList: processList
        }]
        setCompleteRecipe(newCompleteRecipe);
        const newProcessList = [...processList];
        newProcessList.splice(0);
        setProcessList(newProcessList);
        const newFoodstuff = [...foodstuffList];
        newFoodstuff.splice(0);
        setFoodstuffList(newFoodstuff);
        setCurryTitleText('')
    }
      
    
  }


  // ここからリターンするところ
  return (
    <> 
      {/* 画像表示 */}
      <div><img src={imgg} height={500} width={500}/></div>

      {/* サイト名表示 */}
      <div>
        <p className="site-name">みんなのカレーライスの作り方講座</p>
      </div>

      <InputCurry onChange={onChangeCurryTitleText} value={curryTitleText}/>
      <div><p>食材入力</p></div>
      {/* <InputProcess processList={processList} onClickprocessEdit={onClickprocessEdit}  onClickProcessDelete={onClickProcessDelete}/> */}

      <InputFoodstuff foodstuffText={foodstuffText} onChangeFoodstuffText={onChangeFoodstuffText} onKeyPressAddFoodstuff={onKeyPressAddFoodstuff} amountText={amountText} onChangeAmountText={onChangeAmountText}  />
      
       

      
      
    {/* 食材リスト表示 */}
      <div>
        <p>食材リスト</p>
        <ul>
          {foodstuffList.map((foodstuff, index) => {
            return(
              <div key={foodstuff.id}>
                <li>{foodstuff.foodstuffName}   {foodstuff.amount}<button onClick={() => onClickFoodTextDelete(index)}>削除</button></li>
              </div>
            );
          })}
        </ul>
      </div>
      {/* 手順インプット */}
      <div>
        <textarea placeholder="手順(Shift+Enter)" onKeyPress={onKeyPressProcess} value={processText} onChange={onChangeProcessText}/>
      </div>
      {/* 手順リスト表示 */}
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
      
      {/* レシピ完成後表示画面 */}
      <div><button onClick={onClikCompleteRecipe}>レシピ完成</button></div>
      {completeRecipe.map((completeRecipe) => {
        return(
          <div key={completeRecipe.id}>
            <h1>{completeRecipe.completeCurryTitle}</h1>
            {/* ↓材料一覧表示(テーブル)あとで考える */}
            <table>
              <tr><th>材料名</th><th>分量</th></tr>
              {completeRecipe.completeFoodstuffList.map((foodstuff) => {
                return(
                  <tr><td>{foodstuff.foodstuffName}</td><td>{foodstuff.amount}</td></tr>
                )
              })}
              <tr><th>手順</th><th>作り方</th></tr>
              {completeRecipe.completeProcessList.map((process) => {
                return(
                  <tr><td>{process.num}</td><td>{process.ProcessName}</td></tr>
                )
              })}
          </table>
          </div>
        )
      })}
    </>
  );
}