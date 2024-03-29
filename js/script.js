window.addEventListener('DOMContentLoaded',function(){
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a){
        for( let i = a; i< tabContent.length; i++)
        {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }    

    hideTabContent(1);

    function showTabContent(b){
        if (tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click',function(event){
        let target = event.target;
        if( target && target.classList.contains('info-header-tab')){
            for( let i = 0;i< tab.length; i++){
                if (target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2019-10-08';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),//miliseconds
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60/60) % 24);
            //hours = Math.floor((t/(1000*60*60)));

            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds 
            };

    }

    function setClock(id,endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock,1000);

        function updateClock(){

            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0){
                clearInterval(timeInterval);
                //task 1
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
            //task 2
            if(t.hours<10){
                hours.textContent = '0'+t.hours;
            }
            if(t.minutes<10){
                minutes.textContent = '0'+t.minutes;
            }
            if(t.seconds<10){
                seconds.textContent = '0'+t.seconds;
            }

        }    
            

    }

    setClock('timer', deadline);

    //Modal

    let more = document.querySelector('.more'),
        tabMore = document.querySelector('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close =document.querySelector('.popup-close');
    
    more.addEventListener('click', ()=>{
        overlay.style.display = 'block';
        this.classList.add('.more-splash');
        document.body.style.overflow = 'hidden';
    });
    tabMore.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('.more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', ()=>{
        overlay.style.display = 'none';
        more.classList.remove('.more-splash');
        document.body.style.overflow = '';
    });
    
    // Form

    let message = {
        loading: 'Загрузка ...',
        success: 'Спасибо, скоро мы с вами свяжемся !',
        failure: 'Что-то пошло не так'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);

        request.addEventListener('readystatechange', ()=>{
            if (request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            }else if (request.readyState === 4 && request.status == 200){

                statusMessage.innerHTML = message.success;
            } else{
                statusMessage.innerHTML = message.failure;
            }
        });
    });    

});