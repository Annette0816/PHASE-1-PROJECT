document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("show-routine").addEventListener("click", fetchSkincareRoutine);

    // Fetch skincare routine based on selected skin type
    function fetchSkincareRoutine() {
        
        fetch("db.json")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:",data);
                
          
         const skinType = document.getElementById("skin-type").value;
        console.log("Selected Skin Type:", skinType);
        

        if (!skinType) {
            alert("Please select a skin type.");
            return;
        }

                
                const routineData = data.skincare.find(item =>
                    item.skinType.trim().toLowerCase() === skinType.trim().toLowerCase()
                );
                console.log("matched routineData:",routineData);
                
                if (routineData) {
                    displayRoutine(routineData);
                } else {
                    alert("Routine not found!");
                }
            })
            .catch(error => console.error("Error fetching skincare data:", error));
    }

    // Display fetched routine
    function displayRoutine(routineData) {
        document.getElementById("skin-title").textContent = routineData.skinType.toUpperCase() + " Skin Routine";
        
        updateList("morning-list", routineData.morning);
        updateList("night-list", routineData.night);
        
        document.getElementById("routine");
    }

    // Update UI list dynamically
    function updateList(listId, items) {
        const listElement = document.getElementById(listId);
        listElement.innerHTML = ""; 

        items.forEach(item => {
            const li = document.createElement("li");

            const image = document.createElement("img");
            image.src = item.image;
            image.alt = item.step;
            image.width = 100;
            image.style.dispaly = "block";
            image.style.marginTop = "5px";

            li.textContent = item.step;
            li.appendChild(image);
            listElement.appendChild(li);
        });
    }

    
});
