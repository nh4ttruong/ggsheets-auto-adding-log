var ss = SpreadsheetApp.getActiveSpreadsheet()
var dataSearch = ss.getSheetByName("dataSearch")

function isExist(text) {
  var range = dataSearch.getRange("A2:A") //get range where you want to search
  var finder = rangeHistory.createTextFinder(text) //create a finder by "text"
  var find = finder.findNext()
  if(find != null) {
    return true //if exist return true
  }
  return false
}
