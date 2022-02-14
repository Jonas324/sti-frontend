function addRow() {
    let table = document.getElementById("myTable");
  
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = "cell 1";
    cell2.innerHTML = "cell 2";
  }
  
  function deleteRow() {
    let table = document.getElementById("myTable");
    table.deleteRow(0);
  }