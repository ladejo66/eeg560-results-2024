// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const matricInput = document.getElementById('matricInput');
    const submitButton = document.getElementById('submitButton');
    const outputDiv = document.getElementById('output');

    // Event listener for the "Get Results" button
    submitButton.addEventListener('click', async () => {
        // Get the entered matric number
        const matricNo = matricInput.value.trim();

        // Ensure the user enters a matric number
        if (!matricNo) {
            outputDiv.innerText = 'Please enter a valid Matric No.';
            return;
        }

        // Send a request to the backend to fetch student results
        try {
            const response = await fetch(`https://eeg560-2026.onrender.com/result/${matricNo}`);

            // Check if the response is successful
            if (response.ok) {
                const result = await response.json();

                // Display the student's result
                outputDiv.innerHTML = `
                    <p><strong>Matric No:</strong> ${result['Matric No']}</p>
                    <p><strong>Name:</strong> ${result.Name}</p>
                    <p><strong>CA/40:</strong> ${result['CA/40']}</p>
                    <p><strong>Exam/60:</strong> ${result['Exam/60']}</p>
                    <p><strong>Total/100:</strong> ${result['Total/100']}</p>
                `;
            } else {
                // If the matric number is not found
                outputDiv.innerText = 'Matric No not found. Please check and try again.';
            }
        } catch (error) {
            // Handle any errors during the fetch process
            console.error('Error fetching results:', error);
            outputDiv.innerText = 'An error occurred while fetching the results. Please try again later.';
        }
    });
});
