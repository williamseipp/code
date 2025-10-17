import templates from './templates.js'

let photos;
// define a slideshow object that can perform
// actions. it does not need to be an entire class
const slideshow = {
  init() {
    this.slideshow = document.getElementById('slideshow');
    let slides = this.slideshow.querySelectorAll('figure');
    this.firstSlide = slides[0];
    this.lastSlide = slides[slides.length - 1];
    this.currentSlide = this.firstSlide;
    this.bind();
  },

  // helper method that references the 'previous' slide correctly
  prevSlide(event) {
    event.preventDefault();
    let prev = this.currentSlide.previousElementSibling || this.lastSlide;
    this.changeSlide(prev);
  },

  // helper method that references the 'previous' slide correctly
  nextSlide(event) {
    event.preventDefault();
    let next = this.currentSlide.nextElementSibling || this.firstSlide;
    this.changeSlide(next);

  },

  // performs the actual actions on the given slide
  changeSlide(newSlide) {
    this.fadeOut(this.currentSlide);
    this.fadeIn(newSlide);
    this.renderPhotoContent(newSlide.getAttribute('data-id'));
    this.currentSlide = newSlide;
  },

  fadeOut(slide) {
    slide.classList.add('hide');
    slide.classList.remove('show');
  },

  fadeIn(slide) {
    slide.classList.remove('hide');
    slide.classList.add('show');
  },

  async renderPhotoContent(idx) {
    renderPhotoInfo(Number(idx));
    let comments = await fetchComments(idx)
    renderComments(comments);
  },

  bind() {
    let prevButton = this.slideshow.querySelector('a.prev');
    let nextButton = this.slideshow.querySelector('a.next');
    prevButton.addEventListener('click', event => this.prevSlide(event));
    nextButton.addEventListener('click', event => this.nextSlide(event));
  }
};

async function fetchPhotos() {
  let response = await fetch('/photos');
  return response.json();
}


function renderPhotos() {
  let slides = document.getElementById('slides');
  slides.innerHTML = templates.photos(photos);
}


function renderPhotoInfo(idx) {
  let photo = photos.find(item => item.id === idx);
  let header = document.getElementById('information');
  header.innerHTML = templates.photoInformation(photo);
}

async function fetchComments(photoId) {
  let response = await fetch(`/comments?photo_id=${photoId}`);
  return response.json();
}

function renderComments(comments) {
  let commentList = document.querySelector('#comments ul');
  commentList.innerHTML = templates.comments(comments);
}

function renderNewComment(comment) {
  let commentsList = document.querySelector('#comments ul');
  commentsList.insertAdjacentHTML('beforeend', templates.comment(comment));
}

async function handleButtonClick(event) {
  event.preventDefault();
  event.stopPropagation();  // firefox-specific
  let button = event.target;
  let buttonType = button.getAttribute('data-property');
  if (!buttonType) return;

  let href = button.getAttribute('href');
  let dataId = Number(button.getAttribute('data-id'));
  let text = button.textContent;

  let response = await fetch(href, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: 'photo_id=' + dataId,
  });

  let json = await response.json();
  let newTotal = json.total;
  button.textContent = text.replace(/\d+/, newTotal);

  let updatedPhoto = photos.find(photo => photo.id === dataId);
  updatedPhoto[buttonType] = newTotal;
}


async function handleFormSubmit(event) {
  event.preventDefault();
  event.stopPropagation();  // firefox-specific
  let form = event.target;
  let href = form.getAttribute('action');
  let method = form.getAttribute('method');
  let data = new FormData(form);
  let currentSlideId = slideshow.currentSlide.getAttribute('data-id');
  data.set('photo_id', currentSlideId);

  let response = await fetch(href, {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: new URLSearchParams([...data]),
  });

  let json = await response.json();
  renderNewComment(json);
  form.reset();
}

async function main() {
  photos = await fetchPhotos();
  let activePhotoId = photos[0].id;
  renderPhotos();
  renderPhotoInfo(activePhotoId);

  let comments = await fetchComments(activePhotoId);
  renderComments(comments);

  slideshow.init();
}

document.addEventListener('DOMContentLoaded', () => {
  main();

  document.getElementById('information').addEventListener('click', handleButtonClick);

  document.querySelector('form').addEventListener('submit', handleFormSubmit);
});
