require('zangdar');

document.querySelectorAll('.zangdar__wizard').forEach(form => {
    window.wizard = new Zangdar(form, {        
        onValidation(step, fields, form) {
            if (step.labeled('2')) {
                const err_message = form.querySelector('.error__message')
                if (err_message) {
                    err_message.parentNode.removeChild(err_message)
                }                
                return true
            }
            return true
        },
        onSubmit(e) {
            e.preventDefault()
            this.getCurrentStep().active = false
            this.getCurrentStep().completed = true                    
            return false
        }
    })       
    document.querySelectorAll('.next-step').forEach(item => {
        item.addEventListener('click', () => {  
            document.querySelector('.choosing-block').scrollIntoView({block: "start", behavior: "smooth"});            
        })
    })
    document.querySelectorAll('.prev-step').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.choosing-block').scrollIntoView({block: "start", behavior: "smooth"});                        
        })
    })
})