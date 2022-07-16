/**
 * @customfunction
 * 
 * Returns all provided values found in a target string.
 *
 * @param {A1} target target string to look through
 * @param {B2:B4} rangeOfValuesToFind range of values to look for in the target
 * @param {C2:C4} rangeOfDefaultsToUse range of values to fall back on when an individual value isn't found
 * @param {true} defaultToAll what to use when no values are found. True uses all values in rangeOfValuesToFind, false omits missing values. Defaults to true.
 *
 * @return all found values
 */
function findAll(target, rangeOfValuesToFind, rangeOfDefaultsToUse = [[]], defaultToAll = true) {
  if (target.length === 0) {
    return undefined
  }

  const nothingFoundDefault = defaultToAll
    ? rangeOfValuesToFind
    : [[]] // empty range

  //
  return findAllAndMap(target, rangeOfValuesToFind, rangeOfValuesToFind, rangeOfDefaultsToUse, nothingFoundDefault)

  // // assuming these are all is a 1 row ranges, get cell values as array
  // const valuesToFind = rangeOfValuesToFind[0]
  // const valuesToUse = valuesToFind
  // const defaultsToUse = rangeOfDefaultsToUse ? rangeOfDefaultsToUse[0] : []

  // const lowerTarget = target.toLowerCase()
  // const foundValues = valuesToFind
  //   .map(value => value.toLowerCase())
  //   .map(value => )
  //   .map((value, i) => {
  //     const lowerValue = value.toLowerCase()
  //     return lowerTarget.includes(lowerValue)
  //       ? valuesToUse[i]
  //       : undefined
  //   })
  //   .filter(value => value !== undefined)

  // const returnValues = foundValues.length == 0 && defaultToAll
  //   ? valuesToFind
  //   : foundValues

  // return [returnValues]
}


/**
 * @customfunction
 * 
 * Returns all provided values found in a target string.
 *
 * @param {A1} target target string to look through
 * @param {B2:B4} searchKeys values to look for in the target
 * @param {C2:C4} didFind values to use when a value is found
 * @param {D2:D4} didNotFind values to use when a value isn't found
 * @param {E2:E4} nothingFoundDefault value to return when no values are found. Defaults to entire set of didFind values
 *
 * @return all found values or given default
 */
function findAllAndMap(target, searchKeys, didFind, didNotFind, nothingFoundDefault = didFind) {
  if (target.length === 0) {
    return undefined
  }

  // assuming these are all is a 1 row ranges, get cell values as array
  const keysToFind = searchKeys[0]
  const valuesToUse = didFind[0]
  const defaultsToUse = didNotFind[0]

  const searchTarget = target.toLowerCase()
  const didFindKeys = keysToFind
    .map(key => key.toLowerCase())
    .map(key => searchTarget.includes(key))
  const didNotFindAnyKeys = !didFindKeys.some(didFind => didFind === true)

  if (didNotFindAnyKeys) {
    return nothingFoundDefault
  }

  const foundValues = didFindKeys
    .map((didFind, i) => didFind ? valuesToUse[i] : defaultsToUse[i]
    )

  return [foundValues]
}

/**
 * @customfunction
 * 
 * Returns all provided values found in a target string.
 *
 * @param {number} total total amount to split amongst shareholders 
 * @param {B2:B4} rangeOfShares amount of shares each holder has
 *
 * @return range of shared totals
 */
function share(total, rangeOfShares) {
  if (total.length === 0) {
    return undefined
  }

  // assuming this is a 1 row range, get cell values as array
  const rawShares = rangeOfShares[0]

  const totalShares = rawShares.reduce((sum, value) => sum + value, 0)
  const sharedTotals = rawShares.map(shares => shares / totalShares * total)
  
  return [sharedTotals]
}

