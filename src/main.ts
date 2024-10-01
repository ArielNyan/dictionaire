import $ from "jquery"
/* declaração de coisas uteis talvez*/


/* declaração de componentes */
function word(word: string){
  return(
    $('<p>').attr({
      id: 'word',
      class: `py-3 text-2xl font-bold`
    }).text(`${word}`).appendTo(app)
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
        const audioTag = $("<audio controls>").attr("class", "audioTag pb-4")
        const audioUrl = $('<source>').attr({class: "audio", src: `${value}`, type: "audio/mp3"})
        audioTag.append(audioUrl)
        container.append(audioTag)
      }else if(key == "sourceUrl"){/*Do Nothing*/}
      else{      
        const innerValue = $('<p>').attr({id: `phonetic_${i}`, class: 'phonetic font-thin'}).text(`${value}`)
        container.append(innerValue)
      }
    }
    container.appendTo(content)
  }
  content.addClass("pb-3")
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
    console.log(meanings[i])
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
            class: "partSpeech pb-1 text-lg font-semibold"
          }).text(`${value}`)
          partSpeech.appendTo(container)
          break;
        case "definitions": 
        value.forEach((e: Object, p: number) => {
            const x = p + 1
            for(const [k, v] of Object.entries(e)){
              switch (k) {
                case "definition":
                    
                  const def = $(`<p>`).attr({
                    id: `def_${x}`,
                    class:"definition pb-1"
                  }).text(`${v}`)
                  def.append($("<p>").attr({class: "text-lg font-semibold"}).text(`Definition ${x}`))
                  def.appendTo(container)
                break;
                case "synonyms":
                  const syn = $("<ul>").attr({
                    id: `syn_${x}`,
                    class: "synonyms"
                  })

                  syn.append($("<li>").attr({id: `s_${x}`, class: "s text-red-500"}).text(`${v}`))
                  syn.appendTo(container)
                break;
                case "antonyms":
                  const antonyms = $("<ul>").attr({
                    id: `anto_${x}`,
                    class: "antonyms"
                  })
                  antonyms.append($("<li>").attr({id: `a_${x}`, class: "a text-blue-500"}).text(`${v}`))
                  antonyms.appendTo(container)
                break;
                case "example":
                  const ex = $("<p>").attr({
                    id: `ex_${x}`,
                    class: `example pb-2`
                  }).text(`${v}`)
                  ex.appendTo(container)
                break;
              }


            }


          })


          break;
          case "synonyms":
            const syn = $("<ul>").attr({
              id: `synonyms_${i}`,
              class: "synonyms"
            })
            syn.append($("<li>").attr({id: `s${i}`, class: "text-red-800"}).text(` ${value}`))
            syn.appendTo(container)
          break;
          case "antonyms":

            const antonyms = $("<p>").attr({
              id: `anton_${i}`,
              class: "antonyms text-blue-800"
            }).text(`${value}`)
            antonyms.appendTo(container)
          break;

      }

    }
    container.addClass("pb-4")
    container.appendTo(content)
  }
  return content.appendTo(app)
}

/*---------------------------*/
const container = $("#app")
const app = $('<div>').attr("id", "application")
app.appendTo(container)
const pesquisar = (palavra: String) => { $.getJSON(`https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`, (res: any) => {
  // app.append(JSON.stringify(res[0].phonetics))
  word(res[0].word)
  phonetics(res[0].phonetics)
  meanings(res[0].meanings)
}).fail((err: any) => {
    //o que acontece quando da erro
    console.log(err.responseJSON)
  })
}
const form = $("<form>").attr({
  id: "pesquisa",
  class: "border-black flex-col flex justify-center content-center",
  placeholter: "search"
})
const input = $("<input>").attr({
  type: "text",
  id: "campoPesquisa",
  class: "border-black border mb-3 p-2 rounded-xl",
  placeholder: "search"
})
const btn = $("<button>").attr({
  id: "pesquisaBtn",
  class: "bg-blue-500 w-1/2 m-auto p-1 rounded-xl font-semibold text-white"
}).on("click", {}, () => {
  const search = input.val()
  pesquisar(`${search}`)
}).text("SEARCH")

form.append(input, btn)
app.append(form)
/* Estilização */
//boa sorte
container.addClass("flex flex-col ")
app.addClass("content-center justify-center lg:max-w-max mx-auto")
