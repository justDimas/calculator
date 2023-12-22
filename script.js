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
			firstOperand = ''
			secondOperand = ''
			sign = ''
			resultBox.innerText = '=0'
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
			if(firstOperand && secondOperand && sign)
				getResult()
			break
	}
	operationsBox.innerText = firstOperand+sign+secondOperand
}

function numberInputed(value){
	if(sign){
		if(value==='0')
			if((secondOperand.startsWith('0') || secondOperand.startsWith('-0')) && !secondOperand.match(/\./)) return
		secondOperand += value
	}else{
		if(value==='0')
			if((firstOperand.startsWith('0') || firstOperand.startsWith('-0')) && !firstOperand.match(/\./)) return
		firstOperand += value
	}
}

function signInputed(value){
	switch(value){
		case '.':
			if(!firstOperand){
				firstOperand = `0${value}`
				break
			}

			if(firstOperand && !sign) {
				if(!firstOperand.match(/\./)){
					firstOperand += (firstOperand.match(/\d/)) ? value : `0${value}`
				}
				break
			}

			if(firstOperand && sign && !secondOperand){
				secondOperand += `0${value}`
				break
			}

			if(firstOperand && sign && secondOperand) {
				if(!secondOperand.match(/\./)){
					secondOperand += (secondOperand.match(/\d/)) ? value : `0${value}`
				}
			}		
			break

		case '-':
			if(!firstOperand){
				firstOperand = value	
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
					break
				}
			}

			if(firstOperand && sign && !secondOperand){
				if(sign === '-'){
					deleteCharacter()
					sign = '+'
				}else if(sign === '+'){
					deleteCharacter()
					sign = '-'
				}else{
					secondOperand += value
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
					secondOperand+=value
					getResult()
				}
			}
			break

		case '/':
		case '*':
			if(!firstOperand) break

			if(firstOperand && !sign){ 
				if(firstOperand.match(/\d/)){
					sign = value
					operationsBox.innerText += value
				}
				break
			}

			if(firstOperand && sign && !secondOperand) break

			if(firstOperand && sign && secondOperand){
				if(firstOperand.match(/\d/)) getResult(value)
			}

			break

		case '+':
			if(!firstOperand) break

			if(firstOperand && !sign){
				if(firstOperand.match(/\d/)){
					sign = value
					operationsBox.innerText += value
				}
				break
			}

			if(firstOperand && sign && !secondOperand) break

			if(firstOperand && sign && secondOperand){
				if(firstOperand.match(/\d/)) getResult(value)
			}

			break
	}

}

function deleteCharacter(){
	if(secondOperand){
		secondOperand = secondOperand.slice(0,-1)
	}else	if(!secondOperand && sign){
		sign = ''
	}else if(!secondOperand && !sign && firstOperand){
		firstOperand = firstOperand.slice(0, -1)
	}else{
		resultBox.innerText = '=0'
	}
}

function getResult(lastSign=''){
	let parsedFirst = parseFloat(firstOperand)
	let parsedSecond = parseFloat(secondOperand)

	if(secondOperand.endsWith('%')){
		parsedSecond *= parsedFirst / 100
	}
	
	switch(sign){
		case'-':
			firstOperand = (Math.floor((parsedFirst-parsedSecond)*100000)/100000).toString()
			break
		case'+':
			firstOperand = (Math.floor((parsedFirst+parsedSecond)*100000)/100000).toString()
			break
		case'*':
			firstOperand = (Math.floor(parsedFirst*parsedSecond*100000)/100000).toString()
			break
		case'/':
			firstOperand = (Math.floor(parsedFirst/parsedSecond*100000)/100000).toString()
			break
	}
	
	secondOperand=''
	sign = lastSign
	resultBox.innerText = `=${firstOperand}`
}