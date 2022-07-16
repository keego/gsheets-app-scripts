/**
 * @customfunction
 * 
 * Sum certain cells in a given range.
 *
 * @param {range} rows The range of cells to operate over
 * @param {string} columnText The text of the top most cell in the column to sum
 * @param {string} matchText The text that must be contained in the left-most column of each row to be summed
 * @param {range} [sumRows] The range of rows to be summed, if it differs from rows.
 *
 * @return the sum of each cell in the given column that contains the given text
 */
function sumRowsContaining(rows, columnText, matchText, sumRows) {
  const rowsToSum = sumRows || rows
  const columnTextRegex = new RegExp(columnText, 'i')
  const matchRegex = new RegExp(matchText, 'i')
  const headerColumns = rowsToSum[0]
  const valuesColumnIndeces = headerColumns
    .reduce((indeces, column, index) => {
      if (columnTextRegex.test(column)) {
        indeces.push(index)
      }

      return indeces
    }, [])


  if (valuesColumnIndeces.length === 0) {
    return `No column matching "${columnText}"`
  }

  // @note for debugging
  // let names = []

  const sum = rowsToSum.reduce((sum, columns, rowIndex) => {
    const entryColumns = rows[rowIndex]
    const entryText = entryColumns[0]

    if (matchRegex.test(entryText)) {
      const cellValues = valuesColumnIndeces
        .map(valuesColumnIndex => columns[valuesColumnIndex] || 0)
      const rowSum = cellValues
        .reduce((sum, value) => sum + value, 0)
      // names.push(entryText + ":" + cellValue)
      return sum + rowSum
    }

    return sum
  }, 0)

  // const nameString = "[" + names.join(', ') + "]"

  return sum
}

function stringifyArray(array) {
  return `[${array.join(', ')}]`
}

const addNumber = (total, number) => total + number
const sumRange = (range) => range.reduce(addNumber, 0)
const addRangeSum = (total, range) => total + sumRange(range)
const sumRanges = (ranges) => ranges.reduce(addRangeSum, 0)

/**
 * @customfunction
 * 
 * Given a row of funds to spend and a row of costs to cover,
 * this will return a matrix of payments to be made to split things equally.
 * 
 * Each column in the input rows represents a person.
 * New rows will be created for each person (transposed from the provided columns).
 * Each cell represents how much its column's person needs to pay its row's person.
 *
 * @param {range} fundsRows The row of cells denoting how much said person is in debt
 * @param {range} costsRows The row of cells denoting how much said person is owed
 *
 * @return
 */
function distributeDebts(fundsRows, costsRows) {
  const [fundsColumns] = fundsRows
  const [costsColumns] = costsRows
  const totalCost = sumRange(costsColumns)

  const recipientRows = costsColumns.map(cost => {
    const portionOfTotalCost = cost / totalCost
    const recipientColumns = fundsColumns.map(funds => funds * portionOfTotalCost)

    return recipientColumns
  }, [])

  return recipientRows
}

/**
 * @typdef {[string]|string[]} Criterion
 */
/**
 * @customfunction
 *
 * @param {string} input sup
 * @param {...[Criterion][]} criteria yeah
 *
 * @return
 */
function categorize(input, ...criteria) {
  // return JSON.stringify(criteria, null, 2)
  if (input === '') {
    return ''
  }

  const match = criteria.find((range) => {
    if (typeof range === 'string') {
      return true
    }

    const [[, ...matchTexts]] = range

    const matchRegex = new RegExp(matchTexts.join('|'), 'i')

    return matchRegex.test(input)
  }) ?? ''

  if (typeof match === 'string') {
    return match
  }

  const [[category]] = match

  return category
}

