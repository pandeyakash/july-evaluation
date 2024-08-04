let flag = false;
const searchBtn = document.querySelector("button");
const categorySelect = document.querySelector("#category");
const areaSelect = document.querySelector("#area");
let scrollValue = true;

getData(`https://www.themealdb.com/api/json/v1/1/random.php`, scrollValue);

function scroll(scrollValue) {
  if (scrollValue) {
    window.addEventListener("scroll", () => {
      console.log("scroll");
      const { clientHeight, scrollHeight, scrollTop } =
        document.documentElement;
      console.log(clientHeight, scrollHeight, scrollTop);
      if (Math.ceil(scrollHeight - clientHeight) <= Math.ceil(scrollTop)) {
        getData(`https://www.themealdb.com/api/json/v1/1/random.php`);
      }
      flag = false;
    });
  }
}

searchBtn.addEventListener("click", () => {
  scrollValue = false;
  const searchInput = document.querySelector("input").value;
  getData(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
    scrollValue
  );
  flag = false;
  document.querySelector("input").value = "";
});

categorySelect.addEventListener("change", () => {
  const selectedCategory = categorySelect.value;
  getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`,
    false
  );
});

areaSelect.addEventListener("change", () => {
  const selectedArea = areaSelect.value;
  getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`,
    false
  );
});

async function getData(url, scrollValue) {
  scroll(scrollValue);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.meals);
  displayData(data.meals);
}

function displayData(data) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  data.forEach((ele) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const name = document.createElement("h3");
    name.textContent = ele.strMeal;

    const image = document.createElement("img");
    image.src = ele.strMealThumb;

    const area = document.createElement("h4");
    area.textContent = ele.strArea;

    const instructions = document.createElement("p");
    instructions.textContent = ele.strInstructions;

    card.append(image, name, area, instructions);

    container.append(card);
  });
  flag = true;
}
