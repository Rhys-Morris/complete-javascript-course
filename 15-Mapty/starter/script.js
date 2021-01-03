'use strict';

// One of the big problems with using the local storage API is that the prototype chain is lost.
// Objects coming from local storage will not inherit the functions they had before from  their prototype chain.

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// ----- WORKOUT CLASSES -----

class Workout {
  // Remember fields are very modern JS! The below can be moved into the constructor if browser support is absent.
  date = new Date();
  // In reality we would use an external library to handle unique id generation
  id = (new Date().getTime() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()} `;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.type = 'running';
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.type = 'cycling';
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// ----- APP CLASS -----

// Biggest thing to remember from this project is correctly binding the this keyword!

class App {
  // Set private instance properties
  #map;
  #mapEvent;
  #mapZoom = 13;
  #workouts = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // ----- EVENT LISTENERS -----

    // Toggle elevation versus gradient
    inputType.addEventListener('change', this._toggleElevationField);

    // Add marker on form submit
    form.addEventListener('submit', this._newWorkout.bind(this));

    // Move map to marker when workout clicked on list
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  // Use Geolocation API to get user location
  _getPosition() {
    // Callback function if location  not retrieved successfully
    function locationRetrievalError() {
      alert('Could not retrieve your current location!');
    }

    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      locationRetrievalError
    );
  }

  // Load map to page
  _loadMap(position) {
    // Get latitude and longitude from position object
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    // Create map with leaflet
    this.#map = L.map('map').setView(coords, this.#mapZoom);

    // Tile theme
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Show form on map click
    this.#map.on(
      'click',
      function (e) {
        this.#mapEvent = e;
        this._showForm();
      }.bind(this)
    );

    // Load markers from local storage
    this.#workouts.forEach(workout => this._renderWorkoutMarker(workout));
  }

  // Show the form on map click
  _showForm() {
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  // Toggle the elevation field
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  // Create new workout on form submission
  _newWorkout(e) {
    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // Check valid integer input
    function checkValidInput(...inputs) {
      return inputs.every(input => Number.isFinite(input));
    }

    function checkPositive(...inputs) {
      return inputs.every(input => input > 0);
    }

    // Create correct object --> running or cycling
    if (type === 'running') {
      const cadence = Number(inputCadence.value);
      // Check if data is valid
      if (
        !checkValidInput(cadence, distance, duration) ||
        !checkPositive(cadence, distance, duration)
      ) {
        return alert('Invalid integer input');
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevation = Number(inputElevation.value);
      // Check if data is valid
      if (
        !checkValidInput(elevation, distance, duration) ||
        !checkPositive(distance, duration)
      ) {
        return alert('Invalid integer input');
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout arr
    this.#workouts.push(workout);

    // Render maker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form and clear input fields
    form.classList.add('hidden');
    inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value =
      '';

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  // Render workout marker on map
  _renderWorkoutMarker(workout) {
    console.log(workout);
    const [lat, lng] = workout.coords;
    L.marker([lat, lng], { opacity: 0.8 })
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false, // Stop popup from closing
          closeOnClick: false,
          className: `${workout.type}-popup`, // Style popup with CSS class
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍' : '🚴‍♀'} ${workout.description}`
      ); // Add popup text
  }

  // Render workout to list
  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍' : '🚴‍♀'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;

    if (workout.type === 'running') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
    </li>`;
    }

    if (workout.type === 'cycling') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div>
    </li>`;
    }

    // Insert html into DOM
    form.insertAdjacentHTML('afterend', html);
  }

  // Move to marker position on map
  _moveToPopup(e) {
    // Move up DOM to find closest div class of workout
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const id = workoutEl.getAttribute('data-id');
    const workout = this.#workouts.find(workout => workout.id === id);

    this.#map.setView(workout.coords, this.#mapZoom, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  // Store workouts using local storage API
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  // Retrieve local storage
  _getLocalStorage() {
    const data = localStorage.getItem('workouts');
    if (!data) return;
    this.#workouts = JSON.parse(data);

    // Populate workout list
    this.#workouts.forEach(workout => this._renderWorkout(workout));
  }

  // Reset local storage
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

//

// ------ START APPLICATION ------

// Instantiate new app
const app = new App();
