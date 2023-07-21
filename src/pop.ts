var tableData: any;

if (chrome.storage)
  chrome.storage.local.get('fav', function (result) {
    tableData = result.fav;
    if (tableData && tableData.length > 0) {
      var table = document.getElementById('myTable') as HTMLTableElement;

      if (table)
        for (var i = 0; i < tableData.length; i++) {
          var row = table.insertRow(-1);

          var nameCell = row.insertCell(0);
          var urlCell = row.insertCell(1);
          var dateCell = row.insertCell(2);
          var deleteCell = row.insertCell(3); // New cell for delete button

          nameCell.innerHTML = tableData[i].name;
          urlCell.innerHTML = tableData[i].url;
          dateCell.innerHTML = tableData[i].date;

          deleteCell.innerHTML = '<button class="delete-btn" data-index="' + i + '">Delete</button>';// Delete button with onclick event

          // Add click event listener to each row
          row.addEventListener('click', createRowClickListener(tableData[i], i));
        }
    }
  });

// Variables to store the current row and data
let currentRow: any;
let currentData: any;
let currentDataIndex: any;

// Event delegation for delete button click
document.addEventListener('click', function (event: any) {
  if (event.target.classList.contains('delete-btn')) {
    var index = event.target.getAttribute('data-index');
    deleteItem(index);
  }
});

// Function to delete an item
function deleteItem(index: number) {
  chrome.storage.local.get('fav', function (result) {
    var tableData = result.fav;
    if (tableData && tableData.length > 0) {
      tableData.splice(index, 1); // Remove the item from the array

      chrome.storage.local.set({ fav: tableData }, function () {
        console.log('Item deleted successfully!');
        location.reload();
      });
    }
  });
}

// Function to create a click event listener for a row
function createRowClickListener(rowData: any, index: number) {
  return function () {
    // Set the values in the HTML form
    var nameInput = document.getElementById("name") as HTMLInputElement;
    var urlInput = document.getElementById('url') as HTMLInputElement;

    nameInput.value = rowData.name;
    if (urlInput)
      urlInput.value = rowData.url as string;

    // Store the current row and data
    // currentRow = this;
    // currentData = rowData;
    // currentDataIndex = index;
  };
}
// Add event listener to the "Save" button
var saveButton = document.querySelector('button');
if (saveButton)
  saveButton.addEventListener('click', saveData);

// Function to save the updated data
function saveData() {

  var _name = document.getElementById('name') as HTMLInputElement;
  var _url = document.getElementById('url') as HTMLInputElement;

  var nameValue = _name.value;
  var urlValue = _url.value;

  currentData.name = nameValue;
  currentData.url = urlValue;

  var nameCell = currentRow.cells[0];
  var urlCell = currentRow.cells[1];

  nameCell.innerHTML = currentData.name;
  urlCell.innerHTML = currentData.url;

  // Update the value in the tableData array
  tableData[currentDataIndex] = currentData;

  // Perform the necessary saving logic using chrome.storage.local.set()
  chrome.storage.local.set({ fav: tableData }, function () {
    // console.log('Data saved successfully!');
  });
}

// Event delegation for delete button click
document.addEventListener('click', function (event: any) {
  if (event.target.classList.contains('delete-btn')) {
    var index = event.target.getAttribute('data-index');
    deleteItem(index);
  }
});

// Export button click event
var exportButton = document.getElementById('exportButton');
if (exportButton)
  exportButton.addEventListener('click', exportData);

// Import button click event
var importButton = document.getElementById('importButton');
if (importButton)
  importButton.addEventListener('click', importData);

// Function to export the data
function exportData() {
  chrome.storage.local.get('fav', function (result) {
    var tableData = result.fav;
    if (tableData && tableData.length > 0) {
      var csvContent = 'Name,Url,Date\n';

      for (var i = 0; i < tableData.length; i++) {
        var row = tableData[i];
        var csvRow = `${row.name},${row.url},${row.date}\n`;
        csvContent += csvRow;
      }

      var blob = new Blob([csvContent], { type: 'text/csv' });
      var url = URL.createObjectURL(blob);

      var a = document.createElement('a');
      a.href = url;
      a.download = 'fav_data.csv';
      a.click();

      // Clean up the object URL
      URL.revokeObjectURL(url);
    }
  });
}


// Function to parse CSV data
function parseCSV(csvData: any) {
  var lines = csvData.split('\n');
  var menuData = [];

  for (var i = 1; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line) {
      var values = line.split(',');
      var name = values[0].trim();
      var url = values[1].trim();
      var date = values[2].trim();

      var item = {
        name,
        url,
        date
      };
      menuData.push(item);
    }
  }

  return menuData;
}

// Function to import the data
function importData() {
  var inputElement = document.getElementById('importInput') as HTMLInputElement;
  if (inputElement) {
    inputElement.click();

    inputElement.addEventListener('change', function () {
      if (inputElement && inputElement.files && inputElement.files.length > 0) {
        var file = inputElement.files[0];
        var reader = new FileReader();

        reader.onload = function (event: any) {
          var csvData = event.target.result;
          var menuData = parseCSV(csvData);

          chrome.storage.local.set({ fav: menuData }, function () {
            console.log('Data imported successfully!');
            location.reload();
          });
        };

        reader.readAsText(file);
      }
    })
  }

}