const http = require('http');
const fsFile = require('fs');

/// database (open)///////
const dbPath = '/home/allawy/Desktop/node_js_projects/to-do_cli/db.json'
const openDatabase = () =>{
  const dbString =  fsFile.readFileSync(dbPath, 'utf8') || '[]'
  return JSON.parse(dbString)
}
const listEntries = () => {
  const db = openDatabase();
  return db;
}
////////// html pages/////////////////
const home_page =(dbData)=> `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
    <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
  }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 20px;
        text-align: left;
        border-bottom: 5px solid #ddd;
        border-left: 5px solid #ddd;
        border-right: 5px solid #ddd;
    }

    th {
        background-color: #f2f2f2;
    }
</style>
</head>
<body>
<h1>To Do</h1>
<div id="todo"></div>
<br>
<span><h4>Select category<h4> </span>
<select id="selectBox" onchange="displayContent()">
  <option value="none">Select an option</option>
  <option value="quotes">Quotes</option>
  <option value="nature">Nature</option>
</select>

<script>
    const field = document.getElementById('todo');
    const data =${JSON.stringify(dbData)};

    // Create a table element
    const table = document.createElement('table');

    // Create table header
    const headerRow = table.insertRow();
    const titleHeader = document.createElement('th');
    titleHeader.textContent = 'Title';
    headerRow.appendChild(titleHeader);
    const statusHeader = document.createElement('th');
    statusHeader.textContent = 'Status';
    headerRow.appendChild(statusHeader);

    // Create table rows and cells based on the data
    data.forEach(item => {
        const row = table.insertRow();
        const titleCell = row.insertCell();
        const statusCell = row.insertCell();
        titleCell.textContent = item.title;
        statusCell.textContent = item.status;
    });

    // Append the table to the div
    field.appendChild(table);

    function displayContent() {
        const selectBox = document.getElementById('selectBox');
        const selectedOption = selectBox.value;
        if (selectedOption === 'quotes') {
            window.location.href = 'http://127.0.0.1:3000/Quotes'; // Redirect to quotes page
        }if (selectedOption === 'nature') {
            window.location.href = 'http://127.0.0.1:3000/Nature'; // Redirect to nature page
        }
    }
</script>
</body>
</html>
`
//////// read image as bytes [buffer]
const quotes_image1 = fsFile.readFileSync('/home/allawy/Desktop/node_js_projects/Lab2_http_server/assets/Quotes/Linus.jpg');
const quotes_image2 = fsFile.readFileSync('/home/allawy/Desktop/node_js_projects/Lab2_http_server/assets/Quotes/Think twice.jpg');
///// convert it to base64
var quotes_image1_Base64 = quotes_image1.toString('base64');
var quotes_image2_Base64 = quotes_image2.toString('base64');
const quotes_page = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nature</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }

    h1 {
      margin-top: 0;
      font-size: 40px;
      color: #333;
      text-align: center;
    }

    .image-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 800px;
      margin-top: 20px;
    }

    .image-container img {
      width: 1000px;
      height: auto;
      margin: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <h1>Useful Quotes Images</h1>
  <div class="image-container">
  <img src="data:image/jpg;base64,${quotes_image1_Base64}" alt="Red dot" />
  <img src="data:image/jpg;base64,${quotes_image2_Base64}" alt="Red dot" />
  </div>
</body>
</html>
`
//////// read image as bytes [buffer]
const nature_image1 = fsFile.readFileSync('/home/allawy/Desktop/node_js_projects/Lab2_http_server/assets/Nature/2-nature.jpg');
const nature_image2 = fsFile.readFileSync('/home/allawy/Desktop/node_js_projects/Lab2_http_server/assets/Nature/foresttb-l.jpg');
///// convert it to base64
var nature_image1_Base64 = nature_image1.toString('base64');
var nature_image2_Base64 = nature_image2.toString('base64');
const nature_page =`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nature</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }

    h1 {
      margin-top: 0;
      font-size: 40px;
      color: #333;
      text-align: center;
    }

    .image-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 800px;
      margin-top: 20px;
    }

    .image-container img {
      width: 1000px;
      height: auto;
      margin: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <h1>Beautiful Nature Images</h1>
  <div class="image-container">
  <img src="data:image/jpg;base64,${nature_image1_Base64}" alt="Red dot" />
  <img src="data:image/jpg;base64,${nature_image2_Base64}" alt="Red dot" />
  </div>
</body>
</html>
`

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  switch (req.url) {
    case '/':
    console.log(nature_page);
      res.setHeader('Content-Type', 'text/html');
      res.end(home_page(listEntries()));
      break;
    case '/Nature': 
    res.setHeader('Content-Type', 'text/html');
      res.end(nature_page);
      break;
    case '/Quotes':
      res.setHeader('Content-Type', 'text/html');
      res.end(quotes_page);
      break;
    default:
      break;
  }
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});