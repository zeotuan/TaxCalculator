import React from 'react';
import Card from 'Components/Card/Card';
import { TaxResult as ITaxResult} from 'utils/CalculateTax';
import { Segment, Grid, Header } from 'semantic-ui-react';

type Props = Partial<ITaxResult>;

const TaxResult = ({result,total}:Props) => {
    if(!result){
        return null;
    }
    return (
        <div className='TaxResult'>
            <h4 style={{color:'white', textAlign:'left'}}>Your estimated taxable income is</h4>
            <Segment size='huge'>
                <Grid textAlign='center'>
                    <Grid.Row verticalAlign='middle'>
                        <Header color='purple'>
                            ${total}
                        </Header>
                    </Grid.Row>
                </Grid>
            </Segment>
            <h4 style={{color:'white', textAlign:'left'}}>Breakdown</h4>
            {result.map(taxItem => <Card key={taxItem.min} bracket={taxItem.max !== Infinity? `$${taxItem.min}-$${taxItem.max}`: `$${taxItem.min}+`} amount={taxItem.amount}/>)}
        </div>
    )
};

export default TaxResult;