let themes = {
	'light': {
		primary: '#1c6957',
		secondary: '#ffe9b3',
		tertiary: '#5b18a8',
		link: '#1976D2',
		linkhover: '#FF4081'
	},
	'dark': {
		primary: '#0f0f0f',
		secondary: '#636363',
		tertiary: '#FFFFFF',
		link: '#1976D2',
		linkhover: '#FF4081'
	}
};

var currentTheme = 'dark';
var sliderIndex = 1;
var currentMenu = -1;
var currentModelSlide = 1;

window.onload = function(){
	updateSlider();
	setInterval(nextSlide, 5000);
	setInterval(nextModel, 30);
	updateMenu();
	window.addEventListener('scroll', updateMenu);
	switchTheme();
}

function nextModel() {
	var model = document.getElementById('model-img');
	model.src = 'assets/3d-model/' + currentModelSlide + '.jpg';
	currentModelSlide++;
	if(currentModelSlide > 72)
		currentModelSlide = 1;
}

function updateMenu(){
	var sections = document.querySelectorAll('section');
	var menuLinks = document.querySelectorAll('#menu a');

	var currentSectionIndex = 0;
	var scrollPosition = (window.pageYOffset || document.documentElement.scrollTop) + 10;

	// Знаходимо індекс поточного розділу, що знаходиться найближче до верху сторінки
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].offsetTop <= scrollPosition) {
			currentSectionIndex = i;
		}
	}
	
	if(currentMenu != currentSectionIndex){
		currentMenu = currentSectionIndex;
		// Знімаємо клас 'active' з усіх посилань меню
		menuLinks.forEach(function(link) {
			link.classList.remove('active');
		});

		// Додаємо клас 'active' до посилання меню відповідного поточному розділу
		if(currentSectionIndex < menuLinks.length){
			history.pushState({}, null, menuLinks[currentSectionIndex]);
			menuLinks[currentSectionIndex].classList.add('active');
		}
	}
}
function showMenu(){
	var x = document.getElementById("menu");
	if (x.className === "menu")
		x.className += " responsive";
	else
		x.className = "menu";
}

function setTheme(name) {
	var r = document.querySelector(':root');
	 r.style.setProperty('--primary-color', themes[name].primary);
	 r.style.setProperty('--secondary-color', themes[name].secondary);
	 r.style.setProperty('--tertiary-color', themes[name].tertiary);
	 r.style.setProperty('--link-color', themes[name].link);
	 r.style.setProperty('--link-hover-color', themes[name].linkhover);
	 currentTheme = name;
}
function switchTheme(){
	if(currentTheme == 'dark')
		setTheme('light');
	else
		setTheme('dark');
}

function updateSlider(){
	var slider = document.getElementById('image');
	slider.children[0].src = 'assets/slides/' + sliderIndex + '.jpg';
}
function prevSlide(){
	sliderIndex--;
	if (sliderIndex < 1)
		sliderIndex = 4;
	updateSlider();
}
function nextSlide(){
	sliderIndex++;
	if (sliderIndex > 4)
		sliderIndex = 1;
	updateSlider();
}
