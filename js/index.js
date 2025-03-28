document.addEventListener("DOMContentLoaded", function () {

  const API_URL = "http://localhost:3000/skincare";

  document.getElementById("show-routine").addEventListener("click", fetchSkincareRoutine);

 // Fetch skincare routine based on selected skin type
    function fetchSkincareRoutine() {
        console.log("Fetching skincare data..."); 
        
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:",data);
                
          
         const skinType = document.getElementById("skin-type").value;
        console.log("Selected Skin Type:", skinType);
        

        if (!skinType) {
            alert("Please select a skin type.");
            return;
        }

        const routineData = data.find(
            (item) =>
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
        document.getElementById("skin-description").textContent = routineData.description;
        
        updateList("morning-list", routineData.morning);
        updateList("night-list", routineData.night);
        
        document.getElementById("routine");
    }

    // Update list 
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
            image.style.alignSelf = "center"

            li.textContent = item.step;
            li.appendChild(image);
            listElement.appendChild(li);
        });
    }

    // Create new routine (POST)
    function createRoutine(newRoutine) {
        fetch("db.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRoutine),
        })
        .then(response => response.json())
        .then(data => {
            alert("New skincare routine added!");
            console.log("Created:", data);
        })
        .catch(error => console.error("Error adding routine:", error));
    }

    // Update existing routine (PUT)
    function updateRoutine(id, updatedRoutine) {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRoutine),
        })
        .then(response => response.json())
        .then(data => {
            alert("Routine updated successfully!");
            console.log("Updated:", data);
        })
        .catch(error => console.error("Error updating routine:", error));
    }

    // Delete a routine (DELETE)
    function deleteRoutine(id) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            alert("Routine deleted successfully!");
        })
        .catch(error => console.error("Error deleting routine:", error));
    }
});
