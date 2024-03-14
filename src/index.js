document.addEventListener("DOMContentLoaded", function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    // Fetch images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            // Access the array of image URLs in the data
            const images = data.message;

            // Get the div where we want to add the images
            const dogImagesDiv = document.getElementById("dog-image-container");

            // Loop through the array of image URLs
            images.forEach(imageUrl => {
                // Create an img element
                const imgElement = document.createElement("img");

                // Set the src attribute to the image URL
                imgElement.src = imageUrl;

                // Append the img element to the div
                dogImagesDiv.appendChild(imgElement);
            });
        })
        .catch(error => console.error("Error fetching dog images:", error));

    // Fetch dog breeds
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            // Access the object containing names
            const breedsObject = data.message;

            // ul element for breed list 
            const breedList = document.getElementById("dog-breeds");

            // Function to filter breeds based on the selected letter
            function filterBreeds(letter) {
                // Clear the existing breed list
                breedList.innerHTML = "";

                // Loop through the object keys (breed names)
                for (const breed in breedsObject) {
                    // Check if the breed name starts with the selected letter
                    if (breed.startsWith(letter)) {
                        // Create an li element for each breed
                        const breedListItem = document.createElement("li");

                        // Set the text content of the li element to the breed name
                        breedListItem.textContent = breed;

                        // Add click event listener to change font color
                        breedListItem.addEventListener("click", function() {
                            breedListItem.style.color = "blue"; // Change the font color to blue
                        });

                        // Append the li element to the ul
                        breedList.appendChild(breedListItem);
                    }
                }
            }

            // Get the select element for the breed filter
            const breedDropdown = document.getElementById("breed-dropdown");

            // Add change event listener to the dropdown
            breedDropdown.addEventListener("change", function() {
                // Get the selected letter
                const selectedLetter = this.value;

                // Filter breeds based on the selected letter
                filterBreeds(selectedLetter);
            });

            // Initially load all breeds
            filterBreeds("a"); // For example, initially load breeds that start with 'a'
        })
        .catch(error => console.error("Error fetching dog breeds:", error));
});