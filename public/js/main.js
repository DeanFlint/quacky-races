console.log("TEST")


// nav bar maintains colour maintain
// this checks which page you're currently on and assigns it the class name of 'active'
// active provides it with the attributes to be highlighted


var navs = document.querySelectorAll("a.nav")

navs.forEach(nav => {
    if (nav.href == document.location.href) {
        nav.className += " active"
    }
})
