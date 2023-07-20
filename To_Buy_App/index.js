/**********************************************[PART-1]********************************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase,ref,push,onValue,remove} from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
databaseURL:"https://mobile-application-342fd-default-rtdb.asia-southeast1.firebasedatabase.app"
};
/**************************************************************************************************/


/********************[PART-2]************************/
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const databaseRef = ref(database, "Items");
/****************************************************/


/**************************[PART-3]*****************************/
const inputElement = document.getElementById("Input-Element");
const buttonElement = document.getElementById("Button-Element");
const itemList = document.getElementById("List-of-items");
let input;
/***************************************************************/


/**********************[PART-4]**************************/
buttonElement.addEventListener("click", function () {
  input = inputElement.value;
  push(databaseRef, input);
  Eraser();
});
/********************************************************


/**************************[PART-5]*****************************/
onValue(databaseRef , function(snapshot) {
    
    if(snapshot.exists())
    {
        let itemsArray = Object.entries(snapshot.val())
        ClearList ();
        for(let i=0 ; i<itemsArray.length ; i++)
       {
        let currentItem = itemsArray[i]
        let currentItemId = currentItem[0]
        let currentItemValue = currentItem[1]
        
        listCreater (currentItem)
       }
    }
    else
    {
        itemList.innerHTML = "No items in the List";
        itemList.style.color = "white";
        itemList.style.textAlign = "center";
    }
    
})
/***************************************************************/


/*********************************[PART-6]******************************/
function Eraser ()
{
  inputElement.value="";
}

function ClearList ()
{
  itemList.innerHTML = ""; 
}

function listCreater (item)
{
  let itemID = item[0]
  let itemValue = item[1]  
  
  
  let newListElement = document.createElement("li")
  newListElement.textContent = itemValue
  itemList.append(newListElement)
  
  newListElement.addEventListener("click", function()
  {
      let exactLocationOfItem = ref(database , `Items/${itemID}`)
      remove(exactLocationOfItem)
  })
}
/***********************************************************************/
