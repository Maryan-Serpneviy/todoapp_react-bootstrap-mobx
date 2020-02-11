import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Form } from 'react-bootstrap'
import styles from './AmountFilter.module.scss'

const AmountFilter: React.FC<Props> = ({ amount, changeAmount }: InferProps<typeof AmountFilter.propTypes>) => {
   const options = []
   for (let i = 1; i <= 5; i++) {
      options.push(<option key={i}>{i * 5}</option>)
   }

   return (
      <Form.Group controlId="exampleForm.ControlSelect1">
         <Form.Control onChange={changeAmount} value={String(amount) || 'All'} className={styles.select} as="select">
            {options}
            <option>All</option>
         </Form.Control>
      </Form.Group>
   )
}

AmountFilter.propTypes = {
   amount: PropTypes.number.isRequired,
   changeAmount: PropTypes.func.isRequired
}

interface Props {
   amount: number
   changeAmount: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default AmountFilter
