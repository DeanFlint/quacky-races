(function() {
    let dropdownOptions = document.querySelectorAll(".playOptions");
    let resetButton = document.querySelector(".resetButton");
   
    if(resetButton) {
        resetButton.addEventListener("click", function() {
            console.log("button clicked")
            for (let i = 0, numOfDropdowns = dropdownOptions.length; i < numOfDropdowns; i++) {
                dropdownOptions[i].selectedIndex = 0;
            }
        });
    }
    
  
  })();