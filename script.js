let categoryData = null;
let manCategoryData = null;
let womenCategoryData = null;
let kidsCategoryData = null;
let itemContainer = document.getElementById("item-container");
let menCategoryBtn = document.querySelector(".men");
let womenCategoryBtn = document.querySelector(".women");
let kidCategoryBtn = document.querySelector(".kids");

function injectItemToHTML(item) {
  html = "";
  item?.forEach((element, index) => {
    let perOff = Math.round(
      ((element.compare_at_price - element.price) / element.compare_at_price) *
        100
    );
    let title = element?.title;
    if (title.length >= 10) {
      title = title.slice(0, 10) + "...";
    }
    html += `
                <div class="card">
                    <img src="${element?.image}" alt="Dress Image" />
                    <div class="card-content">
                        <div class="about-image">
                            <div class="dress-name">${title}</div>
                            <div class="vendor">${element?.vendor}</div>
                        </div>
                        <div class="pricing-details">
                            <div class="price">${element?.price}</div>
                            <div class="old-price">${element?.compare_at_price}</div>
                            <div class="percent-off">${perOff}% Off</div>
                        </div>
                        <button class="add-to-cart">
                            Add to Cart
                        </button>
                    </div>
                </div>
    `;
  });
  itemContainer.innerHTML = html;
}

function getCategoryWiseData(category_name) {
  category_name = category_name.toLowerCase();
  let [data] = categoryData.filter(
    (data) => data.category_name.toLowerCase() === category_name
  );
  return data.category_products;
}

async function getData() {
  await fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      categoryData = data.categories;
    })
    .catch((error) => console.error("Error:", error));

  manCategoryData = getCategoryWiseData("Men");
  womenCategoryData = getCategoryWiseData("Women");
  kidsCategoryData = getCategoryWiseData("Kids");
  injectItemToHTML(manCategoryData);
}
getData();

function changeTab(category) {
  if (category === "Men" && manCategoryData) {
    injectItemToHTML(manCategoryData);
    menCategoryBtn.classList.add("btn-enable");
    womenCategoryBtn.classList.remove("btn-enable");
    kidCategoryBtn.classList.remove("btn-enable");
  } else if (category === "Women" && womenCategoryData) {
    injectItemToHTML(womenCategoryData);
    menCategoryBtn.classList.remove("btn-enable");
    womenCategoryBtn.classList.add("btn-enable");
    kidCategoryBtn.classList.remove("btn-enable");
  } else if (category === "Kids" && kidsCategoryData) {
    injectItemToHTML(kidsCategoryData);
    menCategoryBtn.classList.remove("btn-enable");
    womenCategoryBtn.classList.remove("btn-enable");
    kidCategoryBtn.classList.add("btn-enable");
  }
}
