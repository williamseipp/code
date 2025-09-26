const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

class App {
  constructor() {
    this.allCars = cars;
    this.filteredCars = cars;

    this.carsDiv = document.getElementById('cars');
    this.filtersDiv = document.getElementById('filters');
    this.filters = this.generateFilters();

    this.renderCars();
    this.renderFilterMenu();
  }

  renderCars() {
    let carData = this.filteredCars.map(car => this.carTemplate(car));
    this.carsDiv.innerHTML = carData.join("");
  }

  carTemplate(car) {
    return `
        <div class="car">
          <figure>
            <img src=${car.image}>
          </figure>
          <h2>${car.make} ${car.model}</h2>
          <p class="year">Year: ${car.year}</p>
          <p class="price">Price: $${car.price}</p>
          <a href="#">Buy</a>
        </div>
    `;
  }

  generateFilters() {
    let make = [...new Set(this.allCars.map(car => car.make))];
    let model = [...new Set(this.allCars.map(car => car.model))];
    let price = [...new Set(this.allCars.map(car => car.price))];
    let year = [...new Set(this.allCars.map(car => car.year))];

    return { make, model, price, year };
  }

  renderFilterMenu() {
    this.filtersDiv.innerHTML = this.filterTemplate();
  }

  filterTemplate() {
    let filterHTML = Object.entries(this.filters)
      .map(([key, values]) => {

      let labelHTML = `<label for="${key}_select">${key.charAt(0).toUpperCase() + key.slice(1)}<label>`;

      let selectHTML = `<select id=${key}_select name='${key}'>`

      let optionHTML = `<option value="">Any</option>`
        + values.map(value => `<option value='${value}'>${value}</option>`).join('');

      let closingHTML = '</select>'

      return labelHTML + selectHTML + optionHTML + closingHTML;

    }).join('');

    return filterHTML;
  }
}

new App();
