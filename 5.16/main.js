// Add comments on functions

var categories = [
  {
    name: "Electronics",
    children: [
      {
        name: "TV",
        children: [
          {
            name: "Samsung",
            children: false
          },
          {
            name: "Sony",
            children: false
          }
        ]
      },
      {
        name: "Laptops",
        children: [
          {
            name: "Asus",
            children: false
          },
          {
            name: "Lenovo",
            children: false
          }
        ]
      },
      {
        name: "Radio",
        children: [
          {
            name: "Blaupunkt",
            children: false
          }
        ]
      },
      {
        name: "Phones",
        children: [
          {
            name: "iPhone",
            children: false
          },
          {
            name: "Samsung",
            children: false
          },
          {
            name: "Sony",
            children: false
          }
        ]
      }
    ]
  },
  {
    name: "Food",
    children: [
      {
        name: "Vegetables",
        children: [
          {
            name: "Tomatoes",
            children: false
          },
          {
            name: "Cucucmbers",
            children: false
          }
        ]
      },
      {
        name: "Fruits",
        children: [
          {
            name: "Apples",
            children: false
          },
          {
            name: "Oranges",
            children: false
          }
        ]
      }
    ]
  }
];

/**
 * Creates a category tree out of given object
 */
function createList(object) {
  let tree = document.createElement("ul");
  object.forEach(element => {
    tree.appendChild(createElement(element));
  });
  let container = document.getElementById("wrapper");
  container.appendChild(tree);
}

/**
 * Creates a category element out of the object through a li,
 * which contains a span with the name of the category and a new
 * tree of its subcategories if they exist, by recalling itself
 * for each subcategory
 *
 * @param { It is the object for which the function creates the element} object
 */
function createElement(object) {
  let listItem = document.createElement("li");
  let span = document.createElement("span");
  span.innerHTML = object.name;
  listItem.appendChild(span);
  if (object.children) {
    let subcategories = document.createElement("ul");
    object.children.forEach(element => {
      subcategories.appendChild(createElement(element));
    });
    listItem.appendChild(subcategories);
  }
  return listItem;
}

/**
 * Adds event listeners for all the categories, depending on the level
 * that element is in the whole tree
 */
function initToggler() {
  let boxes = document.getElementsByTagName("span");
  Array.from(boxes).forEach(element => {
    element.addEventListener("click", function() {
      this.classList.toggle("checked");
      checkChildren(this);  //function to check all subcategories of the element
      if (!checkIfMainCategory(this)) { 
        checkParent(this); //function to check upper category depending on its subcategories
      }
      if (this.matches("li>ul>li>ul>li>span")) {
        checkParent(this.parentElement.parentElement.parentElement.querySelector("span"));
      }  //function to check category from two upper levels
    });
  });
}

/**
 * Checks if the specific category is in the first level of the tree
 * @param {It is the category for which we verify the level in the tree} item
 */
function checkIfMainCategory(item) {
  let mainCategories = [document.querySelector("li").querySelector("span")];
  if (item === mainCategories[0]) {
    return 1;
  }
  for (let i = 1; i < categories.length; i++) {
    mainCategories[i] = mainCategories[i - 1].parentElement.nextSibling.querySelector("span");
    if (item === mainCategories[i]) {
      return 1;
    }
  }
  return 0;
}

/**
 * Checks all the category's subcategories depending on its own check status
 * @param { The category for which we apply the influnce over the lower level ones} item
 */
function checkChildren(item) {
  let subcategories = item.parentElement.getElementsByTagName("span");
  if (item.classList.contains("checked")) {
    Array.from(subcategories).forEach(element => {
      if (!element.classList.contains("checked")) {
        element.classList.add("checked");
      }
    });
  } else {
    item.classList.remove("partChecked");
    Array.from(subcategories).forEach(element => {
      element.className = "";
    });
  }
}

/**
 * Checks the category which containts the element depending on the element's siblings
 * @param { The element whose parent we update} item
 */
function checkParent(item) {
  let all = verifySiblings(item.parentElement.parentElement.children)[0],
    none = verifySiblings(item.parentElement.parentElement.children)[1];
  if (all) {
    item.parentElement.parentElement.previousSibling.classList.add("checked");
  } else if (none) {
          item.parentElement.parentElement.previousSibling.className = "";
        } else {
          item.parentElement.parentElement.previousSibling.classList.add("partChecked");
          item.parentElement.parentElement.previousSibling.classList.remove("checked");
  }
}

/**
 * Verifies the check status of all the categories from an array of li
 * @param { An array of all the li from a specific level in the category tree} item
 */
function verifySiblings(item) {
  let all = 1,
    none = 1;
  Array.from(item).forEach(element => {
    if (element.querySelector("span").classList.contains("checked")) {
      none = 0;
    } else {
      all = 0;
    }
    if (element.querySelector("span").classList.contains("partChecked")) {
      none = 0;
    }
  });
  return [all, none];
}

// /**
//  * Checks all categories with the same name as the one that's clicked
//  * @param { The clicked category} item
//  */
// function checkSameName(item) {
//   var brands = document.querySelectorAll('span');
//   brands.forEach(function (element) {
//     if(element.innerHTML == item.innerHTML){
//       element.className = item.className;
//     }
//   });
// }

// function checkParent(item) {
//   let siblings = item.getElementsByTagName("span");
//   let none = 1;
//   all = 1;
//   for (let i = 0; i < siblings.length; i++) {
//     if (!siblings[i].classList.contains("checked")) {
//       all = 0;
//     } else {
//       none = 0;
//     }
//   }
//   if (all) {
//     item.parentElement.getElementsByTagName("span")[0].classList.add("checked");
//     item.parentElement
//       .getElementsByTagName("span")[0]
//       .classList.remove("partChecked");
//   } else {
//     item.parentElement
//       .getElementsByTagName("span")[0]
//       .classList.add("partChecked");
//     item.parentElement.getElementsByTagName("span")[0].classList.remove("checked");
//   }
//   if (none) {
//     item.parentElement
//       .getElementsByTagName("span")[0]
//       .classList.remove("partChecked");
//     item.parentElement.getElementsByTagName("span")[0].classList.remove("checked");
//   }
// }

// function hasParent(item) {
//   return item.parentElement.parentElement.parentElement;
// }
