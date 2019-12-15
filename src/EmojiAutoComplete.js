import React, { useRef, useEffect, useState } from "react";
import trix from "trix";
import "../node_modules/trix/dist/trix.css";
import Emojies from './emojies.js'
import './emoji.css'
import { position as poss, offset } from 'caret-pos';


const EmojiAutoComplete = props => {
    const [text,setText] = useState("hello");
    const [suggestions,setSuggestion] = useState(null);
    const [position,setPosition] = useState({
        left:null,
        top:null
    })
  const texteditor = useRef();




 


  const handleOnChange = e =>{
      
      const pos = poss(e.target); // { left: 15, top: 30, height: 20, pos: 15 }
      const off = offset(e.target);

      setPosition({...position,left:off.left,top:off.top})

      console.log(pos,off);

      const text = e.target.innerText
      const regex = /[^:]+$/g
      if(text.match(regex)){
        setSuggestion(Emojies.filter((element)=>{
            return element.name.startsWith(text.match(regex)[0])
        }))   
    }
    
      
  }

  const handlekeydown = (e) =>{
      console.log(e);
  }



  useEffect(() => {
      console.log(suggestions);
}, [suggestions]);
  useEffect(() => {
      texteditor.current.addEventListener('trix-change',handleOnChange);
      texteditor.current.addEventListener('keydown',handlekeydown);

  }, []);

  return (
      <React.Fragment>
    <form>
      <input id="x" type="hidden" value={text} name="content" />
      <trix-editor input="x" ref={texteditor}></trix-editor>
    </form>
    {suggestions && <div className="autocomplete" style={{position:'absolute',left:position.left,top:position.top}}>
{suggestions.map(data=><li>{data.name} {data.emoji}</li>)}
    </div>}
    <span id="ruler"></span>

    </React.Fragment>
  );
};
export default EmojiAutoComplete;
