interface bracket{
    min:number,
    max:number,
    fixAmount:number,
    rate:number
}

interface brackets{
    [key:string]:Array<bracket>
}

interface ITaxRate {
    [key:string]:{country:string,brackets:brackets}
}

export const TaxRates:ITaxRate = {
    "AUS":{country:"Australia", brackets:{
        "2020-2021": [{ min:0, max:18200, fixAmount:0, rate:0 },{ min:18201, max:45000, fixAmount:0, rate:19},{ min:45001, max:120000, fixAmount:5092, rate:32.5},{ min:120001, max:180000, fixAmount:29467, rate:37 },{min:180001,max:Infinity,fixAmount:51667,rate:45}],
        "2019-2020": [{ min:0, max:18200, fixAmount:0, rate:0 },{ min:18201, max:37000, fixAmount:0, rate:19},{ min:37001, max:90000, fixAmount:3572, rate:32.5},{ min:90001, max:180000, fixAmount:20797, rate:37 },{min:180001,max:Infinity,fixAmount:54097,rate:45}],
        "2018-2019": [{ min:0, max:18200, fixAmount:0, rate:0 },{ min:18201, max:37000, fixAmount:0, rate:19},{ min:37001, max:90000, fixAmount:3572, rate:32.5},{ min:90001, max:180000, fixAmount:20797, rate:37 },{min:180001,max:Infinity,fixAmount:54097,rate:45}],
    },},
    "USA":{country:"America", brackets:{
        "2020-2021": [{ min:0, max:18200, fixAmount:0, rate:0 },{ min:18201, max:45000, fixAmount:0, rate:19},{ min:45001, max:120000, fixAmount:5092, rate:32.5},{ min:120001, max:180000, fixAmount:29467, rate:37 },{min:180001,max:Infinity,fixAmount:51667,rate:45}],
        "2019-2020": [{ min:0, max:18200, fixAmount:0, rate:0 },{ min:18201, max:37000, fixAmount:0, rate:19},{ min:37001, max:90000, fixAmount:3572, rate:32.5},{ min:90001, max:180000, fixAmount:20797, rate:37 },{min:180001,max:Infinity,fixAmount:54097,rate:45}],
    },},
}

export interface TaxItem{
    min:number,
    max:number,
    amount:number
}


export interface TaxResult{
    result:Array<TaxItem>;
    total:number
}

export const calculateTax = (amount:number, country:string, year:string):TaxResult =>{
    const taxRate = TaxRates[country];
    const brackets = taxRate.brackets[year];
    let result:TaxResult['result'] = [];
    let total = 0;
    for(let i = 0; i < brackets.length; i++){
        let taxAmount:number = 0; 
        if(amount > brackets[i].min && amount < brackets[i].max){
            taxAmount = (amount-brackets[i].min) * brackets[i].rate/100;
        }else if(amount < brackets[i].min){
            taxAmount = 0;
        }else if(amount > brackets[i].max){
            if(brackets[i].fixAmount!==0){
                taxAmount = brackets[i].fixAmount;
            }else{
                taxAmount = (brackets[i].max-brackets[i].min)*brackets[i].rate/100;
            }
            
        }
        console.log({
            taxAmount,
            min: brackets[i].min,
            max: brackets[i].max
        })
        result.push({min:brackets[i].min, max:brackets[i].max, amount:taxAmount });
        total += taxAmount;
    }
    return {
        result,
        total
    }
}