import Swiper, {Autoplay, Navigation, Pagination, Thumbs} from 'swiper';

  document.addEventListener('DOMContentLoaded', function () {    
    document.querySelectorAll('.slider-banner').forEach(item => {                               
        let currentNavigation = document.querySelector(`.slider-navigation__banner`);                     
        let navigation = {};
        let pagination = {};                     
        if (currentNavigation) {
            let next = currentNavigation.querySelector('.slider-next');                
            let prev = currentNavigation.querySelector('.slider-prev');                
            navigation = {
                nextEl: next,
                prevEl: prev,
            },
            pagination = {
                el: currentNavigation.querySelector('.slider-pagination'),
                type: 'bullets',                
                dynamicMainBullets: 1,                     
            };              
        }        
        new Swiper(item, {
            modules: [Navigation, Pagination, Autoplay],                                
            spaceBetween: 20,
            slidesPerView: 1,                                        
            pagination: pagination,
            navigation: navigation,                                
            slideActiveClass: "active",
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },                      
        });            
    });                     
    document.querySelectorAll('.slider-4').forEach(item => {                               
        let currentNavigation = document.querySelector(`.slider-navigation__4`);                     
        let navigation = {};                        
        if (currentNavigation) {
            let next = currentNavigation.querySelector('.slider-next');                
            let prev = currentNavigation.querySelector('.slider-prev');                
            navigation = {
                nextEl: next,
                prevEl: prev,
            }                         
        }        
        new Swiper(item, {
            modules: [Navigation],                                
            spaceBetween: 16,
            slidesPerView: 'auto',                                                    
            navigation: navigation,                                
            slideActiveClass: "active",
            breakpoints: {
                992: {                    
                    slidesPerView: 3,
                    spaceBetween: 24,                                                
                },                                 
                1400: {                                                             
                    slidesPerView: 4,
                    spaceBetween: 32,                                                                                                 
                }                                      
            } 
        });            
    });                     
    document.querySelectorAll('.slider-2').forEach(item => {                               
        let currentNavigation = document.querySelector(`.slider-navigation__2`);
        let navigation = {};                        
        if (currentNavigation) {
            let next = currentNavigation.querySelector('.slider-next');                
            let prev = currentNavigation.querySelector('.slider-prev');                
            navigation = {
                nextEl: next,
                prevEl: prev,
            }                         
        }        
        new Swiper(item, {
            modules: [Navigation],                                
            spaceBetween: 16,
            slidesPerView: 'auto',                                                    
            navigation: navigation,                                
            slideActiveClass: "active",
            breakpoints: {
                992: {                    
                    slidesPerView: 2,
                    spaceBetween: 24,                                                
                },                                 
                1400: {                                                             
                    slidesPerView: 2,
                    spaceBetween: 32,                                                                                                 
                }                                      
            } 
        });            
    });
    document.querySelectorAll('.slider-product').forEach(productSlider => {                                              
        let swiperProductThumbs = new Swiper('.slider-product__thumbs', {            
            slidesPerView: 'auto',
            spaceBetween: 8,
            direction: 'vertical',            
            watchSlidesProgress: true,                                            
        });        
        const swiperDefOpt = {            
            spaceBetween: 10,
            slidesPerView: 'auto',
            direction: 'horizontal',
            breakpoints: {
                992: {
                    slidesPerView: 1,
                    direction: 'vertical',
                },                                  
            }                 
        }  
        const swiperProductOpt = { 
            modules: [Thumbs],                                  
            thumbs: {
                swiper: swiperProductThumbs
            },            

        } 
        if(document.querySelector('.slider-product__thumbs')){            
            new Swiper(productSlider, Object.assign({}, swiperDefOpt, swiperProductOpt));
        }
        else{            
            new Swiper(productSlider, Object.assign({}, swiperDefOpt));    
        }               
    })                      
                          
})    