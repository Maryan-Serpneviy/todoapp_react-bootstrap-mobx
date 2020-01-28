import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './AmountFilter.module.scss'

export default function AmountFilter(props) {
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

AmountFilter.propTypes = {
   amount: PropTypes.number,
   changeAmount: PropTypes.func.isRequired
}
