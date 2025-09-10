const form = document.querySelector('.form');
const nameInput = document.querySelector('.input-name');
const surnameInput = document.querySelector('.input-surname');
const birthInput = document.querySelector('.input-birth');
const emailInput = document.querySelector('.input-email');
const infoDiv = document.querySelector('.information');
const btn = document.querySelector('.submit-button');

let editIndex = null
const personInfo = JSON.parse(localStorage.getItem('personInfo')) || [];

function renderPeople() {
    infoDiv.innerHTML = '';

    personInfo.forEach((person, index, arr) => {
        const personDiv = document.createElement('div');
        personDiv.classList.add('person');

        personDiv.innerHTML = `
            <p class="personDivP"><strong>Name:</strong> ${person.name}</p>
            <p class="personDivP"><strong>Surname:</strong> ${person.surname}</p>
            <p class="personDivP"><strong>Birth Date:</strong> ${person.birth}</p>
            <p class="personDivP"><strong>Email:</strong> ${person.email}</p>
            <button class="delete-button">Delete</button>
            <button class="edit-button">Edit</button>
            <hr>
        `;
        const deleteButton = personDiv.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            
            personInfo.splice(index, 1);
            localStorage.setItem('personInfo', JSON.stringify(personInfo));
            renderPeople();
            

        });
        const editButton = personDiv.querySelector('.edit-button');

        editButton.addEventListener('click', () => {
            nameInput.value = person.name;
            surnameInput.value = person.surname;
            birthInput.value = person.birth;
            emailInput.value = person.email;
            editIndex = index;
            btn.textContent = "Save";
        });
       
        infoDiv.appendChild(personDiv);
    });
}
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (
        nameInput.value.trim() !== "" ||
        surnameInput.value.trim() !== "" ||
        birthInput.value.trim() !== "" ||
        emailInput.value.trim() !== ""
    ) {
        const person = {
            name: nameInput.value,
            surname: surnameInput.value,
            birth: birthInput.value,
            email: emailInput.value
        };

        if (editIndex !== null) {
            personInfo[editIndex] = {
                name: nameInput.value,
                surname: surnameInput.value,
                birth: birthInput.value,
                email: emailInput.value
            };
            btn.textContent = "Submit";
        }
        else {
            personInfo.push(person);
        }
        localStorage.setItem('personInfo', JSON.stringify(personInfo));

        renderPeople();
        form.reset();
    }
    else{
        alert("iltimos, kamida bitta maydonni to'ldiring!");
    }
});

renderPeople();
