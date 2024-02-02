
import getData from "./api.js"
import { deletUser } from "./api.js";

let api = "http://localhost:3000/data"

let formEdit = document.querySelector(".formEdit");

let modalEdit = document.querySelector(".modalEdit")


let tbody = document.querySelector(".tbody")


function get(data) {
    tbody.innerHTML = "";
    data.forEach((el) => {
        let tr1 = document.createElement("tr");
        tr1.classList.add("tr1");

        let td1 = document.createElement("td");
    
        let name = document.createElement("p");
        name.innerHTML = el.name;
        name.classList.add("name");

        let td2 = document.createElement("td")

        let from = document.createElement("p")
        from.classList.add("from")
        from.innerHTML = el.from

        let td3 = document.createElement("td")

        let to = document.createElement("p")
        to.classList.add("to")
        to.innerHTML = el.to

        let td4 = document.createElement("td")

        let amount = document.createElement("p")
        amount.classList.add("amount")
        amount.innerHTML = el.amount

        let td5 = document.createElement("td")

        let spent = document.createElement("p")
        spent.classList.add("spent")
        spent.innerHTML = el.spent

        let td6 = document.createElement("td")

        let status = document.createElement("p")
        
        if (el.status) {
            status.innerHTML = "Active"
            status.classList.add("Active")
        } else  {
            status.innerHTML = "inActive"
            status.classList.add("inActive")
        }

        let td7 = document.createElement("td")

         let editBtn = document.createElement("button");
        editBtn.classList.add("btnEdit");
        editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
      </svg>`;
        
        
        editBtn.onclick = () => {
            modalEdit.showModal();

            formEdit["name1"].value = el.name
            formEdit["from1"].value = el.from
            formEdit["to1"].value = el.to
            formEdit["amount1"].value = el.amount
            formEdit["status1"].value = el.status == true ? "Active" : "inActive";
            
            formEdit.onsubmit = async (ev) => {
                ev.preventDefault();

                let user = {
                    name: formEdit["name1"].value,
                    from: formEdit["from1"].value,
                    to: formEdit["to1"].value,
                    amount: formEdit["amount1"].value,
                    spent: "2000",
                    status: formEdit["status1"].value == true ? "Active" : "inActive"

                }
                try {
                    const { data } = await axios.put(`${api}/${el.id}`, user)
                    getData()
                    modalEdit.close()

                }
                catch (error) {
                    console.log(error)
                }
                
            }  
            
        } 
        
         let deletBtn = document.createElement("button");
        deletBtn.classList.add("btnDelet");
        deletBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>`;
        
        deletBtn.onclick = () => {
            deletUser(el.id)
        }
        
        

        td1.appendChild(name);
        td2.appendChild(from);
        td3.appendChild(to);
        td4.appendChild(amount);
        td5.appendChild(spent);
        td6.appendChild(status);
        td7.append(editBtn, deletBtn)
        tr1.append(td1, td2, td3, td4, td5, td6, td7)
        tbody.appendChild(tr1)

    })
}




let closes = document.querySelector(".closes")
closes.onclick = () => {
    modalEdit.close()
}












export default get