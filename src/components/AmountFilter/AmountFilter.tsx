import React from 'react'
import { Form } from 'react-bootstrap'
import styles from './AmountFilter.module.scss'

interface FilterProps {
   amount: number
   changeAmount: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const AmountFilter: React.FC<FilterProps> = (props) => {
   const { amount, changeAmount } = props
   
   const options = []
   for (let i = 1; i <= 5; i++) {
      options.push(<option key={i}>{i * 5}</option>)
   }

   return (
      <Form.Group controlId="exampleForm.ControlSelect1">
         <Form.Control onChange={changeAmount} value={amount || 'All'} className={styles.select} as="select">
            {options}
            <option>All</option>
         </Form.Control>
      </Form.Group>
   )
}

export default AmountFilter
