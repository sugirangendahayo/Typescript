const menu = [
    {name: "1st pizza",
        price: 9
    }
    {name: "2nd pizza",
        price: 10
    }
    {name: "3rd pizza",
        price: 10
    }
    {name: "4tf pizza",
        price: 8
    }

];
const cashInBalance = 100;
const orderQueue = [];

function addNewPizza(object){
    
    menu.push(object);
}
addNewPizza({name: "5th pizza", price: 12})