import $ from "jquery"
/* declaração de coisas uteis talvez*/
//TODO Fazer funções pra fazilitar designar tags para os componentes


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
  let content = $("<div>").attr({
    id: "meanings",
    class: "meanings_container"
  })
  let length = meanings.length - 1
  for(let i = 0; i <= length; i++){
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
      switch (key) {
        case "partOfSpeech":
          const partSpeech = $("<p>").attr({
            id: `partSpeech_${i}`,
            class: "partSpeech"
          }).text(`${value}`)
          partSpeech.appendTo(content)
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
                  def.appendTo(content)
                break;
                case "synonyms":
                  const syn = $("<p>").attr({
                    id: `syn_${i}`,
                    class: "synonyms"
                  }).text(`${v}`)
                  syn.appendTo(content)
                break;
                case "antonyms":
                  const antonyms = $("<p>").attr({
                    id: `anto_${i}`,
                    class: "antonyms"
                  }).text(`${v}`)
                  antonyms.appendTo(content)
                break;
                case "example":
                  const ex = $("<p>").attr({
                    id: `ex_${i}`,
                    class: `example`
                  }).text(`${v}`)
                  ex.appendTo(content)
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
            syn.appendTo(content)
          break;
          case "antonyms":

            const antonyms = $("<p>").attr({
              id: `anto_${i}`,
              class: "antonyms"
            }).text(`${value}`)
            antonyms.appendTo(content)
          break;

      }
    }
  }
  return content.appendTo(app)
}

/*---------------------------*/
const app = $('#app')


$.getJSON('https://api.dictionaryapi.dev/api/v2/entries/en/hello', (res: any) => {
  //app.append(JSON.stringify(res[0].meanings))
  word(res[0].word)
  phonetics(res[0].phonetics)
  meanings(res[0].meanings)
})

/* Estilização */
//TODO Estilizar essa porra toda
//boa sorte
