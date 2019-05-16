var products = [
  {
    name: "telefon",
    type: "electronic",
    currency: 300,
    inStock: true,
    image: "https://www.91-img.com/pictures/nokia-3310-mobile-phone-large-1.jpg"
  },
  {
    name: "ceaun",
    type: "household",
    price: 50,
    inStock: true,
    image:
      "http://cdn1.shopmania.biz/files/s3/505113852/p/l/2/ceaun-din-fonta-3-5l-cu-maner-detasabil-c03a~472.jpg"
  },
  {
    name: "buletin",
    type: "pierdut",
    price: 1000,
    inStock: false,
    image:
      "https://cdn.fanatik.ro/wp-content/thumbnails/G4VgT2-qJUBdWKEI976qjg8SKWA=/664x374/smart/filters:contrast(5):quality(50)/wp-content/uploads/2016/02/15463760/1-12640288_986816614722063_2735098366800279795_o.jpg"
  },
  {
    name: "good boi",
    type: "the best",
    price: 9999,
    inStock: true,
    image:
      "https://cdn.theatlantic.com/assets/media/img/mt/2018/11/shutterstock_552503470/lead_720_405.jpg?mod=1541605820"
  }
];

function createTable() {
  if (document.getElementById("table")) {
    return;
  }

  let table = document.createElement("table");

  table.setAttribute("id", "table");
  fillTable(products, table);
  document.getElementById("container").appendChild(table);

}

function fillTable(products, table) {
  let rows = Object.keys(products[0]).length;
  let content = createContent(products, rows);
  table.appendChild(content);
}

function createContent(products, rows) {
  let fragment = document.createDocumentFragment();
  let headings = createHeadings(products);
  let last = 0;
  fragment.appendChild(headings);
  for (let i = 1; i < rows; i++) {
    if (i === rows - 1) {
      last = 1;
    }
    let newRow = createRow(i, products, last);
    fragment.appendChild(newRow);
  }
  return fragment;
}

function createHeadings(products) {
  let headings = document.createElement("thead");
  let th;
  th = document.createElement("th");
  headings.appendChild(th);
  for (let i in products) {
    th = document.createElement("th");
    th.innerHTML = products[i].name;
    headings.appendChild(th);
  }
  return headings;
}

function createRow(i, products, last) {
  let newRow = document.createElement("tr");
  let firstCell = document.createElement("td");
  firstCell.innerHTML = Object.keys(products[0])[i];
  newRow.appendChild(firstCell);
  if (!last) {
    for (let j in products) {
      let cell = document.createElement("td");
      let key = Object.keys(products[j])[i];
      cell.innerHTML = products[j][key];
      newRow.appendChild(cell);
    }
  } else {
    createImage(products, newRow, i);
  }
  return newRow;
}

function createImage(products, newRow, i) {
  for (let j in products) {
    let cell = document.createElement("td");
    let image = document.createElement("img");
    let key = Object.keys(products[j])[i];
    image.src = products[j][key];
    image.width = 100;
    image.height = 75;
    cell.appendChild(image);
    newRow.appendChild(cell);
  }
}

function tableStyle() {
  let table = document.getElementById("table");
  table.style.cssText =
    "border-spacing: unset;border-collapse: collapse;text-align: center;";
  let headings = table.getElementsByTagName("th");
  for (let i = 1; i < headings.length; i++) {
    headings[i].style.cssText = "border: 2px solid black;padding: 20px;";
    if (i % 2) {
      headings[i].style.background = "lightgray";
    }
  }
  let rows = table.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].cells.length; j++) {
      rows[i].cells[j].style.cssText = "border: 1px solid black;padding: 20px;";
      if ((i + j) % 2 == 0) {
        rows[i].cells[j].style.background = "lightgray";
      }
    }
  }
}

function addItem() {
  let name = document.getElementsByName("name")[0].value;
  let type = document.getElementsByName("type")[0].value;
  let price = document.getElementsByName("price")[0].value;
  price = parseInt(price, 10);
  let inStock, check;
  check = document.getElementsByName("available");
  for (let i in check) {
    if (check[i].checked) inStock = check[i].value == "true";
  }
  let imageLink = document.getElementsByName("imageLink")[0].value;
  if ((name&& type && price && inStock && imageLink)) {
    addObject(name, type, price, inStock, imageLink);
    if (document.getElementById("table")) {
      insertItem(name, type, price, inStock, imageLink);
      tableStyle();
    }
  } else {
    alert("Input not valid");
  }
}

function addObject(name, type, price, inStock, imageLink) {
  let object = {};
  object.name = name;
  object.type = type;
  object.price = price;
  object.inStock = inStock;
  object.image = imageLink;
  products.push(object);
}

function insertItem(name, type, price, inStock, imageLink) {
  insertHeading(name);
  let tableRows = document.getElementsByTagName("tr");
  insertDetails(type, price, inStock, tableRows);
  insertImage(imageLink, tableRows);
}

function insertHeading(name) {
  let tableHead = document.getElementsByTagName("thead")[0];
  let newCell = document.createElement("th");
  newCell.innerHTML = name;
  tableHead.appendChild(newCell);
}

function insertDetails(type, price, inStock, tableRows) {
  let newCell;
  let inputs = [type, price, inStock];
  for (let i = 0; i < tableRows.length - 1; i++) {
    newCell = document.createElement("td");
    newCell.innerHTML = inputs[i];
    tableRows[i].appendChild(newCell);
  }
}

function insertImage(imageLink, tableRows) {
  let newCell = document.createElement("td");
  let image = document.createElement("img");
  image.src = imageLink;
  image.width = 100;
  image.height = 75;
  newCell.appendChild(image);
  tableRows[tableRows.length - 1].appendChild(newCell);
}
