const employersListing = document.getElementById('employers-listing')
const loader = document.querySelector('.loader')
getEmployers()

function getEmployers() {
    const employers = localStorage.getItem('employers')
    employersListing.innerHTML = employers
    if (!employers) {
        fetch('http://dummy.restapiexample.com/api/v1/employees').then(res => {
            if (res.status === 200) return res.json()
        }).then(val => {
            loader.style.display = 'none'
            val.data.forEach(v => {
                const div = document.createElement('div')
                div.classList.add('inner-data')
                addDataElement(v.employee_name, div)
                addDataElement(v.employee_age, div)
                addDataElement(`${v.employee_salary}֏`, div)
                employersListing.appendChild(div)
                window.localStorage.setItem('employers', employersListing.innerHTML)
            })
        })
    }
}

function addDataElement(name, parentElement) {
    const div = document.createElement('div')
    div.textContent = name
    parentElement.appendChild(div)
}
