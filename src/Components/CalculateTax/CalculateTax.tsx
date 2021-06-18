import React  from 'react';
import {Field, Formik, Form} from 'formik';
import * as yup from 'yup';
import {TextField,SelectField,Option} from '../FormField';
import {Button, Message, Icon, Header} from 'semantic-ui-react';
import {TaxRates} from 'utils/CalculateTax';

let countriesOption:Array<Option> = [];

for(const key in TaxRates){
  countriesOption.push({value:key, label:TaxRates[key].country});
}

export interface TaxFormValue {
  country:string;
  incomeYear:string;
  totalTaxableIncome:number;
}

interface TaxFromProps {
  onSubmit:(values: TaxFormValue) => void;
  setDisable:(values:boolean) => void;
  disable:boolean
}

const CalculateTaxFormSchema = yup.object().shape({
  country: yup.string().required("please select a country"),
  incomeYear: yup.string().required("please select an income year"),
  totalTaxableIncome: yup.number().required("please enter a number")
})

const CalculateTaxForm = ({onSubmit,setDisable,disable}:TaxFromProps) => {
  return(
    <div className={`contentContainer ${disable? "rightContent":""}`}>
    <Header as='h1'>{disable? "Your Tax Result" : "Calculate your Tax"}</Header>
    <Message color='purple' floating>
      <Icon name='info circle'/>
      Field Marked with * are madantory
      </Message>
    <Formik
      initialValues = {{
        country:"AUS",
        incomeYear:"2020-2021",
        totalTaxableIncome:0
      }}
      onSubmit={onSubmit}
      validationSchema = {CalculateTaxFormSchema}
    >
    {({isValid, dirty,values}) => {
      let incomeYearOption:Array<Option> = [];
      let country = values.country;
      for(const key in TaxRates[country].brackets){
        incomeYearOption.push({value:key,label:key});
      }
      return (
        <Form className = 'form ui'>
          <SelectField
            label="Select your country of residece*"
            name="country"
            options={countriesOption}
            disable={disable}
          />
          <SelectField
            label="Select an income year*"
            name="incomeYear"
            options={incomeYearOption}
            disable={disable}
          />
          <Field
              label="Enter your total taxable income for the income year*"
              placeholder="Amount"
              name="totalTaxableIncome"
              disable={disable}
              component={TextField}
            />
            { !disable ? 
              <Button
                type="submit"
                color="purple"
                disabled={!dirty || !isValid}
                fluid
              >
                Calculate
              </Button>
              :
              <h4 style={{textDecoration: 'underline',cursor:'pointer', color:'#7c55e0'}} onClick={()=>{setDisable(false)}}>Go to Previous Page</h4>
            }
        </Form>
      )
    }}
    </Formik>
    </div>
  )
}



export default CalculateTaxForm;