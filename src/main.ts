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
  let content = $('<div>').attr('id', 'phonetics')
  let lengh = phonetics.length - 1
  for(var i = 0; i <= lengh; i++){

    let container = $("<div>").attr({
      id: `phonetic_${i}`,
      class: "phonetic"
    })
    for(const [key, value] of Object.entries((phonetics[i]))){
      if(key == "license"){      
        // const licenseName = $('<p>').attr(`id`, `license_${value.name}`).text(`${value.name}`)       
        // const licenseUrl = $('<a>').attr({id: `licence_${value.url}`, href: `${value.url}`}).text(`${value.url}`)
        // content.append(licenseName, licenseUrl)
      }else if(key == "audio" && value !== ""){
        const audioTag = $("<audio controls>").attr("class", "audioTag")
        const audioUrl = $('<source>').attr({class: "audio", src: `${value}`, type: "audio/mp3"})
        audioTag.append(audioUrl)
        container.append(audioTag, $("<br>"))
      }else if(key == "sourceUrl"){/*Do Nothing*/}
      else{      
        const innerValue = $('<p>').attr({id: `phonetic_${i}`, class: 'phonetic'}).text(`${value}`)
        container.append(innerValue)
      }
    }
    container.appendTo(content)
  }
  return content.appendTo(app)
}

function meanings(meanings: Array<number>){
  let content = $("<div>").attr({
    id: "meanings",
    class: "meanings_container"
  })
  let length = meanings.length - 1
  for(let i = 0; i <= length; i++){
    let container = $("<div>").attr({
      id: `container_${i}`,
      class: "container"
    })
    for(const [key, value] of Object.entries((meanings[i]))){
      // if(key == "definitions"){
      //   value.forEach((e: Object) => {
      //     console.log(e)
      //   })
      // }else{
      //   const innerValue = makeH3("", `${key}`)
      //   innerValue.text(`${value}`)
      //   content.append(innerValue)
      // }
      //ESSA MERDA VAI SER UM INFERNO SE EU PRECISAR VOLTAR AQUI
      //eu precisei voltar aqui algumas vezes...
      switch (key) {
        case "partOfSpeech":
          const partSpeech = $("<p>").attr({
            id: `partSpeech_${i}`,
            class: "partSpeech"
          }).text(`${value}`)
          partSpeech.appendTo(container)
          break;
        case "definitions": 
        value.forEach((e: Object) => {
           for(const [k, v] of Object.entries(e)){
              switch (k) {
                case "definition":
                    
                  const def = $(`<p>`).attr({
                    id: `def_${i}`,
                    class:"definition"
                  }).text(`${v}`)
                  def.appendTo(container)
                break;
                case "synonyms":
                  const syn = $("<p>").attr({
                    id: `syn_${i}`,
                    class: "synonyms"
                  }).text(`${v}`)
                  syn.appendTo(container)
                break;
                case "antonyms":
                  const antonyms = $("<p>").attr({
                    id: `anto_${i}`,
                    class: "antonyms"
                  }).text(`${v}`)
                  antonyms.appendTo(container)
                break;
                case "example":
                  const ex = $("<p>").attr({
                    id: `ex_${i}`,
                    class: `example`
                  }).text(`${v}`)
                  ex.appendTo(container)
                break;
              }
            }
          })
          break;
          case "synonyms":
            const syn = $("<p>").attr({
              id: `synonyms_${i}`,
              class: "synonyms"
            }).text(`${value}`)
            syn.appendTo(container)
          break;
          case "antonyms":

            const antonyms = $("<p>").attr({
              id: `anto_${i}`,
              class: "antonyms"
            }).text(`${value}`)
            antonyms.appendTo(container)
          break;

      }
    }
    container.appendTo(content)
  }
  return content.appendTo(app)
}

/*---------------------------*/
const app = $('#app')


$.getJSON('https://api.dictionaryapi.dev/api/v2/entries/en/hello', (res: any) => {
  // app.append(JSON.stringify(res[0].phonetics))
  word(res[0].word)
  phonetics(res[0].phonetics)
  meanings(res[0].meanings)
})

/* Estilização */
//TODO Estilizar essa porra toda
//boa sorte
