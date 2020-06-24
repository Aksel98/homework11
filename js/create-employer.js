const addEmployer = document.getElementById('add-employer')
const form = document.getElementById('data-form')
let invalidData = document.createElement("div");
let isSendData = false

async function createEmployer(data) {
    const response = await fetch('http://dummy.restapiexample.com/api/v1/create', {
        method: 'post',
        body: JSON.stringify(data)
    })
    if (response.status === 200) return response.json()
}

function getDataValues() {
    const inputs = form.getElementsByTagName("input")
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].dataset.validation === 'username') {
            checkDataValidation(inputs[i])
        }
    }

    Array.from(inputs).forEach(v => {
        !v.value ? addEmployer.disabled = true : addEmployer.disabled = false
    })
}

function submitData() {
    const inputs = form.getElementsByTagName("input")
    const data = {
        name: inputs[0].value,
        age: inputs[1].value,
        salary: inputs[2].value
    }
    createEmployer(data).then(res => {
        Array.from(inputs).forEach(v => {
            if (!invalidData.innerHTML) v.value = ''
        })
        const div = document.createElement('div')
        addDataElement(res.data.name, div)
        addDataElement(res.data.age, div)
        addDataElement(`${res.data.salary}֏`, div)
        let employers = localStorage.getItem('employers')
        const parentDiv = document.createElement("div")
        parentDiv.appendChild(div)
        employers += parentDiv.innerHTML
        window.localStorage.setItem('employers', employers)
        if (this.checkDataValidation.isValid) location.href = './index.html'
    })

    if (!this.checkDataValidation.isValid) {
        invalidData.innerHTML = "Username must'nt be longer than 10 symbols";
        invalidData.classList.add('error')
    }
}

function addDataElement(name, parentElement) {
    const div = document.createElement('div')
    div.textContent = name
    parentElement.classList.add('inner-data')
    parentElement.appendChild(div)
}

function checkDataValidation(input) {
    const parentElement = input.parentElement;
    if (!(maxLength(input.value))) {
        parentElement.appendChild(invalidData);
        this.checkDataValidation.isValid = false
    } else {
        invalidData.innerHTML = '';
        this.checkDataValidation.isValid = true
    }
}

function maxLength(value) {
    return value.length <= 10
}


