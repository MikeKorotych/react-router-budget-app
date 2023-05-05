import React from 'react'
// Helper funcs
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from '../helpers'

function BudgetItem({ budget }) {
  const { id, name, amount, color } = budget
  const spent = calculateSpentByBudget(id)

  return (
    <div
      className="budget"
      style={{
        '--accent': color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)}</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remeinig</small>
      </div>
    </div>
  )
}

export default BudgetItem
