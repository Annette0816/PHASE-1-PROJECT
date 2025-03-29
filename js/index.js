document.addEventListener("DOMContentLoaded", function () {

  const API_URL = "https://skin-care-routine-finder.vercel.app/skincare";

  document.getElementById("show-routine").addEventListener("click", fetchSkincareRoutine);
  document.getElementById("create-routine").addEventListener("click", handleCreate);

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
        document.getElementById("skin-title").textContent = routineData.skinType.toUpperCase() + "Routine";
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
     function handleCreate() {
        const skinType = document.getElementById("skinType").value;
        const description = document.getElementById("description").value;

        if (!skinType || !description) {
            alert("Please enter both Skin Type and Description");
            return;
        }

        const newRoutine = { skinType, description, morning: [], night: [] };

        createRoutine(newRoutine);
    }

    function createRoutine(newRoutine) {
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRoutine),
        })
            .then(response => response.json())
            .then(data => {
                addRoutine(data);
            })
            .catch(error => console.error("Error adding routine:", error));
    }

    function addRoutine(routine) {
        const routineList = document.getElementById("routine-list");
        const li = document.createElement("li");
        li.id = `routine-${routine.id}`;
        li.innerText = `${routine.skinType} - ${routine.description}`;

        // Update Button
        const updateBtn = document.createElement("button");
        updateBtn.innerText = "Update";
        updateBtn.onclick = function () {
            const newDescription = prompt("Enter new description:", routine.description);
            if (newDescription) {
                updateRoutine(routine.id, { skinType: routine.skinType, description: newDescription });
            }
        };

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = function () {
            if (confirm("Are you sure you want to delete this routine?")) {
                deleteRoutine(routine.id);
            }
        };

        li.appendChild(updateBtn);
        li.appendChild(deleteBtn);
        routineList.appendChild(li);
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
                console.log("Updated:", data);

                let routineItem = document.getElementById(`routine-${id}`);
                if (routineItem) {
                    routineItem.innerText = `${data.skinType} - ${data.description}`;
                }

                alert("Routine updated successfully!");
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

                let routineItem = document.getElementById(`routine-${id}`);
                if (routineItem) {
                    routineItem.remove();
                }
            })
            .catch(error => console.error("Error deleting routine:", error));
    }
});










