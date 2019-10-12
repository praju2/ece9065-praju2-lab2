var currentYear = new Date().getFullYear();
let admin = false;
var modal = document.getElementById("login-modal");
let edit_modal = document.getElementById("edit-modal");


modal.style.display = "block";


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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

document.getElementById("edit-modal-close").addEventListener("click", function () {
  edit_modal.style.display = "none";
});

document.getElementById("btn-edit-update").addEventListener("click", () => {
  if (validateCopies(document.getElementById("ip-edit-item-copies"))) {
    let book_id = document.getElementById("edit-book-id").value;
    itemArray.forEach((item) => {
      if (book_id == item.id) {
        item.updateCopies(document.getElementById("ip-edit-item-copies").value);
        edit_modal.style.display = "none";
      }
    });
    libObj.reset();
  }
});

document.getElementById("btn-edit-item-image").addEventListener("change", function () {
  if (this.files && this.files[0]) {
    let edit_item_image = document.getElementById("edit-item-img")
    edit_item_image.src = URL.createObjectURL(this.files[0]);

    let book_id = document.getElementById("edit-book-id").value;
    itemArray.forEach((item) => {
      if (book_id == item.id) {
        item.updateImage(document.getElementById("edit-item-img").src);

      }
    });

  }
});

document.getElementById("btn-add-item-image").addEventListener("change", function () {
  if (this.files && this.files[0]) {
    let edit_item_image = document.getElementById("add-item-img")
    edit_item_image.src = URL.createObjectURL(this.files[0]);
  }
});

document.getElementById("ip-edit-item-copies").addEventListener("input", function () {
  validateCopies(this);

});

document.getElementById("ip-add-item-name").addEventListener("input", function () {
  validateAlphaNumInput(this, errMsg.ip_alpha_num_invalid);
});

document.getElementById("ip-add-item-author").addEventListener("input", function () {
  validateCharInput(this, errMsg.ip_char_invalid);
});


document.getElementById("ip-add-item-publisher").addEventListener("input", function () {
  validateAlphaNumInput(this, errMsg.ip_alpha_num_invalid);
});

document.getElementById("ip-add-item-edition").addEventListener("input", function () {
  validateAlphaNumInput(this, errMsg.ip_alpha_num_invalid);
});

document.getElementById("ip-add-item-copies").addEventListener("input", function () {
  validateCopies(this);
});

document.getElementById("btn-add-item").addEventListener("click", function () {
  validateAddItem();
});

function validateAddItem(){
  
  var element = document.getElementsByClassName("validate-add");
  var i;
  var success = true;
  for (i = 0; i < element.length; i++) {

    if (element[i].value == '') {
      document.getElementById("err-" + element[i].id).innerHTML = errMsg.mandatory;
      displayErrSpan(element[i], "block", errMsg.mandatory);
      success = false;

    }
   /* else if (element[i].id == "add-item-img") {
      if(element[i].src=="resources/images/User_Avatar-512.png")
    {
      document.getElementById("err-btn-add-item-image").innerHTML = errMsg.mandatory;
      displayErrSpan(ocument.getElementById("btn-add-item-image"), "block", errMsg.mandatory);
      success = false; }
   }*/
    else if (element[i].id === "ip-add-item-name") {
      if (!  validateAlphaNumInput(element[i], errMsg.ip_alpha_num_invalid)) { success = false; }
   }
    else if (element[i].id === "ip-add-item-author") {
      if (! validateCharInput(element[i], errMsg.ip_char_invalid)) { success = false; }
    }
    else if (element[i].id === "ip-add-item-publisher") {
      if (!  validateAlphaNumInput(element[i], errMsg.ip_alpha_num_invalid)) { success = false; }
    }
    else if (element[i].id === "ip-add-item-edition") {
      if (!  validateAlphaNumInput(element[i], errMsg.ip_alpha_num_invalid)) { success = false; }
    }
    else if (element[i].id === "ip-add-item-copies") {
      if (! validateCopies(element[i])) { success = false; }
    }
  
  
  }
  if(success)
  {
    libObj.addItem();

  }

}

function validateCopies(element) {

  if (validateNumber(element, errMsg.ip_edit_item_copies_invalid_char)) {
    if (element.value < 1 || element.value > 10) {
      return displayErrSpan(element, "block", errMsg.ip_edit_item_copies_invalid);
    } else {
      return displayErrSpan(element, "none", "");
    }
  } else {
    return displayErrSpan(element, "block", errMsg.ip_edit_item_copies_invalid_char);
  }

}

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

function validateAlphaNumInput(element, errMsg) {
  var letters = /^[ a-zA-Z0-9]*$/i;
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
    setParameters();
    modal.style.display = "none";
  }
}
function setParameters() {
  if (admin) {
    document.getElementById("disp-ip-user-name").innerHTML = user_profile.user1.user_disp_name;
    document.getElementById("disp-ip-user-birth-year").innerHTML = "Admin";
    document.getElementById("btn-add-items").click();
    var all = document.getElementsByClassName('admin');
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = "block";
    }
    all = document.getElementsByClassName("non-admin");
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = "none";
    }

  }
  else {
   
    var all = document.getElementsByClassName("admin");
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = "none";
    }
    all = document.getElementsByClassName("non-admin");
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = "block";
    }


  }

}


function logout() {
  admin = false;
  //window.location.reload();
  libObj.reset();
  modal.style.display = "block";
}
const errMsg = {
  mandatory: "Mandatory Field.",
  ip_char_invalid:  "Only alphabets are allowed.",
  ip_user_name_mandatory: "Name is mandatory.",
  ip_user_name_invalid: "Only alphabets are allowed.",
  ip_user_email_mandatory: "Email id is mandatory.",
  ip_user_email_invalid: "Please enter a valid Email Id.",
  ip_user_birth_year_mandatory: "Year of birth is mandatory.",
  ip_user_birth_year_invalid_char: "Only digits allowed.",
  ip_user_birth_year_invalid: "Please enter a valid Year of Birth between 1900 and Current Year.",
  ip_edit_item_copies_invalid_char: "Only digits allowed.",
  ip_edit_item_copies_invalid: "Please enter number of copies between 1 and 10 (inclusive).",
  ip_alpha_num_invalid: "Should only contain alphabets and Numbers."
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
    this.active = true;
  }

  updateCopies(copies) {
    this.copies = copies;
  }
  updateImage(image) {
    this.image = image;
  }
}

let itemArray = new Array(new item("1", "Book", "Clean Code: A Handbook of Agile Software Craftsmanship", "Publisher", "Robert C. Martin ", "12th Edition", 1, "resources/images/clean code.jpg"),
  new item("2", "Book", "The Clean Coder: A Code of Conduct for Professional Programmers", "Publisher", "Robert C. Martin ", "12th Edition", 1, "resources/images/clean coder.jpg"),
  new item("3", "Book", "Clean Architecture: A Craftsman's Guide to Software Structure and Design", "Publisher", "Robert C. Martin ", "12th Edition", 1, "resources/images/clean architecture.jpg"),
  new item("4", "Book", "Becoming", "Publisher", "Michelle Obama", "1st Edition", 1, "resources/images/Becoming.jpg"),
  new item("5", "Book", "Dreams from My Father: A Story of Race and Inheritance", "Publisher", "Barack Obama", "10th Edition", 1, "resources/images/Dreams Barack Obama.jpg"),
  new item("6", "Book", "I Am Malala: The Girl Who Stood Up for Education and Was Shot by the Taliban", "Publisher", "Malala Yousafzai", "4th Edition", 1, "resources/images/malala.jpg"),
  new item("7", "Book", "Long Walk to Freedom: The Autobiography of Nelson Mandela", "Publisher", "Nelson Mandela", "12th Edition", 1, "resources/images/Long Walk nelson.jpg"),
  new item("8", "Book", "The Audacity of Hope: Thoughts on Reclaiming the American Dream", "Publisher", "Barack Obama", "7th Edition", 1, "resources/images/Audacity Barack Obama.jpg"),
  new item("9", "Book", "An Autobiography: The Story of My Experiments with Truth", "Publisher", "Mahatma Gandhi", "9th Edition", 1, "resources/images/gandhi.jpg"),
  new item("10", "Book", "Common Ground", "Publisher", "Justin Trudeau", "9th Edition", 1, "resources/images/Common Ground Trudeau.jpg")
);





class library {
  constructor(itemArray) {
    this.itemArray = itemArray;
  }

  reset() {

    let rootNode = document.getElementById("available-items");
    let childNode = rootNode.lastElementChild;
    while (childNode) {
      rootNode.removeChild(childNode);
      childNode = rootNode.lastElementChild;
    }

    let count = 0;
    for (count = 0; count < itemArray.length; count++) {
      if (this.itemArray[count].active) {
        let htmlText = "<div id=\"item" + itemArray[count].id + "\" class=\"items\"\>";
        htmlText = htmlText.concat("<img alt=\"" + itemArray[count].name + "\" class=\"item_img\" src=\"" + itemArray[count].image + "\" />");
        htmlText = htmlText.concat("<h4>" + itemArray[count].name + "</h4> by ");
        htmlText = htmlText.concat("<h5>" + itemArray[count].author + "</h5>");
        htmlText = htmlText.concat("<p><b>Publisher:</b> " + itemArray[count].publisher + "   ");
        htmlText = htmlText.concat("<b>Edition:</b> " + itemArray[count].edition + "    ");
        htmlText = htmlText.concat("<b>Type:</b> " + itemArray[count].type + "    ");
        htmlText = htmlText.concat("<b>Copies:</b> " + itemArray[count].copies + "</p>");
        htmlText = htmlText.concat("<button class=\"btn-add-to-cart non-admin\" id=\"btn-add-to-cart\" onclick=\"addTocart('" + itemArray[count].id + "')\">Add to Cart</button>");
        htmlText = htmlText.concat("<button class=\"btn-edit admin\" id=\"btn-edit\" onclick=\"editItem('" + itemArray[count].id + "')\">Edit</button>");
        htmlText = htmlText.concat("<button class=\"btn-delete admin\" id=\"btn-delete\" onclick=\"deleteItem('" + itemArray[count].id + "')\">Delete</button>");
        htmlText = htmlText.concat("</div>");

        let available_items = document.getElementById("available-items");
        available_items.insertAdjacentHTML("beforeend", htmlText);
      }
    }

    setParameters();

  }

  addToCart(itemId) {
    let count = 0;
    for (count = 0; count < this.itemArray.length; count++) {
      if (this.itemArray[count].id == itemId && this.itemArray[count].active) {
        this.itemArray[count].copies--;
        if (this.itemArray[count].copies == 0) {
          let removeObj = document.getElementById("item" + this.itemArray[count].id);
          removeObj.remove();
          this.itemArray[count].active = false;
        }



        let htmlText = "<div id=\"divIdBasket" + this.itemArray[count].id + "\" class=\"items\"\>";
        htmlText = htmlText.concat("<img alt=\"" + this.itemArray[count].name + "\" class=\"item_img\" src=\"" + this.itemArray[count].image + "\" />");
        htmlText = htmlText.concat("<h4>" + this.itemArray[count].name + "</h4> by ");
        htmlText = htmlText.concat("<h5>" + this.itemArray[count].author + "</h5>");
        htmlText = htmlText.concat("<p><b>Publisher:</b> " + itemArray[count].publisher + "   ");
        htmlText = htmlText.concat("<b>Edition:</b> " + itemArray[count].edition + "    ");
        htmlText = htmlText.concat("<b>Type:</b> " + itemArray[count].type + "    ");
        htmlText = htmlText.concat("<button class=\"btn-add-to-cart\" id=\"btn-add-to-cart\" onclick=\"removeFromCart('" + itemArray[count].id + "')\">Remove from Cart</button>");
        htmlText = htmlText.concat("</div>");

        let basket = document.getElementById("basket");
        basket.insertAdjacentHTML("afterbegin", htmlText);
        break;
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
          htmlText = htmlText.concat("<p><b>Publisher:</b> " + itemArray[count].publisher + "   ");
          htmlText = htmlText.concat("<b>Edition:</b> " + itemArray[count].edition + "    ");
          htmlText = htmlText.concat("<b>Type:</b> " + itemArray[count].type + "    ");
          htmlText = htmlText.concat("<b>Copies:</b> " + itemArray[count].copies + "</p>");
          htmlText = htmlText.concat("<button class=\"btn-add-to-cart\" id=\"btn-add-to-cart\" onclick=\"addTocart('" + itemArray[count].id + "')\">Add to Cart</button>");
          htmlText = htmlText.concat("</div>");

          let available_items = document.getElementById("available-items");
          available_items.insertAdjacentHTML("afterbegin", htmlText);
          this.itemArray[count].active = true;

        }


        let removeObj = document.getElementById("divIdBasket" + this.itemArray[count].id);
        removeObj.remove();
      }
      break;
    }
  }
  editItem(itemId) {
    let count = 0;
    for (count = 0; count < this.itemArray.length; count++) {
      if (this.itemArray[count].id == itemId) {
        document.getElementById("edit-book-id").value = this.itemArray[count].id;
        document.getElementById("edit-item-img").setAttribute("src", this.itemArray[count].image);
        document.getElementById("edit-item-img").setAttribute("alt", this.itemArray[count].name);
        document.getElementById("edit-item-name").innerHTML = this.itemArray[count].name;
        document.getElementById("edit-item-author").innerHTML = this.itemArray[count].author;
        document.getElementById("edit-item-edition").innerHTML = this.itemArray[count].edition;
        document.getElementById("edit-item-type").innerHTML = this.itemArray[count].type;
        document.getElementById("edit-item-publisher").innerHTML = this.itemArray[count].publisher;
        document.getElementById("ip-edit-item-copies").value = this.itemArray[count].copies;
        edit_modal.style.display = "block";
        break;
      }
    }
  }

  deleteItem(itemId) {
    let count = 0;
    for (count = 0; count < this.itemArray.length; count++) {
      if (this.itemArray[count].id == itemId && this.itemArray[count].active) {
        let removeObj = document.getElementById("item" + this.itemArray[count].id);
        removeObj.remove();
        this.itemArray[count].active = false;
        break;
      }
    }
    // this.reset();
  }
  addItem()
  {    
    let itemObj=new item("99",
    document.getElementById("ip-add-item-name").value,
    document.getElementById("ip-add-item-publisher").value,
    document.getElementById("ip-add-item-author").value,
    document.getElementById("ip-add-item-edition").value,
    document.getElementById("ip-add-item-copies").value,
    document.getElementById("ip-add-item-name").value,
    document.getElementById("add-item-img").src);

    this.itemArray.push(itemObj);
    libObj.reset();
    var all = document.getElementsByClassName('validate-add');
    for (var i = 0; i < all.length; i++) {
      all[i].value = "";
    }
    document.getElementById("btn-add-item-image").value="";
    document.getElementById("add-item-img").src="resources/images/User_Avatar-512.png";

    
  }

}

let libObj = new library(itemArray);
//libObj.addToCart("hi");
libObj.reset();
function addTocart(val) {
  libObj.addToCart(val);

}

function removeFromCart(val) {
  libObj.removeFromCart(val);

}

function editItem(val) {
  libObj.editItem(val);

}

function deleteItem(val) {
  libObj.deleteItem(val);

}