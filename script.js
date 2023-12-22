const operationsBox = document.querySelector('.operations')
const resultBox = document.querySelector('.result')

let firstOperand = ''
let secondOperand = ''
let sign = ''

document.querySelector('.body').addEventListener('click', e=>sortValues(e))

function sortValues(e){
	if(!e.target.closest('.button')) return

	const value = e.target.dataset.value
	
	switch(value) {
		case 'mr': break
		case 'm+': break
		case 'm-': break
		
		case 'ac': 
			operationsBox.innerText = ''
			firstOperand = ''
			secondOperand = ''
			sign = ''
			break
		
		case 'del':
			deleteCharacter()
			break

		case '9':
		case '8':
		case '7':
		case '6':
		case '5':
		case '4':
		case '3':
		case '2':
		case '1':
		case '0':
			numberInputed(value)
			break

		case '.':
		case '-':
		case '%':
		case '/':
		case '*':
		case '+':
			signInputed(value)
			break

		case '=':
			break
	}
	console.log({'1':firstOperand, '2':secondOperand, 's':sign, 'op': operationsBox.innerText});
}

function numberInputed(value){
	if(operationsBox.innerText.endsWith('0')) 
		deleteCharacter()	
	if(sign)
		secondOperand+=value
	if(!sign)
		firstOperand+=value
	operationsBox.innerText += value
}

function signInputed(value){
	switch(value){
		case '.':
			if(!firstOperand){
				firstOperand = `0${value}`
				operationsBox.innerText += `0${value}`
				break
			}

			if(firstOperand && !sign) {
				if(!firstOperand.match(/\./)){
					operationsBox.innerText += (firstOperand.match(/\d/)) ? value : `0${value}` 
					firstOperand += (firstOperand.match(/\d/)) ? value : `0${value}`
				}
				break
			}

			if(firstOperand && sign && !secondOperand){
				secondOperand += `0${value}`
				operationsBox.innerText += `0${value}`
				break
			}

			if(firstOperand && sign && secondOperand) break		

		case '-':
			if(!firstOperand){
				firstOperand = value	
				operationsBox.innerText += value
				break
			}

			if(firstOperand && !sign){
				if(firstOperand === '-'){
					deleteCharacter()
					firstOperand = ''
					break
				}
				if(firstOperand.match(/\d/)){
					sign = value
					operationsBox.innerText += value
					break
				}
			}

			if(firstOperand && sign && !secondOperand){
				if(sign === '-'){
					deleteCharacter()
					sign = '+'
					operationsBox.innerText += '+'
				}else if(sign === '+'){
					deleteCharacter()
					sign = '-'
					operationsBox.innerText += '-'
				}else{
					secondOperand += value
					operationsBox.innerText += value
				}
				break	
			}

			if(firstOperand && sign && secondOperand){
				if(secondOperand.match(/\d/))	getResult(value)
			}
		
			break

		case '%':
			if(!firstOperand) break

			if(firstOperand && !sign) break

			if(firstOperand && sign && !secondOperand) break

			if(firstOperand && sign && secondOperand){
				if(firstOperand.match(/\d/)){
					//TODO
				}
				break
			}
			break

		case '/':
		case '*':
			if(!firstOperand) break

			if(firstOperand && !sign){ 
				if(firstOperand.match(/\d/)){
					sign = value
					operationsBox.innerText += value
					break
				}
			}

			if(firstOperand && sign && !secondOperand) break

			if(firstOperand && sign && secondOperand){
				if(firstOperand.match(/\d/)) getResult(value)
				break
			}
			break

		case '+':
			if(!firstOperand) break

			if(firstOperand && !sign){
				if(firstOperand.match(/\d/)){
					sign = value
					operationsBox.innerText += value
				}
			}

			if(firstOperand && sign && !secondOperand) break

			if(firstOperand && sign && secondOperand){
				if(firstOperand.match(/\d/)) getResult(value)
				break
			}
			break
	}

}

function deleteCharacter(){
	//TODO  
	operationsBox.innerText = operationsBox.innerText.slice(0, -1) 
}

function getResult(value){
	//TODO
}