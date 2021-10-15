const app = document.getElementById("app");
let columns = 14;
let rows = 14;
const cells = [];
let bombArr = []

const createBoard = (rowNumber, columnNumber) => {
	const table = document.createElement("table");
	table.id = "board";
	const tbody = document.createElement("tbody");

	table.addEventListener('click', clickButton)

	let indexCell = 0;

	for (let i = 0; i < rowNumber; i++) {
		const row = tbody.insertRow(i);

		for (let ii = 0; ii < columnNumber; ii++) {
			const cellule = row.insertCell(ii);
		
			const divWrapper = document.createElement('div')
			divWrapper.className = "divWrapper"
			divWrapper.dataset.index = indexCell;

			cellule.append(divWrapper)

			const button = document.createElement('button')
			button.dataset.indexButton = indexCell;
			cellule.append(button)



			cells.push({
				x: ii,
				y: i,
				visible: false,
				bomb: false,
				number: null,
			});

			indexCell++;
		}
	}

	table.append(tbody);
	app.append(table);

	bombGeneration(rowNumber * columnNumber);
	numberGeneration(rowNumber, columnNumber)
	
};

const bombGeneration = (cellNb) => {
	const bombsIndex = []
	const bombNb = Math.floor(cellNb * 0.1);

	for(let i = 0; i < bombNb; i++){
		let indexRandom = Math.floor(Math.random() * cellNb)

		if(bombsIndex.indexOf(indexRandom) === -1){

			bombsIndex.push(indexRandom)
			cells[indexRandom].bomb = true
			document.querySelector('[data-index="'+ indexRandom +'"]').innerHTML = '💣'

		} else {
			i--
		}
	}

	bombArr = [...bombsIndex]
};

const numberGeneration = (rowNumber, columnNumber) => {
	bombArr.forEach(bombId => {
		for(let i = 0; i < 8; i++){
			let caseIndex
			
			if(i === 0){caseIndex = bombId - rowNumber} //Case haute
			else if(i === 1 && cells[bombId].x !== rowNumber - 1){caseIndex = bombId - rowNumber + 1} // Case haute droite
			else if(i === 2 && cells[bombId].x !== rowNumber - 1){caseIndex = bombId + 1} // Case droite
			else if(i === 3 && cells[bombId].x !== rowNumber - 1){caseIndex = bombId + rowNumber + 1} // Case bas droite
			else if(i === 4){caseIndex = bombId + rowNumber} //Bas
			else if(i === 5 && cells[bombId].x !== 0){caseIndex = bombId + rowNumber - 1} //Bas gauche
			else if(i === 6 && cells[bombId].x !== 0){caseIndex = bombId - 1} //Gauche
			else if(i === 7 && cells[bombId].x !== 0){caseIndex = bombId - rowNumber - 1} //Haut gauche

			if(caseIndex && caseIndex >= 0 && caseIndex <= cells.length - 1 && !cells[caseIndex].bomb){
				cells[caseIndex].number++
				document.querySelector('[data-index="'+ (caseIndex) +'"]').innerHTML = cells[caseIndex].number
			}

		}
	})
}


const clickButton = (e) => {
	let btnIndex = e.target.dataset.indexButton

	if(btnIndex){

		e.target.remove()
		cells[btnIndex].visible = true

		if(cells[btnIndex].bomb){
			console.log('Perdu !');
		} else if(cells[btnIndex].number !== null) {
			console.log(cells[btnIndex].number)
		} else {
			console.log('vide');

			clickButtonEmpty(+btnIndex)
		}
	}
}


const clickButtonEmpty = (btnIndex) => {

	for(let i = 0; i < 8; i++){
		let caseIndex
		
		if(i === 0){caseIndex = btnIndex - rows} //Case haute
		else if(i === 1 && cells[btnIndex].x !== rows - 1){caseIndex = btnIndex - rows + 1} // Case haute droite
		else if(i === 2 && cells[btnIndex].x !== rows - 1){caseIndex = btnIndex + 1;} // Case droite
		else if(i === 3 && cells[btnIndex].x !== rows - 1){caseIndex = btnIndex + rows + 1} // Case bas droite
		else if(i === 4){caseIndex = btnIndex + rows} //Bas
		else if(i === 5 && cells[btnIndex].x !== 0){caseIndex = btnIndex + rows - 1} //Bas gauche
		else if(i === 6 && cells[btnIndex].x !== 0){caseIndex = btnIndex - 1} //Gauche
		else if(i === 7 && cells[btnIndex].x !== 0){caseIndex = btnIndex - rows - 1} //Haut gauche

		/*
            S'il caseIndex existe, est plus grand que 0, est inférieur 
            ou égale au dernier element du tableau et n'est pas de bomb
        */
		if(caseIndex && caseIndex >= 0 && caseIndex <= cells.length - 1){
			const buttonDelete = document.querySelector('[data-index-button="'+ (caseIndex) +'"]')
			if(buttonDelete) {
				buttonDelete.remove()

				/* Si cette case aussi est vide alors relancer la fonction pour elle */
				if(cells[caseIndex].number === null) {
					console.log('case vide')
					clickButtonEmpty(caseIndex)
				}
			}
			
		}



	}

}

createBoard(rows, columns);

// Mon code
// // Code similaire à celui de js2, mais plus optimisé
// const app = document.getElementById('app')
// let columns = 10;
// let rows = 10;
// const cells = []
// let bombsArr = []

// /*
//     Crée des ligne et des colonne pour le jeu 
// */
// const createBoard = (rowNumber, columnNumber) => {
//     const table = document.createElement('table')
//     table.id = "board"
//     const tbody = document.createElement('tbody')

//     table.addEventListener('click', clickButton)

//     let indexCell = 0
    
//     /* Création des lignes */
//     for(let i = 0; i< rowNumber; i++){
//         const row = tbody.insertRow(i)
        
//         /* Création des colonnes */
//         for(let j =0; j < columnNumber; j++){
//             const cellule = row.insertCell(j);
            
//             /* 
//                 Création d'un element html dans les "<td>"
//                 Pour faciliter l'ajout du style
//             */
//             const divWrapper = document.createElement('div')
//             divWrapper.className = "divWrapper"
//             divWrapper.dataset.index = indexCell;

//             cellule.append(divWrapper)

//             const button = document.createElement('button')
//             button.dataset.indexButton = indexCell;
//             cellule.append(button)
            
//             cells.push({
//                 x: j,
//                 y: i,
//                 visible: false,
//                 bomb: false,
//                 number: null
//             })

//             indexCell++
//         }
//     }
//     table.append(tbody)
//     app.append(table)

//     bombGeneration(rowNumber * columnNumber)

//     numberGeneration(rowNumber, columnNumber)

// }

// /*
//     Crée des bombes
//     En paramètre il faut donner un nombre
// */
// const bombGeneration = (cellNb) => {
//     const bombsIndex = []
//     /* Pourcentage de Bombe */
//     const bombNb = Math.floor(cellNb * 0.1)

//     for(let i = 0; i < bombNb; i++){
//         /* Génère "cell" fois des bomb */
//         let indexRandom = Math.floor(Math.random() * cellNb)

//         /*
//             Si pas Déjà présent dans le tableau ajouter 
//             sinon repartir pour un tour de boucle
//         */
//         if(bombsIndex.indexOf(indexRandom) === -1){
//             bombsIndex.push(indexRandom)
//             cells[indexRandom].bomb = true
//             document.querySelector('[data-index="'+ indexRandom +'"]').innerHTML = '💣'
//         } else {
//             i--
//         }
//     }
//     bombsArr = [...bombsIndex]
// }

// /*
//     Générer les numéros autour des bombes
// */
// const numberGeneration = (rowNumber, columnNumber) => {
//     console.log(bombsArr)
    
    
//     bombsArr.forEach(bombId => {
        
//         /* 
//         On va tester les 8 conditions (8) numéros (8) cases
//         */  
//        for(let i = 0; i < 8; i++){

//             /* Variable qui sert  */
//             let caseIndex;

//             /*
//                 Pour chaque Bombe on va tester les 8 cas
//                 rowNumber : nombre de case dans une ligne (on commande par 0)
//                 cells[bombId].x : position de la bombe sur la ligne
//                 caseIndex : position de la case cible dans différent cas
//             */
//             /* Case haute */
//             if(i === 0){caseIndex = bombId - rowNumber} 
//             /* Case haute droite */
// 			else if(i === 1 && cells[bombId].x !== rowNumber - 1){caseIndex = bombId - rowNumber + 1} 
//             /* Case droite */
// 			else if(i === 2 && cells[bombId].x !== rowNumber - 1){caseIndex = bombId + 1} 
//             /* Case bas droite */
// 			else if(i === 3 && cells[bombId].x !== rowNumber - 1){caseIndex = bombId + rowNumber + 1} 
//             /* Bas */
// 			else if(i === 4){caseIndex = bombId + rowNumber} 
//             /* Bas gauche */
// 			else if(i === 5 && cells[bombId].x !== 0){caseIndex = bombId + rowNumber - 1}
//             /* Gauche */
// 			else if(i === 6 && cells[bombId].x !== 0){caseIndex = bombId - 1} 
//             /* Haut gauche */
// 			else if(i === 7 && cells[bombId].x !== 0){caseIndex = bombId - rowNumber - 1} 

//             /*
//                 S'il caseIndex existe, est plus grand que 0, est inférieur 
//                 ou égale au dernier element du tableau et n'est pas de bomb
//             */
//             if(caseIndex && caseIndex >= 0 && caseIndex <= cells.length - 1 && !cells[caseIndex].bomb){
//                 /* Alors on incrémente de 1 dans sa propriété number cells */
//                 cells[caseIndex].number++
//                 /* On cible l'element HTML correspondant et on lui assigne la nouvelle valeur de number */
//                 document.querySelector('[data-index="'+ (caseIndex) +'"]').innerHTML = cells[caseIndex].number
//             }

//         }

//         /*
//             Si la case à gauche n'est pas une bombe et si la case de gauche est sur
//             le même axe y (c'est à dire : si la bombe est tout à gauche sur la ligne
//             alors forcement le 1 sera placer au haut a droite et on ne veut pas ça)
//         */
//         // if(!cells[bombId -1].bomb && cells[bombId].y === cells[bombId -1].y){
//         //     cells[bombId -1].number = 1
//         //     /* Alors on lui attribut 1 */
//         //     document.querySelector('[data-index="'+ (bombId - 1) +'"]').innerHTML = cells[bombId - 1].number
//         // }

//     })
// }

// /* Detection clique sur une case */
// const clickButton = (e) => {
//     let btnIndex = e.target.dataset.indexButton

//     if(btnIndex){
//         cells[btnIndex].visible = true
//         e.target.remove()
//         if(cells[btnIndex].bomb){
//             console.log('bomb');
//         } else if(cells[btnIndex].number !== null){
//         } else {
//             clickButtonEmpty(+btnIndex)

//             /* 
//                 Vérifier les case à gauche, droite en haut et en bas,
//                 Tant qu'elle se de type vide alors afficher
//             */
//             // displayEmptyBox(btnIndex, e) 
//             // console.log(cells[btnIndex])
//         }
//     }
// }

// const clickButtonEmpty = (btnIndex) => {

//     for(let i = 0; i < 8; i++){

//         let caseIndex;

//         /* Case haute */
//         if(i === 0){caseIndex = btnIndex - rows} 
//         /* Case haute droite */
//         else if(i === 1 && cells[btnIndex].x !== rows - 1){caseIndex = btnIndex - rows + 1} 
//         /* Case droite */
//         else if(i === 2 && cells[btnIndex].x !== rows - 1){caseIndex = btnIndex + 1} 
//         /* Case bas droite */
//         else if(i === 3 && cells[btnIndex].x !== rows - 1){caseIndex = btnIndex + rows + 1} 
//         /* Case Bas */
//         else if(i === 4){caseIndex = btnIndex + rows} 
//         /* Bas gauche */
//         else if(i === 5 && cells[btnIndex].x !== 0){caseIndex = btnIndex + rows - 1}
//         /* Gauche */
//         else if(i === 6 && cells[btnIndex].x !== 0){caseIndex = btnIndex - 1} 
//         /* Haut gauche */
//         else if(i === 7 && cells[btnIndex].x !== 0){caseIndex = btnIndex - rows - 1} 

//         /*
//             S'il caseIndex existe, est plus grand que 0, est inférieur 
//             ou égale au dernier element du tableau et n'est pas de bomb
//         */
//         if(caseIndex && caseIndex >= 0 && caseIndex <= cells.length - 1){
//             const buttonDelete = document.querySelector('[data-index-button="'+ (caseIndex) +'"]')
//             if(buttonDelete) {
//                 buttonDelete.remove()

//                 /* Si cette case aussi est vide alors relancer la fonction pour elle */
//                 if(cells[caseIndex].number === null) {
//                     console.log('case vide')
//                     clickButtonEmpty(caseIndex)
//                 }
//             }
            
//         }

//     }
// }




















// /* Fonction pour tester les cases vides et les afficher */
// const displayEmptyBox = (btnIndex, e) => {

//     let caseIndex;

//     /* 
//         Si la case du dessus exsiste et 
//         qu'elle n'est ni bombe, ni chiffre et 
//         elle va prendre qu'un seul chiffre a afficher
//         Quand on se rend compte qu'on a afficher un chiffre la boucle s'arrête
//     */ 
//     /* Haut */ 
//     // while(cells[btnIndex].y > 0 && cells[btnIndex].bomb == false && cells[btnIndex].number == null){
//     //     if(cells[btnIndex - rows] && cells[btnIndex - rows].bomb == false){
//     //         console.log('Haut Ok')
//     //         caseIndex = btnIndex - rows
//     //         cells[caseIndex].visible = true 
//     //         if(e.target){
//     //             cells[btnIndex].visible = true 
//     //             e.target.remove()
//     //         }
//     //         removeCase(caseIndex)
//     //     }
        
//     //     if(cells[btnIndex].y !== 0){
//     //         btnIndex = btnIndex - rows
//     //     }
//     //     console.log(btnIndex)
//     // }
//     /* Haut Gauche */ 
//     // while(cells[btnIndex].y > 0 && (cells[btnIndex].x > 0) && cells[btnIndex].bomb == false && cells[btnIndex].number == null){
//     //     // console.log('test')
//     //     if(cells[btnIndex - rows - 1] && cells[btnIndex - rows - 1].bomb == false){
//     //         console.log('Haut Ok')
//     //         caseIndex = btnIndex - rows - 1
//     //         cells[caseIndex].visible = true 
//     //         if(e.target){
//     //             cells[btnIndex].visible = true 
//     //             e.target.remove()
//     //         }
//     //         removeCase(caseIndex)
//     //     }
        
//     //     // if(cells[btnIndex].y !== 0){
//     //         btnIndex = btnIndex - rows - 1
//     //     // }
//     //     console.log(btnIndex)
//     // }
//     // /* Haut Droite */ 
//     // while(cells[btnIndex].y > 0 && (cells[btnIndex].x < (rows - 1)) && cells[btnIndex].bomb == false && cells[btnIndex].number == null){
//     //     // console.log('test')
//     //     if(cells[btnIndex - rows + 1] && cells[btnIndex - rows + 1].bomb == false){
//     //         console.log('Haut Ok')
//     //         caseIndex = btnIndex - rows + 1
//     //         cells[caseIndex].visible = true 
//     //         if(e.target){
//     //             cells[btnIndex].visible = true 
//     //             e.target.remove()
//     //         }
//     //         removeCase(caseIndex)
//     //     }
        
//     //     // if(cells[btnIndex].y !== 0){
//     //         btnIndex = btnIndex - rows + 1
//     //     // }
//     //     console.log(btnIndex)
//     // }
//     // console.log(columns - 1)
//     // console.log(cells[btnIndex].y)
//     // console.log(parseInt(btnIndex))
//     // console.log(btnIndex - rows)
//     // console.log(cells[parseInt(btnIndex) + rows])

//     /* Bas */ 
//     // while(cells[btnIndex].y < columns - 1 && cells[btnIndex].bomb == false && cells[btnIndex].number == null){
//     //     if(cells[parseInt(btnIndex) + rows].bomb == false){
//     //         console.log('Haut Ok')
//     //         console.log('Haut Ok')
//     //         caseIndex = parseInt(btnIndex) + rows
//     //         cells[caseIndex].visible = true 
//     //         if(e.target){
//     //             cells[btnIndex].visible = true 
//     //             e.target.remove()
//     //         }
//     //         removeCase(caseIndex)
//     //     }
//     //     if(cells[btnIndex].y !== (columns -1)){
//     //         btnIndex = parseInt(btnIndex) + rows
//     //     }
//     //     console.log(btnIndex)
//     // }

//     // console.log(cells[btnIndex - rows - 1].bomb)
    
//     /* Bas Gauche */ 
//     // if(cells[btnIndex + rows - 1].bomb == false && cells[btnIndex - rows - 1].number == null){
//     //     console.log('test')
//         // while(cells[btnIndex].y < columns - 1 && (cells[btnIndex].x > 0) && cells[btnIndex].bomb == false && cells[btnIndex].number == null){
//         //     if(cells[parseInt(btnIndex) + rows - 1].bomb == false){
//         //         console.log('Haut Ok')
//         //         console.log('Haut Ok')
//         //         caseIndex = parseInt(btnIndex) + rows - 1
//         //         cells[caseIndex].visible = true 
//         //         if(e.target){
//         //             cells[btnIndex].visible = true 
//         //             e.target.remove()
//         //         }
//         //         removeCase(caseIndex)
//         //     }
//         //     if(cells[btnIndex].y !== (columns -1)){
//         //         btnIndex = parseInt(btnIndex) + rows - 1
//         //     }
//         //     console.log(btnIndex)
//         // }
//     }
//     /* Bas Droite */ 
//     // if(cells[btnIndex + rows + 1].bomb == false && cells[btnIndex - rows - 1].number == null) {
//     //     while(cells[btnIndex].y < columns - 1 && (cells[btnIndex].x < (rows - 1)) && cells[btnIndex].bomb == false && cells[btnIndex].number == null){
//     //         if(cells[parseInt(btnIndex) + rows + 1].bomb == false){
//     //             console.log('Haut Ok')
//     //             console.log('Haut Ok')
//     //             caseIndex = parseInt(btnIndex) + rows + 1
//     //             cells[caseIndex].visible = true 
//     //             if(e.target){
//     //                 cells[btnIndex].visible = true 
//     //                 e.target.remove()
//     //             }
//     //             removeCase(caseIndex)
//     //         }
//     //         if(cells[btnIndex].y !== (columns -1)){
//     //             btnIndex = parseInt(btnIndex) + rows + 1
//     //         }
//     //         console.log(btnIndex)
//     //     }
//     // }
// // }

// const removeCase = (caseIndex) => {
//      /*
//         S'il caseIndex existe, est plus grand que 0, est inférieur 
//         ou égale au dernier element du tableau
//     */
//     if(caseIndex && caseIndex >= 0 && caseIndex <= cells.length - 1){
//         // console.log(caseIndex)
//         /*
//             On cible l'element HTML correspondant et on le supprime pour enlever le bouton
//             et faire apparaitre la case
//         */
//         document.querySelector('[data-index-button="'+ (caseIndex) +'"]').remove()
//     }
// }

// const emptyTest = (btnIndex) => {

//     // console.log(btnIndex)
//     // console.log(parseInt(btnIndex) - (rows))
//     /* 
//     On va tester les 8 conditions (8) numéros (8) cases
//     */
//     for(let i = 0; i < 8; i++){

//         /* Variable qui sert  */
//         let caseIndex;

//         /*
//             Pour Le paramètre donnée on va tester les cases au alentours
//             rowNumber : nombre de case dans une ligne (on commande par 0)
//             cells[bombId].x : position de la bombe sur la ligne
//             caseIndex : position de la case cible dans différent cas
//         */
//         /* Case haute */
//         if(i === 0){
//             caseIndex = btnIndex - rows
//             console.log('Haut vide')
//         } 
//         /* Case haute droite */
//         else if(i === 1 && cells[btnIndex].x !== rows - 1){
//             caseIndex = btnIndex - rows + 1
//             // console.log('Haut droite vide')
//         } 
//         /* Case droite */
//         else if(i === 2 && cells[btnIndex].x !== rows - 1){
//             caseIndex = btnIndex + 1
//             // console.log('Droite vide')
//         } 
//         /* Case bas droite */
//         else if(i === 3 && cells[btnIndex].x !== rows - 1){
//             // console.log('Bas droite vide')
//             caseIndex = btnIndex + rows + 1
//         } 
//         /* Bas */
//         else if(i === 4){
//             // console.log('Bas vide')
//             caseIndex = btnIndex + rows
//         } 
//         /* Bas gauche */
//         else if(i === 5 && cells[btnIndex].x !== 0){
//             // console.log('Bas Gauche vide')
//             caseIndex = btnIndex + rows - 1
//         }
//         /* Gauche */
//         else if(i === 6 && cells[btnIndex].x !== 0){
//             // console.log('Gauche vide')
//             caseIndex = btnIndex - 1
//         } 
//         /* Haut gauche */
//         else if(i === 7 && cells[btnIndex].x !== 0){
//             // console.log('Haut Gauche vide')
//             caseIndex = btnIndex - rows - 1
//         } 
//     }
// }

// createBoard(rows, columns)






// /*_______________________________________________________________________*/










// // Le code que j'ai fait !
// // const numberGeneration = () =>{
// //     let leftCase = ''
// //     let rightCase = ''
// //     let topCase = ''
// //     let bottomCase = ''
// //     let topLeftCase = ''
// //     let topRightCase = ''
// //     let bottomLeftCase = ''
// //     let bottomRightCase = ''

// //     cells.forEach((bomb, index) => {

// //         if((index-1) >= 0){
// //             leftCase = document.querySelector('[data-index="'+ (index-1) +'"]')
// //         }
// //         if(index+1 <= (cells.length-1)){
// //             rightCase = document.querySelector('[data-index="'+ (index+1) +'"]')
// //         }
// //         if((index-15) >= 0) {
// //             topCase = document.querySelector('[data-index="'+ (index-15) +'"]')
// //         }
// //         if((index+15) <= (cells.length-1)){
// //             bottomCase = document.querySelector('[data-index="'+ (index+15) +'"]')
// //         } 
// //         if((index-16) >= 0){
// //             topLeftCase = document.querySelector('[data-index="'+ (index-16) +'"]')
// //         }
// //         if(index-14 >= 0){
// //             topRightCase = document.querySelector('[data-index="'+ (index-14) +'"]')
// //         }
// //         if((index+14) <= (cells.length-1)) {
// //             bottomLeftCase = document.querySelector('[data-index="'+ (index+14) +'"]')
// //         }
// //         if((index+16) <= (cells.length-1)){
// //             bottomRightCase = document.querySelector('[data-index="'+ (index+16) +'"]')
// //         }

// //         if(bomb.bomb === true){
// //             if(bomb.y !== cells[index-1].y){
// //                 console.log('Pas sur la même ligne !')
// //                 return null
// //             }
// //             // Vérifife s'il sont sur la même ligne
// //             if(bomb.y !== cells[index+1].y) {
// //                 console.log('Pas sur la même ligne2 !')
// //                 return null
// //             }
// //             if(leftCase.innerHTML !== "💣"){
// //                 if(topLeftCase.innerHTML === "💣" && bottomLeftCase.innerHTML === "💣"){
// //                     leftCase.innerHTML = '3'
// //                 } 
// //                 if(topLeftCase.innerHTML === "💣" || bottomLeftCase.innerHTML === "💣"){
// //                     leftCase.innerHTML = '2'
// //                 } else {
// //                     leftCase.innerHTML = '1'
// //                 }
// //             }    
// //             if(rightCase.innerHTML !== "💣") {
// //                 if(topRightCase.innerHTML === "💣" && bottomRightCase.innerHTML === "💣"){
// //                     leftCase.innerHTML = '3' 
// //                 } 
// //                 if(topRightCase.innerHTML === "💣" || bottomRightCase.innerHTML === "💣"){
// //                     leftCase.innerHTML = '2' 
// //                 } else {
// //                     rightCase.innerHTML = "1"
// //                 }
// //             } 
// //             if(topCase.innerHTML !== "💣") {
// //                 if(topRightCase.innerHTML === "💣" && topLeftCase.innerHTML === "💣"){
// //                     topCase.innerHTML = '3'       
// //                 }
// //                 if(topRightCase.innerHTML === "💣" || topLeftCase.innerHTML === "💣"){
// //                     topCase.innerHTML = '2'       
// //                 } else {
// //                     topCase.innerHTML = '1'
// //                 }
// //             }
// //             if(bottomCase.innerHTML !== "💣") {
// //                 if(bottomRightCase.innerHTML === "💣" && bottomLeftCase.innerHTML === "💣"){
// //                     bottomCase.innerHTML = "3"
// //                 }
// //                 if(bottomRightCase.innerHTML === "💣" || bottomLeftCase.innerHTML === "💣"){
// //                     bottomCase.innerHTML = "2"
// //                 } else {
// //                     bottomCase.innerHTML = "1"
// //                 }
// //             }
// //             else {
// //                 console.log('voici la bombe')
// //             }
// //         }
// //     })
// // }













// // const numberOfCase = columns * rows
// // const numberOfBumb = Math.round((columns * rows) * 0.1);
// // const randomCaseTable = [];

// // const bombGeneration = (display = false) => {
    
// //     for(let i = 0; i < numberOfBumb; i++){
        
// //         const randomId = Math.floor(Math.random() * rows) + '-' + Math.floor(Math.random() * columns)
// //         console.log(randomId)
// //         // Random number in format '..-..'
// //         const randomId = Math.floor(Math.random() * rows) + '-' + Math.floor(Math.random() * columns)
// //         // If is not existing in randomCaseTable
// //         if(randomCaseTable.indexOf(randomId) === -1) {
// //             randomCaseTable.push(randomId);
// //         }
// //         console.log(randomCaseTable)
// //     }

// //     // Catch each HTML td element and set it black color
// //     // with condition if displaying
// //     randomCaseTable.forEach(e => {
// //         const catchElement = document.getElementById(e);    
// //         if(display == true){
// //             catchElement.style.backgroundColor = 'black'
// //         }
// //     })
// // }

// // bombGeneration()
