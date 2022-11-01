/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
 function parseStory(rawStory) {
    // Your code here.
    // Step 1: Finding words and their thing
    // Each word ending is with ], so split the text according to ]
    
    // console.log("this is the raw story",rawStory)
    
    let sections = []
    sections = rawStory.split(' ');

    // console.log('this is the sections array',sections)
  
    let processedSections = [];
    // Now words need to be cleaned
    sections.forEach((item, index) => {
      // Splitting word from its thing
      let word = null;
      let pos = null;
  
      if (item.includes('[n]')) {
        pos = 'noun'
        word = item.replace('[n]','')
      }
      else if (item.includes('[v]')) {
        pos = 'verb'
        word = item.replace('[v]','')
      }
      else if (item.includes('[a]')) {
        pos = 'adjective'
        word = item.replace('[a]','')
      }
      else
        word = item.replace(/[^a-zA-Z0-9-,.]+/g, " ")
  
  
      if (pos === null) {
        processedSections.push({ word: word })
      }
      else {
        processedSections.push({ word : word, pos: pos })
      }
  
    })
    console.log("this is the clean array",processedSections);
  
    processedSections.forEach((item, index) => {
      // making an input for each pos and giving id 
     
      if (item.pos) {
        const input = document.createElement('input');
        input.setAttribute('id', `p-${index}`)
        input.setAttribute("maxlength","20")
        input.placeholder = item.pos ;
        // input.style.margin = "1px 4px 1px 4px";
        // input.style.width = "20%";
        document.getElementById('madLibsEdit').appendChild(input);
      }
      else {
        const span = document.createElement("span");
        span.innerHTML = ` ${item.word} ` ;
        document.getElementById('madLibsEdit').appendChild(span);
      }
  
  
  
    })
  
  
    return {
    ...processedSections
    }; // This line is currently wrong :) => It's not wrong anymore :)
  }
  
  /**
   * All your other JavaScript code goes here, inside the function. Don't worry about
   * the `then` and `async` syntax for now.
   *
   * NOTE: You should not be writing any code in the global namespace EXCEPT
   * declaring functions. All code should either:
   * 1. Be in a function.
   * 2. Be in .then() below.
   *
   * You'll want to use the results of parseStory() to display the story on the page.
   */
  getRawStory()
    .then(parseStory)
    .then((processedStory) => {
      // Link word to input element and make the value
      // inside the object listen to change
      //  console.log(processedStory)
  
      Object.values(processedStory).forEach((item, index) => {
        const p = document.createElement('span');
  
         if (item.pos) {
            const input = document.getElementById(`p-${index}`);
            p.textContent = `[${item.pos}] `;
            // p.style.color="red"; 
            
            input.addEventListener('change', () => {
              if (input.value.length > 0){
                p.innerHTML = `${input.value} `;
                // p.style.color="blue";
              }
              else{
                p.innerHTML = `${item.word}[${item.pos}] `;
                // p.style.color="red";
  
              }
            })
          }
          else {
              p.insertAdjacentHTML("beforeend", `${item.word } `)
          }
  
        document.getElementById('madLibsPreview').appendChild(p);
      })
  
    });
    
    const title = document.querySelector('.subheader');
    title.innerHTML = title.textContent.replace(/\S/g,"<span>$&</span>");

    const letters = document.querySelectorAll('span');

    for(let i=0; i < letters.length; i++){
        letters[i].addEventListener("mouseover", function(){
            letters[i].classList.add('active');
            setTimeout(()=>{
              letters[i].classList.remove('active');
            },2000)

        });
    }

