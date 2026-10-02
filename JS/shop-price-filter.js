const minimumPriceInput = document.querySelector("#min-price");
const maximumPriceInput = document.querySelector("#max-price");
const priceRangeTrack = document.querySelector(".price-range-slider");
const selectedPriceOutput = document.querySelector("#price-range-value");
const resultCount = document.querySelector("#shop-result-count");
const emptyResultsMessage = document.querySelector(".product-grid-empty");
const productCards = [...document.querySelectorAll(".product-card")].map((card) => ({
  element: card,
  price: Number(card.querySelector(".product-card-price")?.textContent.replace(/[^\d.]/g, "")),
}));
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function updatePriceFilter(changedInput) {
  const minimumBound = Number(minimumPriceInput.min);
  const maximumBound = Number(maximumPriceInput.max);
  const step = Number(minimumPriceInput.step) || 1;
  let minimumPrice = Number(minimumPriceInput.value);
  let maximumPrice = Number(maximumPriceInput.value);

  if (minimumPrice >= maximumPrice) {
    if (changedInput === minimumPriceInput) {
      minimumPrice = maximumPrice - step;
      minimumPriceInput.value = String(minimumPrice);
    } else {
      maximumPrice = minimumPrice + step;
      maximumPriceInput.value = String(maximumPrice);
    }
  }

  selectedPriceOutput.textContent = `${currencyFormatter.format(minimumPrice)} – ${currencyFormatter.format(maximumPrice)}`;
  minimumPriceInput.setAttribute("aria-valuetext", `${currencyFormatter.format(minimumPrice)} minimum price`);
  maximumPriceInput.setAttribute("aria-valuetext", `${currencyFormatter.format(maximumPrice)} maximum price`);

  const rangeWidth = maximumBound - minimumBound;
  const start = ((minimumPrice - minimumBound) / rangeWidth) * 100;
  const end = ((maximumPrice - minimumBound) / rangeWidth) * 100;
  priceRangeTrack.style.setProperty("--range-start", `${start}%`);
  priceRangeTrack.style.setProperty("--range-end", `${end}%`);

  let visibleCount = 0;
  for (const product of productCards) {
    const matches = product.price >= minimumPrice && product.price <= maximumPrice;
    product.element.hidden = !matches;
    if (matches) visibleCount += 1;
  }

  resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "result" : "results"}`;
  emptyResultsMessage.hidden = visibleCount !== 0;
}

minimumPriceInput.addEventListener("input", (event) => updatePriceFilter(event.currentTarget));
maximumPriceInput.addEventListener("input", (event) => updatePriceFilter(event.currentTarget));
updatePriceFilter(null);
