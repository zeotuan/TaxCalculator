import React, {useState} from 'react';
import CalculateTaxForm, { TaxFormValue }  from 'Components/CalculateTax/CalculateTax';
import ContentPage from 'Components/ContentPage/ContentPage';
import { calculateTax ,TaxResult as ITaxResult} from 'utils/CalculateTax';
import TaxResult from 'Components/TaxResult/TaxResult';

function App() {
  const [disable,setDisable] = useState<boolean>(false);
  const [Result,setResult] = useState<ITaxResult>();
  const onSubmit = (values:TaxFormValue) =>{
    console.log(values);
    setResult(calculateTax(values.totalTaxableIncome,values.country,values.incomeYear));
    setDisable(true);
  }

  const goPrev = (values:boolean) =>{
    setDisable(values);
  }

  return (
        <div className="mainContainer">
          
          {/* {disable?<CalculateTaxForm onSubmit={onSubmit} disable={disable}/>:<ContentPage isResult={disable} />} */}
          <ContentPage isResult={disable} children={<TaxResult result={Result && Result.result} total={Result && Result.total}/>}/>
          < CalculateTaxForm onSubmit={onSubmit} setDisable={goPrev} disable={disable}/>
          
        </div> 
  );
}

export default App;
