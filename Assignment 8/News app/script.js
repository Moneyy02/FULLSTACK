const url = "https://api.spaceflightnewsapi.net/v4/articles";

fetch(url)
.then(res => res.json())
.then(data => {

const container = document.getElementById("news-container");

data.results.forEach(news => {

const card = document.createElement("div");
card.classList.add("card");

card.innerHTML = `
<img src="${news.image_url}">
<div class="content">
<h3>${news.title}</h3>
<p>${news.summary.slice(0,120)}...</p>
<a href="${news.url}" target="_blank">Read More</a>
</div>
`;

container.appendChild(card);

});

});