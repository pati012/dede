"use strict";

 //burger menu

  const burger = document.querySelector('.burger');
   const burgerMenu = document.querySelector('.header__body');
 burger.addEventListener('click', burgers);
 
  function burgers(){
    burger.classList.toggle('open');
     burgerMenu.classList.toggle('active');
    document.body.style.overflow = 'visible';
     if(burger.classList.contains('open')){
        document.body.style.overflow = 'hidden';
     }
  }


  //ссылки
 
   const items = document.querySelectorAll('.menu-item');
    items.forEach(item =>{
        const menuItem = item; 
     menuItem.addEventListener('click', clicke);
    });
     function clicke(){;
        burger.classList.remove('open');
        burgerMenu.classList.remove('active');
         document.body.style.overflow = 'visible';
     }

    
     //swiper

   const swip =  new Swiper(".mySwiper", {
      loop: true,
    //  freeMode: true,
     // watchOverflow: true,
    //  conteredSlides: true,
      //observer: true,
      slidesPerView: 1.5,
      spaceBetween: 45,
      loop: true,
     
         
         
      //navigation: {
      //   nextEl: '.swiper-button-next ',
      //   prevEl: '.swiper-button-prev',
      //   },         
         
      })
      

      //scroll top

      const scrollElement = document.querySelector('.scroll-top');
       window.addEventListener('scroll', function (e){
           if(window.pageYOffset >= 2000){
            scrollElement.classList.add('act');
          }
          if(window.pageYOffset <= 1999){
            scrollElement.classList.remove('act');
          }
       });
        scrollElement.addEventListener('click', function (e){
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
          scrollElement.classList.remove('act');
        })
         

        //papup

      
        //получаем коллекцию объектов с классами, чтобы по клину на ссылку попап открывался
        const popup = document.querySelectorAll('.popup-act');
        //делает переменную в булевым значение чтобы не было 2 кликов
         const dblclick = true;
          //в перееннои будем хранить миллисекуды по исчичению которых функция обратно заработает
           var millisecond = 500;
          //делаем проверку
          if(popup.length > 0){
            for(let item = 0; item < popup.length; item++){
              const elementPopup = popup[item];
               elementPopup.addEventListener('click', function (e){
                //убираем из heref # и ставим пустоту и получаем чистое название не #popup a popup
                const elementreplece = elementPopup.getAttribute('href').replace('#', '');
                //получаем id popup и сохраняем в переменнои
                 const byIdElementPopup = document.getElementById(elementreplece);
                 popupOpen(byIdElementPopup);
                  event.preventDefault();
               })
            }
          }

          //Обращаемся к всем попапам а именно к закрывающему элементу 
           const closest = document.querySelectorAll('.popap__closest');
            if(closest.length > 0){
              for(let el = 0; el < closest.length; el++){
                const closestElement = closest[el];
                 closestElement.addEventListener('click', function (e){
                  //обращаемся к крестику, с идем по ступенькам к указаному нами родителю самому главному в данном
                  //случаи
                  popupClosest(closestElement.closest('.popap'));
                 });
              }
            }

           //делаем функцию которая будет открывать попап с проверками
            function popupOpen(current){
              //если все попапы будуть иметь true тогда добавляем и записываем в переменную
                if(current && dblclick){
                  const popupActive = document.querySelector('.popup.open');
                   //если он имеет такои класс тогда закрываем, если нет то блочим body overflow hidden
                   if(popupActive){
                     popupClosest(popupActive);
                   }
                   else{
                    bolyLock();
                   }
                   current.classList.add('open'); 
                    current.addEventListener('click', function (e){
                      if(!event.target.closest('.popap__content')){
                        popupClosest(event.target.closest('.popap'));
                      }
                    })
                }
            }
          
           //функция которая закрывает
            function popupClosest(cl, doUnlok = true){
              if(dblclick){
                cl.classList.remove('open');
                document.body.style.backgroundColor = '#00000';
                bodyUnlock();
                if(doUnlok){
                  bolyLock();
                }
              }
            }


            //функция заставляющая не дергаться элементам при включение попапа
             function bolyLock(){
              //записываем в перменную всью ширину вюпорта включая полосу проктрутки и отнемаем ширину wrapper == body выходит ширина скролла
              const padding = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
               document.body.style.paddingRight= padding;
                document.body.style.overflow = 'hidden';       
             }

             //функция показывает скролл после завершения закрытия попапа с анимациеи
              function bodyUnlock(){
                setTimeout(function (){
                  document.body.style.paddingRight = 0;
                  document.body.style.overflow = 'visible';}, millisecond);
              }


              //Итог работы
              //1) мы получили классы которые мы поставили в тег a то есть обращаемся ко всем у кого есть такои клас
              //
              //
              //