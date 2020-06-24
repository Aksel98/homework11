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
                div.appendChild(addIcons('img/delete-icon.png', div, v.id))
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

function addIcons(src, parentElement, deleteId) {
    const iconsList = document.createElement('div')
    const deleteIcon = document.createElement('img')
    deleteIcon.src = src
    iconsList.classList.add('icons-list')
    iconsList.appendChild(deleteIcon)
    parentElement.appendChild(iconsList)
    deleteIcon.onclick = function () {
        deleteEmployer(deleteId).then(res => {
            console.log(res)
        })
    }
    return iconsList
}

async function deleteEmployer(id) {
    let res = await fetch(`http://dummy.restapiexample.com/api/v1/delete/${id}`, {method: 'delete'})
    if (res.status === 200) return res.json()
}
