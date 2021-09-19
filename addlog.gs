var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
var ds = spreadsheet.getSheetByName("danhsach")
var history = spreadsheet.getSheetByName("history")

function addToHistory(row = 2) {

  let checkData = ds.getRange(row, 1, 1, 4).getValues()[0] //get value of row
  spreadsheet.toast("Đang check thông tin...")
  
  if (checkData[0] == ""){
    return spreadsheet.toast("Nhập MSSV vào đi đã ~.~");
  }

  //Check if error when filter data
  if (checkData[1] == "#N/A") {
    return  spreadsheet.toast("Không tìm thấy sinh viên!");
  }

  if (isStudentExist(checkData[0]) == true) {
    return spreadsheet.toast("Sinh viên đã được thêm vào group lớp, bạn có thể check ở sheet 'history' nhé!")
  }

  spreadsheet.toast("Adding")
    
  //preformat
  history.insertRows(2)
  history.setRowHeight(2,18)
  
  //Copy data from original sheet to log sheet
  checkData.push(new Date()) //Add timestamp to log
  checkData.push(Session.getActiveUser().getEmail()) //Add email to log
  history.getRange(2,1,1,checkData.length).setValues([checkData])
  
  //set format
  history.getRange(2,1,1,checkData.length).setFontSize(10).setVerticalAlignment("middle").setHorizontalAlignment("center")

  //noti and reset value
  spreadsheet.toast("Đã thêm vào group lớp ^^")
}

//search MSSV in history sheets
function isStudentExist(text) {
  var rangeHistory = history.getRange("A2:A")
  var finder = rangeHistory.createTextFinder(text) //create a finder by mssv
  var find = finder.findNext()
  if(find != null) {
    return true
  }
  return false
}

function button1(){
  addToHistory(2);
}
