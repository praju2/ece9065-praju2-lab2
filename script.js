var currentYear = new Date().getFullYear();
let admin = false;
var modal = document.getElementById("loginModal");


modal.style.display = "block";
/*
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
*/
function displayErrSpan(element, block_none, errMsg) {
  document.getElementById("err-" + element.id).style.display = block_none;
  if (block_none === "block") {
    document.getElementById("err-" + element.id).innerHTML = errMsg;
    element.classList.add("invalid");
    return false;
  }
  else {
    document.getElementById("err-" + element.id).innerHTML = "";
    element.classList.remove("invalid");
    return true;
  }

}

document.getElementById("ip-user-name").addEventListener("input", function () {
  validateCharInput(this, errMsg.ip_user_name_invalid);
});

document.getElementById("ip-user-name").addEventListener("change", function () {
  validateBirthYear(document.getElementById("ip-user-birth-year"));
});
document.getElementById("ip-user-email").addEventListener("change", function () {
  validateEmail(this, errMsg.ip_user_email_invalid);
});
document.getElementById("ip-user-birth-year").addEventListener("input", function () {
  validateBirthYear(this);
});
document.getElementById("btn-user-log-in").addEventListener("click", login);

function validateBirthYear(element) {
  if (validateNumber(element, errMsg.ip_user_birth_year_invalid_char)) {
    if (!validateAdminUser(element)) {
      return validateYear(element, errMsg.ip_user_birth_year_invalid);
    }
    else {
      return true;
    }
  } else { return false; }
}

function validateAdminUser(element) {
  if (document.getElementById("ip-user-name").value.toLowerCase() == user_profile.user1.user_id) {
    if (Number(document.getElementById("ip-user-birth-year").value) != user_profile.user1.user_birth_year) {
      admin = false;
      return validateYear(element, errMsg.ip_user_birth_year_invalid);
    }

    else {
      admin = true;
      return displayErrSpan(element, "none", "");

    }
  }
  admin = false;

}

function validateCharInput(element, errMsg) {
  var letters = /^[ a-z]*$/i;
  //this.value=this.value.trim();
  if (!element.value.match(letters)) {
    return displayErrSpan(element, "block", errMsg);

  }
  else {
    return displayErrSpan(element, "none", "");

  }

}

function validateEmail(element, errMsg) {
  element.value = element.value.trim();
  var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Pattern extracted from https://www.w3resource.com/javascript/form/email-validation.php
  if (element.value != '' && !element.value.match(mailFormat)) {
    return displayErrSpan(element, "block", errMsg);

  }
  else {
    return displayErrSpan(element, "none", "");

  }

}

function validateNumber(element, errMsg) {
  element.value = element.value.trim();
  var numberFormat = /^[0-9]*$/i;
  if (!element.value.match(numberFormat)) {
    return displayErrSpan(element, "block", errMsg);

  }
  else {
    return displayErrSpan(element, "none", "");

  }
}


function validateYear(element, errMsg) {
  element.value = element.value.trim();

  if (element.value != '' && (Number(element.value) > Number(currentYear) || Number(element.value) < 1900)) {
    return displayErrSpan(element, "block", errMsg);

  }
  else {
    return displayErrSpan(element, "none", "");

  }




}

function login() {
  var element = document.getElementsByClassName("validate-login");
  var i;
  var success = true;
  for (i = 0; i < element.length; i++) {

    if (element[i].value == '') {
      document.getElementById("err-" + element[i].id).innerHTML = errMsg.mandatory;
      displayErrSpan(element[i], "block", errMsg.mandatory);
      success = false;

    }
    else if (element[i].id === "ip-user-name") {
      if (!validateCharInput(element[i], errMsg.ip_user_name_invalid)) { success = false; }
      else {
        document.getElementById("disp-" + element[i].id).innerHTML = element[i].value;
      }
    }
    else if (element[i].id === "ip-user-email") {
      if (!validateEmail(element[i], errMsg.ip_user_email_invalid)) { success = false; }
      else { document.getElementById("disp-" + element[i].id).innerHTML = element[i].value; }
    }
    else if (element[i].id === "ip-user-birth-year") {

      if (!validateBirthYear(element[i])) { success = false; }
      else {
        var age = currentYear - Number(element[i].value);
        if (age >= 18) {
          document.getElementById("disp-" + element[i].id).innerHTML = "Adult";
        } else {
          document.getElementById("disp-" + element[i].id).innerHTML = "Child";
        }
      }

    }
  }


  if (success) {
    if (admin) {
      document.getElementById("disp-ip-user-name").innerHTML = user_profile.user1.user_disp_name;
      document.getElementById("disp-ip-user-birth-year").innerHTML = "Admin";
      document.getElementById("adminTab").style.display = "block";
      /*var all = document.getElementsByClassName('admin');
      for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'block';
  }*/     
      

    }
    modal.style.display = "none";
  }
}
function logout() {
  admin = false;
  window.location.reload();
}
const errMsg = {
  mandatory: "Mandatory Field.",
  ip_user_name_mandatory: "Name is mandatory.",
  ip_user_name_invalid: "Only alphabets are allowed.",
  ip_user_email_mandatory: "Email id is mandatory.",
  ip_user_email_invalid: "Please enter a valid Email Id.",
  ip_user_birth_year_mandatory: "Year of birth is mandatory.",
  ip_user_birth_year_invalid_char: "Only digits allowed.",
  ip_user_birth_year_invalid: "Please enter a valid Year of Birth between 1900 and Current Year."
};

const user_profile = {
  user1: {
    user_id: "admin",
    user_disp_name: "Librarian",
    user_email: "libadmin@uwo.ca",
    user_birth_year: 1867
  }
};

class item {
  constructor(id, type, name, publisher, author, edition, copies, image) {
    this.id = Math.floor((Math.random() * 1000000) + 1);//id;
    this.type = type;
    this.name = name;
    this.publisher = publisher;
    this.author = author;
    this.edition = edition;
    this.copies = copies;
    this.image = image;
  }
  addItem() {
    console.log("Add Item...");
  }
  removeItem() {
    console.log("Remove Item...");
  }

}

let itemArray = new Array(new item("1", "book", "Clean Code: A Handbook of Agile Software Craftsmanship", "Publisher", "Robert C. Martin ", "12th Edition", 1, "resources/images/clean code.jpg"),
  new item("2", "book", "The Clean Coder: A Code of Conduct for Professional Programmers", "Publisher", "Robert C. Martin ", "12th Edition", 1, "resources/images/clean coder.jpg"),
  new item("3", "book", "Clean Architecture: A Craftsman's Guide to Software Structure and Design", "Publisher", "Robert C. Martin ", "12th Edition", 1, "resources/images/clean architecture.jpg"),
  new item("4", "book", "Becoming", "Publisher", "Michelle Obama", "1st Edition", 1, "resources/images/Becoming.jpg"),
  new item("5", "book", "Dreams from My Father: A Story of Race and Inheritance", "Publisher", "Barack Obama", "10th Edition", 1, "resources/images/Dreams Barack Obama.jpg"),
  new item("6", "book", "I Am Malala: The Girl Who Stood Up for Education and Was Shot by the Taliban", "Publisher", "Malala Yousafzai", "4th Edition", 1, "resources/images/malala.jpg"),
  new item("7", "book", "Long Walk to Freedom: The Autobiography of Nelson Mandela", "Publisher", "Nelson Mandela", "12th Edition", 1, "resources/images/Long Walk nelson.jpg"),
  new item("8", "book", "The Audacity of Hope: Thoughts on Reclaiming the American Dream", "Publisher", "Barack Obama", "7th Edition", 1, "resources/images/Audacity Barack Obama.jpg"),
  new item("9", "book", "An Autobiography: The Story of My Experiments with Truth", "Publisher", "Mahatma Gandhi", "9th Edition", 1, "resources/images/gandhi.jpg"),
  new item("10", "book", "Common Ground", "Publisher", "Justin Trudeau", "9th Edition", 1, "resources/images/Common Ground Trudeau.jpg")
);


let count = 0;
for (count = 0; count < itemArray.length; count++) {
  let htmlText = "<div id=\"item" + itemArray[count].id + "\" class=\"items\"\>";
  htmlText = htmlText.concat("<img alt=\"" + itemArray[count].name + "\" class=\"item_img\" src=\"" + itemArray[count].image + "\" />");
  htmlText = htmlText.concat("<h4>" + itemArray[count].name + "</h4> by ");
  htmlText = htmlText.concat("<h5>" + itemArray[count].author + "</h5>");
  htmlText = htmlText.concat("<button class=\"btn-add-to-cart\" id=\"btn-add-to-cart\" onclick=\"addTocart('" + itemArray[count].id + "')\">Add to Cart</button>");
  htmlText = htmlText.concat("<button class=\"btn-delete admin\" id=\"btn-delete\" onclick=\"addTocart('" + itemArray[count].id + "')\">Delete</button>");
  htmlText = htmlText.concat("</div>");

  let available_items = document.getElementById("available-items");
  available_items.insertAdjacentHTML("beforeend", htmlText);
}


class library {
  constructor(itemArray) {
    this.itemArray = itemArray;
  }

  addToCart(itemId) {
    let count = 0;
    for (count = 0; count < this.itemArray.length; count++) {
      if (this.itemArray[count].id == itemId) {
        this.itemArray[count].copies--;
        if (this.itemArray[count].copies == 0) {
          let removeObj = document.getElementById("item" + this.itemArray[count].id);
          removeObj.remove();
        }



        let htmlText = "<div id=\"divIdBasket" + this.itemArray[count].id + "\" class=\"items\"\>";
        htmlText = htmlText.concat("<img alt=\"" + this.itemArray[count].name + "\" class=\"item_img\" src=\"" + this.itemArray[count].image + "\" />");
        htmlText = htmlText.concat("<h4>" + this.itemArray[count].name + "</h4> by ");
        htmlText = htmlText.concat("<h5>" + this.itemArray[count].author + "</h5>");        
        htmlText = htmlText.concat("<button class=\"btn-add-to-cart\" id=\"btn-add-to-cart\" onclick=\"removeFromCart('" + itemArray[count].id + "')\">Remove from Cart</button>");
        htmlText = htmlText.concat("</div>");

        let basket = document.getElementById("basket");
        basket.insertAdjacentHTML("beforeend", htmlText);
      }
    }
  }

  removeFromCart(itemId) {
    let count = 0;
    for (count = 0; count < this.itemArray.length; count++) {
      if (this.itemArray[count].id == itemId) {
        this.itemArray[count].copies++;
        if (this.itemArray[count].copies == 1) {
          let htmlText = "<div id=\"item" + itemArray[count].id + "\" class=\"items\"\>";
          htmlText = htmlText.concat("<img alt=\"" + itemArray[count].name + "\" class=\"item_img\" src=\"" + itemArray[count].image + "\" />");
          htmlText = htmlText.concat("<h4>" + itemArray[count].name + "</h4> by ");
          htmlText = htmlText.concat("<h5>" + itemArray[count].author + "</h5>");
          htmlText = htmlText.concat("<button class=\"btn-add-to-cart\" id=\"btn-add-to-cart\" onclick=\"addTocart('" + itemArray[count].id + "')\">Add to Cart</button>");
          htmlText = htmlText.concat("</div>");

          let available_items = document.getElementById("available-items");
          available_items.insertAdjacentHTML("beforeend", htmlText);

        }


        let removeObj = document.getElementById("divIdBasket" + this.itemArray[count].id);
        removeObj.remove();
      }
    }
  }

}

let libObj = new library(itemArray);
//libObj.addToCart("hi");
function addTocart(val) {
  libObj.addToCart(val);

}

function removeFromCart(val) {
  libObj.removeFromCart(val);

}

