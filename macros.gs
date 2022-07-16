function Pasteformulaonly() {
  const selection = SpreadsheetApp.getActiveSpreadsheet().getSelection()
  const currentCell = selection.getCurrentCell()
  if (!currentCell) {
    return
  }

  const activeRanges = selection.getActiveRangeList()?.getRanges()
  activeRanges.forEach(activeRange => {
    currentCell.copyTo(activeRange, SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false)
  })
};

function Pasteallformulas() {
  const selection = SpreadsheetApp.getActiveSpreadsheet().getSelection()
  const sourceRange = selection.getActiveRange()
  const sourceDims = [sourceRange.getWidth(), sourceRange.getHeight()].join('x')

  const activeRanges = selection.getActiveRangeList()?.getRanges()
  activeRanges.forEach(destinationRange => {
    const destinationDims = [destinationRange.getWidth(), destinationRange.getHeight()].join('x')
    if (sourceDims !== destinationDims) {
      destinationRange.setValue(`Destination must match source range dimensions: ${sourceDims}`)
      return
    }

    sourceRange.copyTo(destinationRange, SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false)
  })
};