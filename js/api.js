
import get from "./dom.js"

let api = "http://localhost:3000/data"
let search = document.querySelector(".search")


async function getData() {
    try {
        let { data } = await axios.get(api)
        get(data)

        search.oninput = () => {
            let lower = search.value.toLowerCase().trim()

            let newD = data.filter((el) => {
                return el.name.toLowerCase().trim().includes(lower)
            })
            get(newD)
        }

    }
    catch (error) {
        console.log(error)
    }
}


// let search = document.querySelector(".search")

// search.oninput = async () => {
//     try {
//        const { data } = await axios.get(`${api}?q=${search.value}`)
//       get(data)

//     }
//     catch (error) {
//         console.log(error)
//     }
// }

let select = document.querySelector(".select")
let select2 = document.querySelector(".select2")

select.onchange = async () => {
    try {
        if (select.value === "All Status") {
            getData()
        }
        else {
            const { data } = await axios.get(`${api}?status=${select.value}`)
            console.log(data);
            get(data)
        }
    }
    catch (error) {
        console.log(error)
    }
}

select2.oninput = async () => {
    try {
        if (select2.value == "Choose category") {
            getData()
        }
        else {
            const { data } = await axios.get(`${api}?name=${select2.value}`)
            get(data)
        }

    }
    catch (error) {
        console.log(error)
    }
}



async function deletUser(id) {
    try {
        const { data } = await axios.delete(`${api}/${id}`)
        getData()
    }
    catch (error) {
        console.log(error)
    }
}


let modalAdd = document.querySelector(".modalAdd")
let formAdd = document.querySelector(".formAdd")
let btnAdd = document.querySelector(".btnAdd");
let clos = document.querySelector(".clos")
let x = document.querySelector(".x")


async function addUser(user) {
    try {
        const { data } = await axios.post(api, user)
        getData()
    }
    catch (error) {
        console.log(error)
    }
}

formAdd.onsubmit = async (event) => {
    event.preventDefault()
    let user = {
        name: formAdd["name"].value,
        from: formAdd["from"].value,
        to: formAdd["to"].value,
        amount: formAdd["amount"].value,
        spent: "2000",
        status: formAdd["status"].value
    }

    addUser(user)
    formAdd.reset()
    modalAdd.close()
}


btnAdd.onclick = () => {
    modalAdd.showModal()
}

clos.onclick = () => {
    modalAdd.close()
}

x.onclick = () => {
    modalAdd.close()
}






export { deletUser }
export default getData