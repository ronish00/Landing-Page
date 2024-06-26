//carousel
$('.carousel').slick({
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 700,
    cssEase: 'linear',
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: '<button type="button" class="slick-next"><img src="/public/assets/nextArrow.svg"></button>',
    prevArrow: '<button type="button" class="slick-prev"><img src="/public/assets/prevArrow.svg"></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 21
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

//api 
const url = 'https://raw.githubusercontent.com/younginnovations/internship-challenges/master/front-end/news_list.json';

//api fetch
async function fetchData(url) {
  try{
    let response = await fetch(url);

    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

//create news card
function createNewsCard(item){
  const card = document.createElement('div');
  card.classList.add('card');

  const imgwrapper = document.createElement('div');
  imgwrapper.classList.add('img-wrapper');
  const img = document.createElement('img');
  img.src = item.image;
  img.alt = item.title;
  imgwrapper.appendChild(img);

  const h3 = document.createElement('h3');
  h3.innerText = item.title;

  const p = document.createElement('p')
  p.innerText = item.content;

  const link = document.createElement('a');
  link.href = '#';
  link.className = 'secondary-btn';
  link.innerHTML = 'Learn more <img src="/public/assets/arrow.svg" alt="" srcset="">';

  card.appendChild(imgwrapper);
  card.appendChild(h3);
  card.appendChild(p);
  card.appendChild(link);

  return card;
}

//map api data to card
async function populateNewsCards(url) {
  const newsCardsContainer = document.querySelector('.news-cards');
  newsCardsContainer.innerHTML = '';

  const responseData = await fetchData(url);
  const newsData = responseData && responseData.news;

  console.log("Fetched news data:", newsData);

  if (!newsData || !Array.isArray(newsData) || newsData.length === 0) {
    console.error("Invalid news data:", newsData);
    newsCardsContainer.innerHTML = '<p>No news available</p>';
    return;
  }

  newsData.forEach(item => {
    const newsCard = createNewsCard(item);
    if (newsCard) {
      newsCardsContainer.appendChild(newsCard);
    } else {
      console.error("Error creating card for item:", item);
    }
  });
}

populateNewsCards(url);


//scroll to top
const scrollBtn  = document.querySelector('.scroll');

function scrollFunction(){
  if(document.documentElement.scrollTop > 20){
    scrollBtn.style.display = 'block';
  }
  else{
    scrollBtn.style.display = 'none';
  }
}

window.onscroll = function() {scrollFunction()};

function topFunction() {
  document.documentElement.scrollTop = 0;
}

//show searchbar
function showSearch(){
  document.querySelector('.searchbar-wrapper').classList.add('show');
  document.querySelector('body').style.overflow = 'hidden';
}

//close searchbar
function closeSearch(){
  document.querySelector('.searchbar-wrapper').classList.remove('show')
  document.querySelector('body').style.overflow = 'initial';
}

//show resource dropdown
function showDropdown(){
  document.querySelector('.dropdown').classList.toggle('show');
  if(document.querySelector('.dropdown').classList.contains('show')){
    document.querySelector('.arrow').style.scale = '-1';
  }
  else{
    document.querySelector('.arrow').style.scale = '1';
  }
}

//show menu
function showMenu(){
  document.querySelector('.leftNav').classList.toggle('show-menu');
  if(document.querySelector('.leftNav').classList.contains('show-menu')){
    document.querySelector('.hamburger img').src = '/public/assets/x-close.svg';
  }
  else{
    document.querySelector('.hamburger img').src = '/public/assets/menu-04.svg';

  }
}

