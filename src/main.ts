import $ from "jquery"
/* declaração de coisas uteis talvez*/
/* declaração de componentes */
function word(word: string){
  return(
    $('<p>').attr('id', 'word').text(`${word}`).appendTo(app)
  )
}
function phonetics(phonetics: Array<number>){
  //Essa merda tá tão remendada que me impressiona funcionar
  const content = $('<div>').attr('id', 'phonetics')
  const lengh = phonetics.length - 1
  for(var i = 0; i <= lengh; i++){
    const keys = Object.keys(phonetics[i]) //n lembro pq criei essa variavel, mas vou deixar por precaução
    for(const [key, value] of Object.entries((phonetics[i]))){
      if(key == "license"){      
        const licenseName = $('<p>').attr(`id`, `license_${value.name}`).text(`${value.name}`)       
        const licenseUrl = $('<a>').attr({id: `licence_${value.url}`, href: `${value.url}`}).text(`${value.url}`)
        content.append(licenseName, licenseUrl)
      }else if(key == "audio"){
        const audioTag = $("<audio controls>").attr("class", "audioTag")
        const audioUrl = $('<source>').attr({class: "audio", src: `${value}`, type: "audio/mp3"})
        audioTag.append(audioUrl)
        content.append(audioTag, $("<br>"))
      }else if(key == "sourceUrl"){/*Do Nothing*/}
      else{      
        const innerValue = $('<p>').attr({id: `phonetic_${value}`, class: 'phonetic'}).text(`${value}`)
        content.append(innerValue)
      }
    }
  }
  return content.appendTo(app)
}

function meanings(meanings: Array<number>){
  const content = $("<div>").attr('id', "meanings")
  const length = meanings.length - 1
  for(i = 0; i <= length; i++){
    /* TODO copiar o for loop de cima, vou ir dormir agora pqp */
  }
}

/*---------------------------*/
const app = $('#app')


$.getJSON('https://api.dictionaryapi.dev/api/v2/entries/en/hello', (res: any) => {
  app.append(JSON.stringify(res[0]))
  word(res[0].word)
  phonetics(res[0].phonetics)
})
