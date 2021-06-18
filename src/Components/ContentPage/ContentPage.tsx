import React from "react";

interface Props{
    isResult:boolean,
    children?:JSX.Element;
}
const ContentPage = ({isResult, children}:Props) => {
  
  return (
    <div className="contentContainer">
        <div className={`logoMessage  ${!isResult? "doDisplay":"nonDisplay"} `}>
                <div className="title"> Tax-o-tron</div>
                <div className="text">The free and simple online tax calculator</div>
        </div>
            
        <div className={`imageBody ${isResult? "leftContent":""}`}>
            {isResult && children}
            <div className="fadingCircle">
                <div id="circle"></div>
            </div>
        </div>
    </div>
  );
}

export default ContentPage;
