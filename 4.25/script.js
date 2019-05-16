var car = {
    model: '1310',
    price: 5,
    owner: 'Nutu',
    description: 'best car in history' 
};

function test1(x) {
    console.log(x.model + ' costs ' + x.price + ' and is owned by ' + x.owner);
}
console.log('ex1:')
test1(car);

carObj = [
    {'model': '1310',
    'price': 5,
    'owner': 'Nutu',
    'description': 'best car in history'},

    {
    'model': '1311',
    'price': 6,
    'owner': 'Nuta',
    'description': 'second best car in history'
    }
];

function test2(x) {
    var newPrice = [];
    newPrice.length = x.length;
    var inc = 5;
    for (var i in x) {
        newPrice[i] = x[i].price + inc;
        console.log(newPrice[i]);
    }
}
console.log('ex2:')
test2(carObj);

function test3(x) {
    var sum = 0;
    for (var i in x) {
        sum += x[i].price;
    }
    console.log(sum);
}
console.log('ex3:')
test3(carObj);

function test4(x) {
    var output = '';
    for (var i in x) {
        output += i + ', ' + x[i].model + ': ' + x[i].description + '\n';
    }
    console.log(output);
}
console.log('ex4:')
test4(carObj);

// function display(car) {
//     let message = '';
//     let obj = arguments[0];
//     Object.keys(obj).forEach(prop => {
//         message += prop + ': ' + obj[prop] + ' ';
//     })

//     console.log(message);
// }

let elementsX = document.getElementsByClassName('x');
console.log(elementsX[0].children[0]);

function delChild() {
    elementsX[0].removeChild(elementsX[0].children[0]);
}

var newSpan = document.createElement('span');
newSpan.setAttribute('id', 'span2');
newSpan.innerHTML = "Span 2 added";

elementTest

var paraItems = [
            {id: "element-1", text: "Text for a span element 1"},
            {id: "element-2", text: "Text for a span element 2"},
            {id: "element-3", text: "Text for a span element 3, the last one"}
            ];

var documentFragment = document.createDocumentFragment();
paraItems.forEach(item => {
    var p = document.createElement('p');
    p.setAttribute('id', item.id);
    p.innerHTML(item.text);
    documentFragment.appendChild(p);
});

paraConta
