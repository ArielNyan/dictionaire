import $ from "jquery"
/* declaração de coisas uteis talvez*/
//TODO Fazer funções pra fazilitar designar tags para os componentes
function makeH3(id: String, className: String){
  return $("<h3>").attr({id: `${id}`, class: `${className}`})
}

/* declaração de componentes */
function word(word: string){
  return(
    $('<p>').attr('id', 'word').text(`${word}`).appendTo(app)
  )
}
function phonetics(phonetics: Array<number>){
  //Essa merda tá tão remendada que me impressiona funcionar
  let content = $('<div>').attr('id', 'phonetics')
  let lengh = phonetics.length - 1
  for(var i = 0; i <= lengh; i++){
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
  let content = $("<div>").attr('id', "meanings")
  let length = meanings.length - 1
  for(let i = 0; i <= length; i++){
    for(const [key, value] of Object.entries((meanings[i]))){
      if(key == "definitions"){
        value.forEach((e: Object) => {
          console.log(e)
        })
      }else{
        const innerValue = makeH3("", `${key}`)
        innerValue.text(`${value}`)
        content.append(innerValue)
      }
    }
  }
  return content.appendTo(app)
}

/*---------------------------*/
const app = $('#app')


$.getJSON('https://api.dictionaryapi.dev/api/v2/entries/en/hello', (res: any) => {
  app.append(JSON.stringify(res[0]))
  word(res[0].word)
  phonetics(res[0].phonetics)
  meanings(res[0].meanings)
})
