//Filter JS
$(document).ready(function(){
    $(".filter-item").click(function(){
        const value = $(this).attr("data-filter");
        if(value == 'all'){
            $(".post-box").show("1000");
        }else{
            $(".post-box")
            .not("."+ value)
            .hide("1000");
            $(".post-box")
            .filter("."+ value)
            .show("1000");
        }
    });
//Add Active to btn
$(".filter-item").click(function(){
    $(this).addClass("active-filter").siblings().removeClass("active-filter");
});
});
//Header Background change on scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0);
});

// HAMBURGER MENU
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);
// menuItems.forEach( 
//     function(menuItem) { 
//       menuItem.addEventListener("click", toggleMenu);
//     }
//   )


//Ensuring flash messages last 5 seconds
var flashDurationInSeconds = 5;
var flashContainerId = 'flash-messages';

   function removeFlashMessages() {
     $('#' + flashContainerId).remove();
   }

   setTimeout(removeFlashMessages, flashDurationInSeconds * 1000);