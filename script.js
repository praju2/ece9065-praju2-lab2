let currentYear = new Date().getFullYear();
let admin = false;
let due_date_book = 30;
let due_date_cd = 10;
let modal = document.getElementById("login-modal");
let edit_modal = document.getElementById("edit-modal");
let checkout_modal = document.getElementById("checkout-modal");
let due_date_modal = document.getElementById("due-date-modal");
let selected_lang = "en";

Date.prototype.addDays = function (days) { //Stackover flow
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

let date = new Date();


let computed_due_date_book = date.addDays(due_date_book);
let computed_due_date_CD = date.addDays(due_date_cd);

modal.style.display = "block";

/*
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}*/

function openTab(evt, tabName) {


  let all = document.getElementsByClassName('form-error-msg');
  for (let i = 0; i < all.length; i++) {
    all[i].innerHTML = "";
  }

  all = document.getElementsByClassName('validate-add');
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("invalid");
  }

  all = document.getElementsByClassName('validate-edit');
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("invalid");
  }

  all = document.getElementsByClassName('validate-due-date');
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("invalid");
  }

  if (tabName == "main-basket") {
    if (cart.length > 0) {
      document.getElementById("btn-checkout").style.display = "block";

    } else {
      document.getElementById("btn-checkout").style.display = "none";
    }
  }
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
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

document.getElementById("ip-due-date-book").addEventListener("input", function () {
  validateDueDate(this, errMsg.ip_digit_invalid)

});
document.getElementById("ip-due-date-cd").addEventListener("input", function () {
  validateDueDate(this, errMsg.ip_digit_invalid)
});

function validateDueDate(element, errorMsg) {
  if (validateNumber(element, errorMsg)) {
    if (element.value < 1 || element.value > 99) {
      return displayErrSpan(element, "block", errMsg.ip_due_date_invalid);
    } else {
      return displayErrSpan(element, "none", "");
    }
  } else {
    return false;
  }
}

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

document.getElementById("lang_en").addEventListener("click", () => { libObj.changeLang("en") });

document.getElementById("lang_fr").addEventListener("click", () => { libObj.changeLang("fr") });

document.getElementById("btn-checkout").addEventListener("click", () => {
  libObj.displayCheckout();


});


document.getElementById("btn-due-date-update").addEventListener("click", validateDueDateBtn);

function validateDueDateBtn() {

  let element = document.getElementsByClassName("validate-due-date");
  let i;
  let success = true;
  for (i = 0; i < element.length; i++) {

    if (element[i].value == '') {
      document.getElementById("err-" + element[i].id).innerHTML = errMsg.mandatory;
      displayErrSpan(element[i], "block", errMsg.mandatory);
      success = false;

    }
    else if (element[i].id === "ip-due-date-book") {
      if (!validateDueDate(element[i], errMsg.ip_digit_invalid)) { success = false; }
    }
    else if (element[i].id === "ip-due-date-cd") {
      if (!validateDueDate(element[i], errMsg.ip_digit_invalid)) { success = false; }
    }

  }
  if (success) {
    libObj.updateDueDate();
  }
}


document.getElementById("edit-modal-close").addEventListener("click", function () {
  edit_modal.style.display = "none";
  let all = document.getElementsByClassName('validate-due-date');
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("invalid");
  }
  all = document.getElementsByClassName('form-error-msg');
  for (let i = 0; i < all.length; i++) {
    all[i].innerHTML = "";
  }

});

document.getElementById("checkout-close").addEventListener("click", function () {
  checkout_modal.style.display = "none";
});

document.getElementById("btn-checkout-items-cancel").addEventListener("click", function () {
  checkout_modal.style.display = "none";
});

document.getElementById("btn-checkout-items-ok").addEventListener("click", function () {
  libObj.checkout();

});



document.getElementById("btn-due-date").addEventListener("click", function () {
  document.getElementById("ip-due-date-book").value = due_date_book;
  document.getElementById("ip-due-date-cd").value = due_date_cd;
  due_date_modal.style.display = "block";
});

document.getElementById("due-date-modal-close").addEventListener("click", function () {
  due_date_modal.style.display = "none";
  let all = document.getElementsByClassName('validate-due-date');
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("invalid");
  }
  all = document.getElementsByClassName('form-error-msg');
  for (let i = 0; i < all.length; i++) {
    all[i].innerHTML = "";
  }
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
    let all = document.getElementsByClassName('validate-edit');
    for (let i = 0; i < all.length; i++) {
      all[i].value = "";
    }
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

document.getElementById("ip-add-item-name-fr").addEventListener("input", function () {
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

function validateAddItem() {

  let element = document.getElementsByClassName("validate-add");
  let i;
  let success = true;
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
      if (!validateAlphaNumInput(element[i], errMsg.ip_alpha_num_invalid)) { success = false; }
    }
    else if (element[i].id === "ip-add-item-name-fr") {
      if (!validateAlphaNumInput(element[i], errMsg.ip_alpha_num_invalid)) { success = false; }
    }
    else if (element[i].id === "ip-add-item-author") {
      if (!validateCharInput(element[i], errMsg.ip_char_invalid)) { success = false; }
    }
    else if (element[i].id === "ip-add-item-publisher") {
      if (!validateAlphaNumInput(element[i], errMsg.ip_alpha_num_invalid)) { success = false; }
    }
    else if (element[i].id === "ip-add-item-edition") {
      if (!validateAlphaNumInput(element[i], errMsg.ip_alpha_num_invalid)) { success = false; }
    }
    else if (element[i].id === "ip-add-item-copies") {
      if (!validateCopies(element[i])) { success = false; }
    }


  }
  if (success) {
    libObj.addItem();

  }

}

function validateCopies(element) {

  if (validateNumber(element, errMsg.ip_edit_item_copies_invalid_char)) {
    if (element.value < 1 || element.value > 1) {
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
  let letters = /^[ a-z]*$/i;
  //this.value=this.value.trim();
  if (!element.value.match(letters)) {
    return displayErrSpan(element, "block", errMsg);

  }
  else {
    return displayErrSpan(element, "none", "");

  }

}

function validateAlphaNumInput(element, errMsg) {
  let letters = /^[ a-zA-Z0-9]*$/i;
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
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Pattern extracted from https://www.w3resource.com/javascript/form/email-validation.php
  if (element.value != '' && !element.value.match(mailFormat)) {
    return displayErrSpan(element, "block", errMsg);

  }
  else {
    return displayErrSpan(element, "none", "");

  }

}

function validateNumber(element, errMsg) {
  element.value = element.value.trim();
  let numberFormat = /^[0-9]*$/i;
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
  let element = document.getElementsByClassName("validate-login");
  let i;
  let success = true;
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
        let age = currentYear - Number(element[i].value);
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
    let all = document.getElementsByClassName('validate-login');
    for (let i = 0; i < all.length; i++) {
      all[i].value = "";
    }
  }


}
function setParameters() {
  if (admin) {
    document.getElementById("disp-ip-user-name").innerHTML = user_profile.user1.user_disp_name;
    document.getElementById("disp-ip-user-birth-year").innerHTML = "Admin";
    let all = document.getElementsByClassName('admin');
    for (let i = 0; i < all.length; i++) {
      all[i].style.display = "block";
    }
    all = document.getElementsByClassName("non-admin");
    for (let i = 0; i < all.length; i++) {
      all[i].style.display = "none";
    }
    document.getElementById("btn-edit-delete-items").click();

  }
  else {

    let all = document.getElementsByClassName("admin");
    for (let i = 0; i < all.length; i++) {
      all[i].style.display = "none";
    }
    all = document.getElementsByClassName("non-admin");
    for (let i = 0; i < all.length; i++) {
      all[i].style.display = "block";
    }
    document.getElementById("btn-items-available").click();

  }

}


function logout() {
  admin = false;
  //window.location.reload();
  libObj.changeLang("en");
  let all = document.getElementsByClassName('form-error-msg');
  for (let i = 0; i < all.length; i++) {
    all[i].innerHTML = "";
  }

  all = document.getElementsByClassName('validate-add');
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("invalid");
  }

  all = document.getElementsByClassName('validate-edit');
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("invalid");
  }

  all = document.getElementsByClassName('validate-due-date');
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("invalid");
  }

  libObj.reset();
  modal.style.display = "block";
}
const errMsg = {
  mandatory: "Mandatory Field.",
  ip_char_invalid: "Only alphabets are allowed.",
  ip_digit_invalid: "Only digits allowed.",
  ip_user_name_mandatory: "Name is mandatory.",
  ip_user_name_invalid: "Only alphabets are allowed.",
  ip_user_email_mandatory: "Email id is mandatory.",
  ip_user_email_invalid: "Please enter a valid Email Id.",
  ip_user_birth_year_mandatory: "Year of birth is mandatory.",
  ip_user_birth_year_invalid_char: "Only digits allowed.",
  ip_user_birth_year_invalid: "Please enter a valid Year of Birth between 1900 and Current Year.",
  ip_edit_item_copies_invalid_char: "Only digits allowed.",
  ip_edit_item_copies_invalid: "Number of copies is restricted to 1 for Beta Version.",
  ip_alpha_num_invalid: "Should only contain alphabets and Numbers.",
  ip_due_date_invalid: "Please enter number of days between 1 and 99 (both inclusive)."
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
  constructor(id, type, name, publisher, author, edition, copies, image, nameObj) {
    this.id = Math.floor((Math.random() * 1000000) + 1);//id;
    this.type = type;
    this.name = name;
    this.publisher = publisher;
    this.author = author;
    this.edition = edition;
    this.copies = copies;
    this.image = image;
    this.active = true;
    this.nameObj = nameObj;

  }

  updateCopies(copies) {
    this.copies = copies;
  }
  updateImage(image) {
    this.image = image;
  }
}


let itemArray = new Array(new item("1", "Book", "Clean Code: A Handbook of Agile Software Craftsmanship", "Publisher", "Robert C. Martin ", "12th Edition", 1, "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/clean+code.jpg", { name_en: "Clean Code: A Handbook of Agile Software Craftsmanship", name_fr: "Clean Code: Un manuel d'artisanat logiciel agile" }),
  new item("2", "Book", "The Clean Coder: A Code of Conduct for Professional Programmers", "Publisher", "Robert C. Martin ", "12th Edition", 1, "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/clean+coder.jpg", { name_en: "The Clean Coder: A Code of Conduct for Professional Programmers", name_fr: "The Clean Coder: Un code de conduite pour les programmeurs professionnels" }),
  new item("3", "Book", "Clean Architecture: A Craftsman's Guide to Software Structure and Design", "Publisher", "Robert C. Martin ", "12th Edition", 1, "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/clean+architecture.jpg", { name_en: "Clean Architecture: A Craftsman's Guide to Software Structure and Design", name_fr: "Clean Architecture: Guide de l'artisan sur la structure et la conception de logiciels" }),
  new item("4", "Book", "Becoming", "Publisher", "Michelle Obama", "1st Edition", 1, "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/Becoming.jpg", { name_en: "Becoming", name_fr: "Devenir" }),
  new item("5", "Book", "Dreams from My Father: A Story of Race and Inheritance", "Publisher", "Barack Obama", "10th Edition", 1, "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/Dreams+Barack+Obama.jpg", { name_en: "Dreams from My Father: A Story of Race and Inheritance", name_fr: "Les rêves de mon père: une histoire de race et d'héritage" }),
  new item("6", "Book", "I Am Malala: The Girl Who Stood Up for Education and Was Shot by the Taliban", "Publisher", "Malala Yousafzai", "4th Edition", 1, "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/malala.jpg", { name_en: "I Am Malala: The Girl Who Stood Up for Education and Was Shot by the Taliban", name_fr: "Je suis Malala: la fille qui a profité de l'éducation et qui a été abattue par les talibans" }),
  new item("7", "Book", "Long Walk to Freedom: The Autobiography of Nelson Mandela", "Publisher", "Nelson Mandela", "12th Edition", 1, "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/Long+Walk+nelson.jpg", { name_en: "Long Walk to Freedom: The Autobiography of Nelson Mandela", name_fr: "Longue marche vers la liberté: l'autobiographie de Nelson Mandela" }),
  new item("8", "Book", "The Audacity of Hope: Thoughts on Reclaiming the American Dream", "Publisher", "Barack Obama", "7th Edition", 1, "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/Audacity+Barack+Obama.jpg", { name_en: "The Audacity of Hope: Thoughts on Reclaiming the American Dream", name_fr: "L'audace de l'espoir: Réflexions sur la reconquête du rêve américain" }),
  new item("9", "Book", "An Autobiography: The Story of My Experiments with Truth", "Publisher", "Mahatma Gandhi", "9th Edition", 1, "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/gandhi.jpg", { name_en: "An Autobiography: The Story of My Experiments with Truth", name_fr: "Une autobiographie: l'histoire de mes expériences avec la vérité" }),
  new item("10", "CD", "Common Ground", "Publisher", "Justin Trudeau", "9th Edition", 1, "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/Common+Ground+Trudeau.jpg", { name_en: "Common Ground", name_fr: "Terrain d'entente" })
);

let cart = new Array();



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

    rootNode = document.getElementById("basket");
    childNode = rootNode.firstElementChild;

    while (childNode && childNode.id != "div-checkout-btn") {
      rootNode.removeChild(childNode);
      childNode = rootNode.firstElementChild;
    }
    let count = 0;
    if (cart.length > 0) {
      cart.forEach((item) => {
        for (count = 0; count < itemArray.length; count++) {
          if (item.id == itemArray[count].id) {
            itemArray[count].copies++;
            itemArray[count].active = true;
            break;
          }
        }


      }
      )
      cart = new Array();
    }


    for (count = 0; count < itemArray.length; count++) {
      if (this.itemArray[count].active) {
        let htmlText = "<div id=\"item" + itemArray[count].id + "\" class=\"items\"\>";
        htmlText = htmlText.concat("<img alt=\"" + itemArray[count].name + "\" class=\"item_img\" src=\"" + itemArray[count].image + "\" />");
        // htmlText = htmlText.concat("<h4 class=\"item_name\">" + itemArray[count].name + "</h4> by ");
        htmlText = htmlText.concat("<h4 class=\"item_name\" id=\"item_name" + itemArray[count].id + "\"></h4> by ");
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
        document.getElementById("item_name" + itemArray[count].id).appendChild(document.createTextNode(itemArray[count].name));
        /*createTextNode was used only to showcase the usage, but for the scenarios described in assignment 2, insertAdjacentHTML is best suited for following reasons
        1) insertAdjacentHTML is faster than createElement while compromising on flexiblity. As the div layout remains the same for every item, such level of flexiblity is not required and page can be loaded much faster and interactive.
        2) The inputs are pre sanitized. Therefore, creteTextNode is redundant as the user will not be able to inject any malicious code. 
      */
      }
    }

    if (cart.length <= 0) {
      document.getElementById("btn-checkout").style.display = "none";
    }

    setParameters();

  }

  addToCart(itemId) {
    let count = 0;
    let due_date;


    for (count = 0; count < this.itemArray.length; count++) {
      if (this.itemArray[count].id == itemId && this.itemArray[count].active) {
        this.itemArray[count].copies--;
        if (this.itemArray[count].copies == 0) {
          let removeObj = document.getElementById("item" + this.itemArray[count].id);
          removeObj.remove();
          this.itemArray[count].active = false;
        }



        if (this.itemArray[count].type == "Book") {
          due_date = computed_due_date_book;
        } else {
          due_date = computed_due_date_CD;
        }


        let htmlText = "<div id=\"divIdBasket" + this.itemArray[count].id + "\" class=\"items\"\>";
        htmlText = htmlText.concat("<img alt=\"" + this.itemArray[count].name + "\" class=\"item_img\" src=\"" + this.itemArray[count].image + "\" />");
        htmlText = htmlText.concat("<h4 class=\"item_name\">" + this.itemArray[count].name + "</h4> by ");
        htmlText = htmlText.concat("<h5>" + this.itemArray[count].author + "</h5>");
        htmlText = htmlText.concat("<p><b>Publisher:</b> " + itemArray[count].publisher + "   ");
        htmlText = htmlText.concat("<b>Edition:</b> " + itemArray[count].edition + "    ");
        htmlText = htmlText.concat("<b>Type:</b> " + itemArray[count].type + "    ");
        htmlText = htmlText.concat("<b>Due Date:</b> " + due_date.toDateString() + "    ");
        htmlText = htmlText.concat("<button class=\"btn-add-to-cart\" id=\"btn-add-to-cart\" onclick=\"removeFromCart('" + itemArray[count].id + "')\">Remove from Cart</button>");
        htmlText = htmlText.concat("</div>");

        let basket = document.getElementById("basket");
        basket.insertAdjacentHTML("afterbegin", htmlText);

        cart.push(this.itemArray[count]);
        break;
      }
    }
  }

  removeFromCart(itemId) {
    let count = 0;

    for (count = 0; count < cart.length; count++) {
      if (cart[count].id == itemId) {
        cart.splice(count, 1);
      }
    }
    if (cart.length <= 0) {
      document.getElementById("btn-checkout").style.display = "none";
    }

    for (count = 0; count < this.itemArray.length; count++) {
      if (this.itemArray[count].id == itemId) {
        this.itemArray[count].copies++;
        if (this.itemArray[count].copies == 1) {
          let htmlText = "<div id=\"item" + itemArray[count].id + "\" class=\"items\"\>";
          htmlText = htmlText.concat("<img alt=\"" + itemArray[count].name + "\" class=\"item_img\" src=\"" + itemArray[count].image + "\" />");
          htmlText = htmlText.concat("<h4 class=\"item_name\">" + itemArray[count].name + "</h4> by ");
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
        break;
      }

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
  addItem() {
    let itemObj = new item("99",
      document.getElementById("ip-add-item-type").value,
      selected_lang == "en" ? document.getElementById("ip-add-item-name").value : document.getElementById("ip-add-item-name-fr").value,
      document.getElementById("ip-add-item-publisher").value,
      document.getElementById("ip-add-item-author").value,
      document.getElementById("ip-add-item-edition").value,
      document.getElementById("ip-add-item-copies").value,
      document.getElementById("add-item-img").src,
      { name_en: document.getElementById("ip-add-item-name").value, name_fr: document.getElementById("ip-add-item-name-fr").value });


    this.itemArray.push(itemObj);
    libObj.reset();
    let all = document.getElementsByClassName('validate-add');
    for (let i = 0; i < all.length; i++) {
      all[i].value = "";
    }
    document.getElementById("btn-add-item-image").value = "";
    document.getElementById("add-item-img").src = "https://ece9065-praju2-lab2.s3.ca-central-1.amazonaws.com/User_Avatar-512.png";


  }
  updateDueDate() {
    date = new Date();
    due_date_book = Number(document.getElementById("ip-due-date-book").value);
    computed_due_date_book = date.addDays(due_date_book);
    due_date_cd = Number(document.getElementById("ip-due-date-cd").value);
    computed_due_date_CD = date.addDays(due_date_cd);
    due_date_modal.style.display = "none";
    let all = document.getElementsByClassName('validate-due-date');
    for (let i = 0; i < all.length; i++) {
      all[i].value = "";
    }

    //this.reset();

  }

  displayCheckout() {
    let count = 0;
    let due_date;

    let rootNode = document.getElementById("checkout-items");
    let childNode = rootNode.firstElementChild;

    while (childNode && childNode.id != "div-checkout-items-btn") {
      rootNode.removeChild(childNode);
      childNode = rootNode.firstElementChild;
    }


    for (count = 0; count < cart.length; count++) {



      if (cart[count].type == "Book") {
        due_date = computed_due_date_book;
      } else {
        due_date = computed_due_date_CD;
      }
      let htmlText = "<div id=\"divIdCheckout" + cart[count].id + "\" class=\"items\"\>";
      htmlText = htmlText.concat("<h4>" + cart[count].name + "</h4> by ");
      htmlText = htmlText.concat("<h5>" + cart[count].author + "</h5><br/>");
      htmlText = htmlText.concat("<b>Type:</b> " + cart[count].type + "    ");
      htmlText = htmlText.concat("<b>Due Date:</b> " + due_date.toDateString() + "    ");
      htmlText = htmlText.concat("</div>");

      let checkout_items = document.getElementById("checkout-items");
      checkout_items.insertAdjacentHTML("afterbegin", htmlText);
    }

    document.getElementById("checkout-total-items").innerHTML = count;

    checkout_modal.style.display = "block";
  }


  checkout() {

    checkout_modal.style.display = "none";
    let rootNode = document.getElementById("checkout-items");
    let childNode = rootNode.firstElementChild;

    while (childNode && childNode.id != "div-checkout-items-btn") {
      rootNode.removeChild(childNode);
      childNode = rootNode.firstElementChild;
    }
    document.getElementById("checkout-total-items").innerHTML = 0;

    rootNode = document.getElementById("basket");
    childNode = rootNode.firstElementChild;

    while (childNode && childNode.id != "div-checkout-btn") {
      rootNode.removeChild(childNode);
      childNode = rootNode.firstElementChild;
    }

    let count = 0;
    cart.forEach((item) => {
      for (count = 0; count < itemArray.length; count++) {

        if (item.id == itemArray[count].id) {
          itemArray.splice(count, 1);
          break;
        }
      }


    });

    cart = new Array();
    document.getElementById("btn-items-available").click();



  }

  changeLang(lang) {
    let count = 0;
    selected_lang = lang;
    let all = Array.from(document.getElementsByClassName('item_name'));
    all.forEach((item) => {
      for (count = 0; count < itemArray.length; count++) {
        if (itemArray[count].name == item.innerHTML) {
          if (lang == "en") {
            item.innerHTML = itemArray[count].nameObj.name_en;
            itemArray[count].name = itemArray[count].nameObj.name_en;

          }
          else if (lang == "fr") {
            item.innerHTML = itemArray[count].nameObj.name_fr;
            itemArray[count].name = itemArray[count].nameObj.name_fr;

          }
          break;
        }
      }
    })

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