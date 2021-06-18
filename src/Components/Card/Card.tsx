import React from 'react'
import { Grid, Header, Segment} from 'semantic-ui-react'

interface Props{
    amount:number,
    bracket:string
}

const Card = ({amount,bracket}:Props) => (
    <Segment size='small'>
      <Grid columns={2} textAlign='center' verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column textAlign='left'>
            <Header size='small'>
              Tax Bracket
              <p>{bracket}</p>
            </Header> 
            
          </Grid.Column>
  
          <Grid.Column textAlign='right'>
            <Header color='purple'>
              ${amount}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
  
  export default Card;