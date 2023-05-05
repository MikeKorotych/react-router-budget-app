import React from 'react'
import { useLoaderData } from 'react-router-dom'

// helpers
import { deleteItem, fetchData } from '../helpers'

// component imports
import Table from '../components/Table'

// libs
import { toast } from 'react-toastify'

//loader
export function expensesLoader() {
  const expenses = fetchData('expenses')
  return { expenses }
}

//action
export async function expensesAction({ request }) {
  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

  if (_action === 'deleteExpense') {
    try {
      // delete an expense
      deleteItem({
        key: 'expenses',
        id: values.expenseId,
      })
      return toast.success(`Expense deleted!`)
    } catch (e) {
      throw new Error('There is a problem deleting your expense')
    }
  }
}

function ExpensesPage() {
  const { expenses } = useLoaderData()

  return (
    <div className="grid-lg">
      <h1>All expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses}></Table>
        </div>
      ) : (
        <p>No expenses to show</p>
      )}
    </div>
  )
}

export default ExpensesPage
