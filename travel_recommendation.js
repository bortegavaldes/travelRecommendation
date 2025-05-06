// https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json

const results = document.getElementById('results');
const btnSearch = document.getElementById('src-btn');
const ficonSearch = document.getElementById('btn-fa-search');
const btnReset = document.getElementById('res-btn');
const iptSearch = document.getElementById('ipt-search');

function searchByTerm() {
    const input = iptSearch.value.toLowerCase().replaceAll('y', 'i');
    results.innerHTML = '';
    window.location.hash = "home";
    if (input === '') {
        alert('Enter a destination or keyword in the search bar.');
    } else {
        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                for (const [key, value] of Object.entries(data)) {
                    console.log(key + " & " + value);
                    if (key.toLowerCase().replaceAll('y','i').includes(input)) {
                        if (key === 'countries') {
                            for (dest of value) {
                                for (city of dest.cities) {
                                    setResult(city);
                                }
                            }
                        } else {
                            for (dest of value) {
                                setResult(dest);
                            }
                        }
                    } else {
                        for (dest of value) {
                            if (dest.name.toLowerCase().replaceAll('y','i').includes(input) || Object.values(dest).some(propValue => typeof propValue === 'string' && propValue.toLowerCase().replaceAll('y','i').includes(input))) {
                                
                                if (key === 'countries') {
                                    
                                    for (city of dest.cities) {
                                        setResult(city);
                                    }
                                } else {
                                    setResult(dest)
                                }
                            } else {
                                if (key === 'countries') {
                                    for (city of dest.cities) {
                                        if (Object.values(city).some(propValue => typeof propValue === 'string' && propValue.toLowerCase().replaceAll('y','i').includes(input))) {
                                            setResult(city);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (results.innerHTML === '') {
                    alert('Results not found for the input ' + iptSearch.value);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while fetching data.');
            });
    }
}

function setResult(obj) {
    console.log(obj.imageUrl)
    resultStr = '<div class="card-result">';
    resultStr += `<img src="${obj.imageUrl}" alt="${obj.name}" class="img-card">`;
    resultStr += `<h3>${obj.name}</h3>`;
    resultStr += `<p>${obj.description}</p>`;
    resultStr += '<button>Visit</button>';
    resultStr += '</div>';
    results.innerHTML += resultStr;
}

btnReset.addEventListener('click', () => { results.innerHTML = ''; iptSearch.value = ''; window.location.hash = "home"; });

btnSearch.addEventListener('click', searchByTerm);
ficonSearch.addEventListener('click', searchByTerm);