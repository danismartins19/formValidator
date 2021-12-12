let form = document.querySelector('.validator');
let validator = {
    handleSubmit: (event) =>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');
        let elementError = document.querySelector('.errorMessage');
        elementError.style.display = 'none';
        elementError.innerHTML = '';

        inputs.forEach((el)=>{
            let check = validator.checkInput(el);
            el.style.borderColor = '#999';
            
            if(check !== true){
                
                send = false;
                validator.showError(el, check);
            }
        })

        if(send) {
            form.submit();
        }
    },

    checkInput: (input) =>{
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('/');

            for(let k in rules){
                let rDetails = rules[k].split('=');

                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Preencha todos os campos corretamente!'
                        }
                    break;

                    case 'min':
                            if(input.value.length < rDetails[1]){
                                return `Campo deve ter pelo menos ${rDetails[1]} caracteres`;
                            }
                    break;

                    case 'email':
                            if(input.value != ''){
                                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if(!regex.test(input.value.toLowerCase())){
                                    return 'E-mail inválido';
                                }
                            }
                    break;
                }
            }

        }

        return true;
    },

    showError: (input, error)=>{
        input.style.borderColor = 'red';

        let elementError = document.querySelector('.errorMessage');
        elementError.innerHTML = error;
        elementError.style.display = 'flex';
    }
}


form.addEventListener('submit', validator.handleSubmit)