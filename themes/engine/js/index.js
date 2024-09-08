import JsTabs from 'js-tabs';
import MmenuLight from 'mmenu-light';
import { Modal, ScrollSpy, Toast } from './../../../../node_modules/bootstrap/dist/js/bootstrap.esm.min';
import Choices from 'choices.js';
import StarRating from 'star-rating.js';
import tippy from 'tippy.js';
// import IMask from 'imask';




function parseHTML(html) {
    const t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

  
document.addEventListener('DOMContentLoaded', function () {
    
    
    //Количество товаров
    
    function newCount(item){
        let plus = item.querySelector('.count-btn_plus');        
        let min = item.querySelector('.count-btn_min');
        let input = item.querySelector('.count-input');                      
        plus.addEventListener('click', () => {        
            +input.value++;
            if(+input.value >= 999){
                input.value = 999;
            }
            // if(input.value > 9 && input.value < 100){
            //     input.style.width = '2ch'
            // } else if (input.value > 99){                
            //     input.style.width = '3ch'
            // }            
        });
        min.addEventListener('click', () => {        
            +input.value--;
            if(+input.value < 1){
                +input.value++;
            }
            // if(input.value < 100 && input.value > 9){
            //     input.style.width = '2ch'
            // } else if (input.value < 10){
            //     input.style.width = '1ch'
            // }                       
        });
        input.addEventListener('change', () => {
            if(+input.value < 1){
                input.value = 1;
            }
            if(+input.value >= 999){
                input.value = 999;
            }
            // if(input.value <= 9){
            //     input.style.width = '1ch'    
            // } else if(input.value > 9 && input.value < 100){
            //     input.style.width = '2ch'
            // } else if (input.value > 99){
            //     input.style.width = '3ch'
            // }            
        });              
    }
    function count(){         
        document.querySelectorAll('.count-number').forEach(item => {            
            newCount(item);                                           
        });                
    }
    count();

    let map = document.querySelectorAll('.map');
    map.forEach(mapItem => {
        if (mapItem) {            
            let observer = new IntersectionObserver((entries, obs) => {    
                entries.forEach(entry => {    
                    if (entry.isIntersecting) {                           
                        let src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A033336e3a15a7f573012bc040f9daead26b2e3500cdaa2e7090cfabe76d3062a&amp;width=100%25&amp;height=100%&amp;lang=ru_RU&amp;scroll=true"
                        if(mapItem.classList.contains('PNZ')){
                            src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A6ef15981c2819eadacb4224d8cc3f1b41205f5b67683a740b671a1cf94f9c9b5&amp;width=100%25&amp;height=250&amp;lang=ru_RU&amp;scroll=true"
                        } else if(mapItem.classList.contains('SAR')){
                            src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A033336e3a15a7f573012bc040f9daead26b2e3500cdaa2e7090cfabe76d3062a&amp;width=100%25&amp;height=100%&amp;lang=ru_RU&amp;scroll=true"
                        }
                        let script = document.createElement('script');
                        script.async = true;
                        script.src = src;
                        document.querySelector('.map-block').replaceWith(script);     
                        obs.unobserve(entry.target);    
                    }    
                });    
            });            
            observer.observe(mapItem);    
        } 
    })
    document.querySelectorAll('.js_benefit').forEach(item => {        
        item.querySelector('.btn-close').addEventListener('click', ()=>{
            item.style.display='none';
        }) 
                                            
    })    
    if(document.querySelector('.rating')){
        document.querySelectorAll('.star-rating').forEach(item => {
            new StarRating(item, {
                clearable: true,
                tooltip: false,
                maxStars: 5,  
            })
        });    
    }                
    //tabs
    function tabs(tabName){        
        if(document.querySelector(tabName)){            
            document.querySelectorAll(tabName).forEach(item => {
                let tab = new JsTabs({
                    elm: item,
                    shouldScrollTabIntoView: false,
                });
                tab.init();                    
            });            
        }    
    }         
    //spoiler      
    document.querySelectorAll('.spoiler').forEach(item => {
        let btn = item.querySelector('.spoiler-btn');
        let container = item.querySelector('.spoiler-block');
        if(container.classList.contains('active')){           
            container.style.height = 'auto';
            // container.style.height = container.clientHeight + 'px';
        }
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            btn.classList.toggle('active');
            event.target.closest('.spoiler').classList.toggle('active');
            if(!container.classList.contains('active')){
                container.classList.add('active');
                container.style.height = 'auto';
                let height = container.clientHeight + 'px';
                container.style.height = '0px'; 
                setTimeout(function () {
                    container.style.height = height;
                }, 0);    
            } else {
                container.style.height = container.clientHeight + 'px'                                                                            
                setTimeout(function () {                    
                    container.style.height = '0px';
                }, 0); 
                // container.style.height = '0px';               
                setTimeout(function () {                    
                    container.classList.remove('active');
                }, 350);                
            }                
        })
        
    })                                                                                            
    //mobileMenu
    if(document.querySelector('#mobile-menu') && document.querySelector('a[href="#mobile-menu"]')){                                      
        let mobileMenu = new MmenuLight(document.querySelector("#mobile-menu"));
        mobileMenu.navigation({
            title: "Меню",
            theme: "dark"
        });
        let drawerMenu = mobileMenu.offcanvas();
        document.querySelectorAll('a[href="#mobile-menu"]').forEach(mmenu => {
            mmenu.addEventListener('click', function (evnt) {
                evnt.preventDefault();
                drawerMenu.open();
            })
        });
    }      
                                     
    //notice
    const notice = (message, delay = 100000) => {
        let container = document.querySelector('.js_toast_container');
        if (!container) {
            container = parseHTML(`<div aria-live="polite" aria-atomic="true">
                                            <div class="toast-container position-fixed top-0 end-0 p-3 js_toast_container" style="z-index: 10000;"> 
                                            </div>
                                        </div>`);
    
            document.querySelector('body').append(container);
        }    
        let id = Math.random().toString().substring(2);    
        let element = parseHTML(`<div class="toast" id="toast_${id}" role="alert" aria-live="assertive" data-bs-animation="true" data-bs-delay="${delay}" aria-atomic="true">
                                            <div class="d-flex align-items-center">
                                                <div class="toast-body">
                                                    ${message}
                                                </div>
                                                <button type="button" class="bg-transparent border-0 ms-auto d-flex basket-item-close btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close">
                                                    <i class="icon close lh-1"></i> 
                                                </button>
                                            </div>    
                                        </div>`);    
        container.append(element);
        let to = document.querySelector(`#toast_${id}`);        
        let t = new Toast(to);
        t.show();    
        to.addEventListener('hidden.bs.toast', () => to.remove());        
    };    
    window.noty = notice;            
    //Mask
    function isNumber(val) {
        return /^[-]?\d+$/.test(val);
    }    
    function format(targetInput, e) {        
        let tel = targetInput.value.replace(/[^0-9]/g, '');                
        let result = '';
        let position = getCursorPosition(targetInput);
        if (tel.length) {
            if ("1" !== tel[0] && "2" !== tel[0] && "3" !== tel[0] && "4" !== tel[0] && "5" !== tel[0] && "6" !== tel[0] && "9" !== tel[0] || (tel = "7" + tel), "8" === tel[0])
                result = "7";
            else {
                if ("7" !== tel[0])
                    return;
                result = tel[0]
            }
            result = '+' + result,          
            result = result + " (" + tel.substring(1, 4),
            tel.length > 3 && (result = result + ") " + tel.substring(4, 7)),
            tel.length > 6 && (result = result + " " + tel.substring(7, 9)),
            tel.length > 9 && (result = result + "-" + tel.substring(9, 11))                           
        }                                      
        targetInput.value = result;               
        if (e.keyCode === 46 || e.keyCode === 8) {                     
            setCaretPosition(targetInput, position);            
        }        
    }
    function setCaretPosition(elem, caretPos) {
        let range = void 0;    
        if (elem.createTextRange) {    
            range = elem.createTextRange();    
            range.move('character', caretPos);    
            range.select();    
        } else {    
            elem.focus();    
            if (elem.selectionStart !== undefined) {    
                elem.setSelectionRange(caretPos, caretPos);    
            }    
        }    
    }            
    function getCursorPosition(element) {    
        let el = element;    
        let pos = 0;    
        if ('selectionStart' in el) {    
            pos = el.selectionStart;    
        } else if ('selection' in document) {    
            el.focus();    
            var Sel = document.selection.createRange();    
            var SelLength = document.selection.createRange().text.length;    
            Sel.moveStart('character', -el.value.length);    
            pos = Sel.text.length - SelLength;    
        }            
        return pos;    
    }    
    function formatUp(e){
        // format(e.currentTarget, e);                
        if(isNumber(e.key) || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39){            
            format(e.currentTarget, e);            
        }    
    }   
    function formatDown(e){                       
        if(!isNumber(e.key) && e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 9){            
            e.preventDefault();
            e.stopPropagation();
            console.log(e.keyCode);                     
        }
    }   
    document.querySelectorAll('input[type="tel"]').forEach(input => {               
        input.addEventListener('keydown', formatDown)
        input.addEventListener('keyup', formatUp)            
    })
    //скролл до верха
    if(document.querySelector('.scroll-item')){        
        document.addEventListener('scroll', ()=> {                      
            if(window.pageYOffset > 300){
                document.querySelectorAll('.scroll-item').forEach(item => {
                    item.classList.add('active');
                })
            } else {
                document.querySelectorAll('.scroll-item').forEach(item => {
                    item.classList.remove('active');
                })    
            }

        })        
    }
    document.querySelectorAll('.scroll-top').forEach(item => {
        item.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })    
    })
    if(document.querySelector('.js-buy')){
        if(window.scrollY > 800){
            document.querySelector('.js-buy').classList.add('active');
        } else {
            document.querySelector('.js-buy').classList.remove('active');    
        }       
        document.addEventListener('scroll', () => {            
            if(window.scrollY > 800){
                document.querySelector('.js-buy').classList.add('active');
            } else {
                document.querySelector('.js-buy').classList.remove('active');    
            }
        })
    }      
    //call_modal
    if(document.querySelector('.js_callModal')){
        const forms = document.querySelectorAll('.js_callModal');
        const sModal = document.querySelector('.modal-success');
        forms.forEach(form => {
            form.addEventListener('submit', (e) =>{                
                e.preventDefault();                               
                const modalBoot = new Modal(sModal);                               
                modalBoot.show();                
                // setTimeout(function(){                    
                //     modalBoot.hide();
                // }, 4000)
            })
        })
    } 
    document.querySelectorAll('.modal').forEach(item => { 
        item.addEventListener('shown.bs.modal', () => {
            if(item.querySelector('input[type="tel"]')){
                item.querySelector('input[type="tel"]').focus();
            }            
        })      
    })                                       
    if(document.querySelector('.js_callFModal')){
        const forms = document.querySelectorAll('.js_callFModal');
        const sModal = document.querySelector('.modal-fail');
        forms.forEach(form => {
            form.addEventListener('submit', (e) =>{
                e.preventDefault();
                const modalBoot = new Modal(sModal);                
                modalBoot.show();                
                // setTimeout(function(){                    
                //     modalBoot.hide();
                // }, 4000)
            })
        })
    }
    //dropdawn            
    document.querySelectorAll('.dropdawn').forEach(item => {
        item.addEventListener("mouseover", function(){
            item.querySelector('.dropdawn-btn').classList.add('active');
            item.querySelector('.dropdawn-menu').classList.add('active');
        });
        item.addEventListener("mouseleave", function(){
            let timer = setTimeout(function(){
                item.querySelector('.dropdawn-menu').classList.remove('active');
                item.querySelector('.dropdawn-btn').classList.remove('active');
            }, 100);
            item.addEventListener('mouseover', function(){
                item.querySelector('.dropdawn-btn').classList.add('active');
                item.querySelector('.dropdawn-menu').classList.add('active');
                clearTimeout(timer);              
            });                        
        });         
    });          
    document.querySelectorAll('[type="file"]').forEach(el => {
        if (el.getAttribute('type') === 'file') {
            el.addEventListener('change', () => changeInputFile(el));
        }
    });
    const  changeInputFile = input => {        
        if (input.files && input.files[0]) {
            let file = input.files[0];                                    
            if (!file.type.match('image/*')) {                
                // notice('Формат файла не прошел проверку');
                input.value = "";
                return;
            } else {
                console.log(file);                
                let fileWrapper = input.closest('.js-form_wrapper');
                let fileList = fileWrapper.querySelector('.js-form_files');               
                let img = document.createElement('img');                
                img.src = URL.createObjectURL(file);                
                fileList.appendChild(img);
            }            
        }
    };
    document.querySelectorAll('.steps-spy').forEach(item => {
        function stepsSpy(item){
            new ScrollSpy(document.body, {
                target: item,                                     
            })
        }
        stepsSpy(item)
        // if(window.outerWidth >= 992){ 
        //     stepsSpy(item);  
        // }
        // window.addEventListener('resize', function(){            
        //     if(window.outerWidth >= 992){                        
        //         stepsSpy(item);
        //     }    
        // })
    })        
    
})
