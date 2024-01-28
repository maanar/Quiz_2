let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");


$(document).ready( () =>{
 searchByName("").then(() => {
  $(".loading-screen").fadeOut(500)
  $("body").css("overflow" , "visible")
  $(".inner-loading-screen").fadeOut(500)
 })
})


function openNav() {
  $(".left-nav-menu").animate({ left: 0 }, 1000);
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate({ top: 0 }, 1500);
  }
}

function closeNav() {
  let boxnav = $(".left-nav-menu .nav-tap").outerWidth();

  $(".left-nav-menu").animate({ left:-boxnav }, 1000);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate(
    {
      top: 300,
    },
    1500
  );
}

closeNav();

$(".left-nav-menu i.open-close-icon").click(() => {
  if ($(".left-nav-menu").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

function getMeal(x) {
  let mealData = "";

  for (let i = 0; i < x.length; i++) {
    mealData += `
        <div class="col-md-3">
        <div onclick="getMealDetails('${x[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img src="${x[i].strMealThumb}" alt="" class="w-100">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
           <h3>${x[i].strMeal}</h3>
          </div>
        </div>
      </div>
        `;
  }

  rowData.innerHTML = mealData;
}

async function getCategories() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  searchContainer.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  console.log(response.categories);

  dataOfCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}

function dataOfCategories(x) {
  let data = "";
  for (let i = 0; i < x.length; i++) {
    data += `
     <div class="col-md-3">
     <div onclick="getCatgoriMeal('${
       x[i].strCategory
     }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
       <img src="${x[i].strCategoryThumb}" alt="" class="w-100">
       <div class="meal-layer position-absolute  align-items-center text-black p-2">
        <h3>${x[i].strCategory}</h3>
        <p>${x[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
       </div>
     </div>
   </div>
     `;
  }

  rowData.innerHTML = data;
}

async function getCatgoriMeal(c) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`
  );
  response = await response.json();

  getMeal(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeIn(300);
}

async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(600);
  searchContainer.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  console.log(response.meals);

  dataOfArea(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(600);
}

function dataOfArea(x) {
  let data = "";

  for (let i = 0; i < x.length; i++) {
    data += `
     <div class="col-md-3">
     <div onclick="getAreaMeal('${x[i].strArea}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
       <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${x[i].strArea}</h3>
     </div>
   </div>
     `;
  }

  rowData.innerHTML = data;
}

async function getAreaMeal(a) {
  rowData.innerHTML = "";
 $(".inner-loading-screen").fadeIn(600);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${a}`
  );
  response = await response.json();

  getMeal(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(600);
}

async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(600);
  searchContainer.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  console.log(response.meals);
  dataOfIngredients(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(600);
}

function dataOfIngredients(x) {
  let data = "";
  for (let i = 0; i < x.length; i++) {
    data += `
     <div class="col-md-3">
     <div onclick="getIngredientMeal('${
       x[i].strIngredient
     }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
     <i class="fa-solidfa-drumstick-bite fa-4x"></i>
        <h3>${x[i].strIngredient}</h3>
        <p>${x[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
     </div>
   </div>
     `;
  }

  rowData.innerHTML = data;
}

async function getIngredientMeal(ing) {
  rowData.innerHTML = "";
 $(".inner-loading-screen").fadeIn(600);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );
  response = await response.json();

  getMeal(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(600);
}

async function getMealDetails(id) {
  closeNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(600);

  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  response = await response.json();
  displayMealDetails(response.meals[0]);
  $(".inner-loading-screen").fadeOut(600);
  
}

function displayMealDetails(meal) {

  searchContainer.innerHTML = "";

  let data = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      data += `<li class="alert alert-danger m-3 p-2">${
        meal[`strIngredient${i}`]
      }</li>`;
    }
  }

  let tag = meal.strTags?.split(",");

  if (!tag) tag = [];

  let tagStr = "";

  for (let i = 0; i < tag.length; i++) {
    tagStr += `<li class="alert  m-1 p-1">${tag[i]}</li>`;
  }

  let details = `
    <div class="col-md-4">
    <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-2">
    <h2>${meal.strMeal}</h2>
</div>
<div class="col-md-8">
  <h2>${meal.strMeal}</h2>
  <p>${meal.strInstructions}</p>
  <h3 class=""> Area :<span>${meal.strArea}</span></h3>
  <h3 class=""> Caregory :<span>${meal.strCategory}</span></h3>
  <h3 class=""> Recipes :<span>${meal.strTags}</span></h3>
  <ul class="list-unstyled d-flex  flex-wrap">${data}</ul>
  <h3>Tags : </h3>
  <ul class="list-unstyled d-flex g-2 flex-wrap">${tagStr}</ul>
  <a  href="${meal.strSource}" class="btn btn-success">Source</a>
  <a href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
</div>
    
    `;

  rowData.innerHTML = details;
}

function searchInput() {
  searchContainer.innerHTML = `
  <div class="row py-4 ">
    <div class="col-md-6 ">
        <input onkeyup="searchByName(this.value)" class="form-control  text-warning" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input onkeyup="searchByFirstLetter(this.value)" maxlength="2" class="form-control  text-info" type="text" placeholder="Search By First Letter">
    </div>
</div>`;

  rowData.innerHTML = "";
}

async function searchByName(s) {
  closeNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(600)

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`
  );
  response = await response.json();

  response.meals ? getMeal(response.meals) : getMeal([]);
}

async function searchByFirstLetter(s) {
  closeNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(600)
  s == "" ? (s = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`
  );
  response = await response.json();

  response.meals ? getMeal(response.meals) : getMeal([]);
}


let submit;

function contactInput() {
  rowData.innerHTML = `
  <diV class=" contact min-vh-100 position-relative d-flex justify-content-center align-items-center">

  <div class="container w-75 text-center">
    <div class="row g-4">
  <div class="col-md-6">
    <input onkeyup="validation()" id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Only characters are allowed
                </div>
  </div>
  <div class="col-md-6">
    <input onkeyup="validation()" id="emailInput" type="emial" class="form-control" placeholder="Enter Your Email">
    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not Vaild 
                    *example : eee1@yyy.mmm
                </div>
  </div>
  <div class="col-md-6">
    <input onkeyup="validation()" id="phoneInput" type="number" class="form-control" placeholder="Enter Your Phone">
    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                       Only numbers are allowed
                </div>
  </div>
  <div class="col-md-6">
    <input onkeyup="validation()" id="ageInput" type="number" class="form-control" placeholder="Enter Your Age">
    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                 Age not Valid   +18
                </div>
  </div>
  <div class="col-md-6">
    <input oninput="validation()" id="passwordInput" type="password" class="form-control" placeholder="Enter Your Password">
    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid password *Minimum eight characters, at least one letterA-Z and one number:*
                </div>
  </div>

  <div class="col-md-6">
    <input onkeyup="validation()" id="repasswordInput" type="password" class="form-control" placeholder="Enter Your Repassword">
    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                     not match password
                </div>
  </div>

</div>

  <button id="submit" disabled class="btn btn-outline-danger px-3 mt-3">Submit</button>

  </div>
 </diV>

`

submit = document.getElementById("submit");

 document.getElementById("nameInput").addEventListener("focus" , () => {
  nameInputTouched = true 
 } )

 document.getElementById("emailInput").addEventListener("focus" , () => {
  emailInputTouched = true 
 } )

 document.getElementById("phoneInput").addEventListener("focus" , () => {
  phoneInputTouched = true 
 } )

 document.getElementById("ageInput").addEventListener("focus" , () => {
  ageInputTouched = true 
 } )
 document.getElementById("passwordInput").addEventListener("focus" , () => {
  passwordInputTouched = true 
 } )
 document.getElementById("repasswordInput").addEventListener("focus" , () => {
  repasswordInputTouched = true 
 } )

}

let nameInputTouched =false;
let emailInputTouched =false;
let phoneInputTouched =false;
let ageInputTouched =false;
let passwordInputTouched = false ;
let repasswordInputTouched = false ;


function validation(){

  if(nameInputTouched){
    if(nameValidation()){
      document.getElementById("nameAlert").classList.replace("d-block" , "d-none")
    }else{
      document.getElementById("nameAlert").classList.replace("d-none" , "d-block")
    }

  }

  if(emailInputTouched){
    if(emailValidation()){
      document.getElementById("emailAlert").classList.replace("d-block" , "d-none")
    }else{
      document.getElementById("emailAlert").classList.replace("d-none" , "d-block")
    }

  }


  
  if(phoneInputTouched){
    if(phoneValidation()){
      document.getElementById("phoneAlert").classList.replace("d-block" , "d-none")
    }else{
      document.getElementById("phoneAlert").classList.replace("d-none" , "d-block")
    }

  }


  
  if(ageInputTouched){
    if(ageValidation()){
      document.getElementById("ageAlert").classList.replace("d-block" , "d-none")
    }else{
      document.getElementById("ageAlert").classList.replace("d-none" , "d-block")
    }

  }


  
  if(passwordInputTouched){
    if(passwordValidation()){
      document.getElementById("passwordAlert").classList.replace("d-block" ,  "d-none")
    }else{
      document.getElementById("passwordAlert").classList.replace("d-none" , "d-block")
    }

  }


  if(repasswordInputTouched){
    if(repasswordValidation()){
      document.getElementById("repasswordAlert").classList.replace("d-block" , "d-none")
    }else{
      document.getElementById("repasswordAlert").classList.replace("d-none" , "d-block")
    }

  }


if (nameValidation() && emailValidation() && phoneValidation() && ageValidation()  && passwordValidation()  && repasswordValidation()){
   submit.removeAttribute("disabled")
}else{
  submit.setAttribute("disabled" , true)
}

}




function nameValidation(){
  return(/^[a-zA-Z]{3,20}$/.test(document.getElementById("nameInput").value) )
}  

function emailValidation(){
  return(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById("emailInput").value) )
}  
function phoneValidation(){
  return(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value) )
}  
function ageValidation(){
  return(/^(1[89]|[2-9]\d)$/.test(document.getElementById("ageInput").value) )
} 
function passwordValidation(){
  return(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(document.getElementById("passwordInput").value) )
} 
function repasswordValidation(){
  return document.getElementById("repasswordInput").value ==  document.getElementById("passwordInput").value
} 
