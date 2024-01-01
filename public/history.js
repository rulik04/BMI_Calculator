document.addEventListener('DOMContentLoaded', async function () {
    const historyResultsResponse = await fetch("/historyResults");
    const historyResults = await historyResultsResponse.json();

    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = "";

    historyResults.forEach(bmi => {
        let weightUnit = "None";
        let heightUnit = "None";
        if (bmi.unit == "imperial") {
            weightUnit = "pounds";
            heightUnit = "inches";
        } else if (bmi.unit == "metric") {
            weightUnit = "kg";
            heightUnit = "cm";
        }
        resultsContainer.innerHTML += `
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">BMI</h5>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p class="card-text">Age: ${bmi.age}</p>
                            <p class="card-text">Weight: ${bmi.weight} ${weightUnit}</p>
                            <p class="card-text">Height: ${bmi.height} ${heightUnit}</p>
                            <p class="card-text">Sex: ${bmi.gender}</p>
                        </div>
                        <div class="result w-50 text-center mx-auto"> 
                            <p class="card-text">BMI: ${bmi.bmi}</p>
                            <p class="card-text">Category: ${bmi.category}</p>
                            <p class="card-text">Time: ${bmi.time}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    });
});
