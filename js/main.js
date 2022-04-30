const theme = localStorage.getItem('theme')
if (theme) {
    $("html").attr("data-theme", theme);
}
$(document).ready(function(){
    $(".theme-switcher").on('click', function(){
        $(".theme-switcher").toggleClass("flip");
        $(".theme-switcher").toggleClass("fa-sun");
        $(".theme-switcher").toggleClass("fa-moon");

        let current_theme = $("html").attr("data-theme");

        if (current_theme == "dark"){
            $("html").attr("data-theme", "light");
            localStorage.setItem('theme', 'light')
            if(document.body.classList.contains("group204")){
                icon.src ="img/Group 205.png"
                
            }
        }
        if (current_theme == "light"){
            $("html").attr("data-theme", "dark");
            localStorage.setItem('theme', 'dark')
            document.body.classList.toggle("group204")
            if(document.body.classList.contains("group204")){
                icon.src ="img/Group 204.png"
            }
        }
    });
});