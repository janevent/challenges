const letterValues = {'E': '12', 'A' : '9', 'I' : '9', 'O' : '8', 'M' : '2', 'T': '6', 'C' : '2',
'N' : '6',
'R' : '6',
'L' : '4',
'S' : '4',
'U' : '4',
'D' : '4','G' : '3',
'B' : '2',
'P' : '2','F' : '2',
'H' : '2',
'V' :'2',
'W': '2',
'Y' : '2',
'K' :'1',
'J' : '1',
'X' : '1',
'Q' : '1',
'Z' : '1'}

//calculatePoints(word, string) cat, mtoa_, 

function calculatePoints(word, str){
    const titleMap = new FrequencyMap(str)
    console.log('titleMap', titleMap)
    console.log('_', titleMap['_'])
    var points = 0
    for(const letter of word){
        //debugger
        if(letter in titleMap && titleMap[letter] > 0 ){
            titleMap[letter]--
            points+=parseInt(letterValues[letter])
        }else if('_' in titleMap && titleMap['_'] > 0){
            titleMap['_']--
        }else{
            return 0
        }
    }

    return points
}

function FrequencyMap(str){
    for(let letter of str){
        this[letter] ??=0
        this[letter]++
    }
}

//given a list of words and tiles what is the highest score with word
//1. make a list of max possible scores, and put them in descending order
// [['monkey',24], ['cheese', 19]]
//2. check tiles with words from max possible scores

function findHighestMatch(words, tiles){
    const maxPossibleScores = []

    for(const word of words){
        let score = 0;
        for(const letter of word){
            const capLetter = letter.toUpperCase()
            score+=parseInt(letterValues[capLetter])
        }
        maxPossibleScores.push([word, score])
    }
    maxPossibleScores.sort( (a,b) => b[1] - a[1])
    console.log(maxPossibleScores)

    let maxScore = 0
    const dictTiles = {}
    for(const letter of tiles){
        const capLetter = letter.toUpperCase()
        dictTiles[capLetter] ||=0
        dictTiles[capLetter]++
    }

    console.log('dictTiles', dictTiles)

    for(const [word, score] of maxPossibleScores){

        if(maxScore > score) break
        let currentScore = 0
        for(const letter of word){
            const capLetter = letter.toUpperCase()
            console.log(capLetter, word)
            if(capLetter in dictTiles && dictTiles[capLetter] > 0){
                currentScore+=parseInt(letterValues[capLetter])
                dictTiles[capLetter]--
            }else if('_' in dictTiles && dictTiles['_'] > 0){
                dictTiles['_']--
            }else{
                currentScore = 0
                break
            }
        }
        maxScore = Math.max(maxScore, currentScore)
    }
    return maxScore
}

//console.log(calculatePoints('CAT', 'MTAO_'))
console.log(findHighestMatch(['simple', 'children', 'difficult', 'bathtime'], 'renchilddd'))
