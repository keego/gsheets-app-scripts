/**
 * @customfunction
 * 
 * Verify a cell matches a regex string
 *
 * @param {range} cell The cell in question
 * @param {string} matchString a regex pattern to match
 *
 * @return true if the matchString is satisfied
 */
function matchesText(cell, matchString) {
  const regex = new RegExp(matchString)
  const satisfied = regex.test(cell)

  return satisfied
}


