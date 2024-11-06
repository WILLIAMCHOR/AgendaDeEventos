const calendario = document.querySelector('#calendario');
const semana = ['domingo','segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

/* weekdays */
/* Código pertercente ao: André Delfino
"https://github.com/DehDelfino/Calendario" */
function load (){ 
    const date = new Date() ;
    
    //mudar titulo do mês:
    if(nav !== 0){
        date.setMonth(new Date().getMonth() + nav); 
    }
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
  
    const daysMonth = new Date (year, month + 1 , 0).getDate();
    const firstDayMonth = new Date (year, month, 1);
    
    const dateString = firstDayMonth.toLocaleDateString('pt-br', {
        weekday: 'long',
        year:    'numeric',
        month:   'numeric',
        day:     'numeric',
    });
    
  
    const paddinDays = weekdays.indexOf(dateString.split(', ') [0]);
    
    //mostrar mês e ano:
    document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br',{month: 'long'})}, ${year}`;
  
    
    calendario.innerHTML ='';
  
    // criando uma div com os dias:
    for (let i = 1; i <= paddinDays + daysMonth; i++) {
        const dayS = document.createElement('div');
        dayS.classList.add('day');
  
        const dayString = `${month + 1}/${i - paddinDays}/${year}`;
  
        //condicional para criar os dias de um mês:
        if (i > paddinDays) {
            dayS.innerText = i - paddinDays;
        
            const eventDay = events.find(event=>event.date === dayString);
        
            if(i - paddinDays === day && nav === 0){
                dayS.id = 'currentDay';
            }
            if(eventDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventDay.title;
                dayS.appendChild(eventDiv);
    
            }
            dayS.addEventListener('click', ()=> openModal(dayString));
        } 
        else {
                dayS.classList.add('padding');
        }
  
      
      calendario.appendChild(dayS);
    }
} 
/* Um mero mortal como eu nem consegueria ploferar palavras para agradecer por tamanha benção */