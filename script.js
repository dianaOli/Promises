const favNum = 13; 

// Elements where facts will be displayed
const singleFactDiv = document.getElementById('single-fact');
const multiFactsDiv = document.getElementById('multi-facts');
const fourFactsDiv = document.getElementById('four-facts');

//all origins allowes my browser to fetch from NumbersAPI, since im running my code online
const proxy = "https://api.allorigins.win/raw?url=";
const singleFactUrl = `http://numbersapi.com/${favNum}?json`;
const multiFactsUrl = `http://numbersapi.com/${favNum},${favNum + 1},${favNum + 2}?json`;
const fourFactsUrl = `http://numbersapi.com/${favNum}?json`;

//Fetch and display a single fact
fetch(proxy + singleFactUrl)
  .then(response => response.json())
  .then(data => {
    const p = document.createElement('p');
    p.textContent = `Single fact: ${data.text}`;
    singleFactDiv.appendChild(p);
  })
  .catch(err => {
    singleFactDiv.textContent = "Oops! Something went wrong with the single fact.";
    console.error(err);
  });

//Fetch and display facts for multiple numbers
fetch(proxy + multiFactsUrl)
  .then(response => response.json())
  .then(data => {
    for (let key in data) {
      const p = document.createElement('p');
      p.textContent = `Fact about ${key}: ${data[key]}`;
      multiFactsDiv.appendChild(p);
    }
  })
  .catch(err => {
    multiFactsDiv.textContent = "Oops! Something went wrong with multiple facts.";
    console.error(err);
  });

// Fetch and display 4 facts
const factsPromises = [];
for (let i = 0; i < 4; i++) {
  factsPromises.push(fetch(proxy + singleFactUrl).then(response => response.json()));
}

Promise.all(factsPromises)
  .then(facts => {
    facts.forEach(fact => {
      const p = document.createElement('p');
      p.textContent = `Fact: ${fact.text}`;
      fourFactsDiv.appendChild(p);
    });
  })
  .catch(err => {
    fourFactsDiv.textContent = "Oops! Something went wrong with four facts.";
    console.error(err);
  });
