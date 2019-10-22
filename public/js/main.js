console.log("TEST")


// nav bar maintains colour maintain


var navs = document.querySelectorAll("a.nav")

navs.forEach(nav => {
    if (nav.href == document.location.href) {
        nav.className += " active"
    }
})
