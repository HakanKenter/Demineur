const app = document.getElementById('app')
let columns = 15;
let rows = 15;

const createBoard = (rowNumber, columnNumber) => {
    const table = document.createElement('table')
    table.id = "board"
    const tbody = document.createElement('tbody')
    
    for(let i = 0; i< rowNumber; i++){
        const row = document.createElement('tr')
        
        for(let j =0; j < columnNumber; j++){
            const cellule = document.createElement('td')
            const divWrapper = document.createElement("div")
            divWrapper.className = "celluleWrapper"
            
            cellule.append(divWrapper)
            row.append(cellule)
        }

        tbody.append(row)
    }
    table.append(tbody)
    app.append(table)
    console.log(table)
}

var startTime = performance.now()

createBoard(rows, columns)

var endTime = performance.now();

console.log("L'appel de doSomething a demandé " + (endTime - startTime) + " millisecondes.")