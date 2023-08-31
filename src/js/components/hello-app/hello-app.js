const template = document.createElement('template')
template.innerHTML = `

<style>
.catimage {
  font-size:40pt;
  text-align: center;
}

.container {
  text-align: center;
  color: white;
}

.button {
  border-radius: 5px;
  margin: 5px;
  font-size: 15pt;
  cursor: pointer;  
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;   
  cursor: pointer;
  color: white;
}

input {
  font-size: large;
}
</style>

 <p class="catimage"> &#128049;</p>
  <div class="container">
  <h1>Hello, enter your name and see what happens!</h1>
  <input type="text" placeholder="Write your name here"/>
  <button class="button">Check it out!</button>
  <div class="cat"></div>
</div>

`
customElements.define('hello-app',
  /**
   * Represents the hello-cat-app element.
   */
  class extends HTMLElement {
    /**
     * The button element that fetches cat pictures.
     *
     * @type {HTMLElement}
     */
    #button

    /**
     * The element that displays the cat pictures.
     *
     * @type {HTMLElement}
     */
    #catIMG
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
      this.#catIMG = this.shadowRoot.querySelector('.cat')
      this.#button = this.shadowRoot.querySelector('.button')
      this.#button.addEventListener('click', async (event) => {
        event.preventDefault()
        const nameInput = this.shadowRoot.querySelector('input')
        const name = nameInput.value // Get the value entered by the user
        if (name) {
          this.fetchCatPictures(name) // Pass the name to the fetchCatPictures function
        } else {
          alert('Please enter a name before you do anything else.')
        }
      })
    }

    /**
     * Fetches cat pictures and displays them along with the user's name.
     *
     * @param {string} name - The user's name.
     * @returns {[]} - An array of fetched cat picture data objects.
     */
    async fetchCatPictures (name) {
      this.#catIMG.textContent = ''
      const response = await window.fetch('https://api.thecatapi.com/v1/images/search')
      const data = await response.json()
      const catImage = data[0].url
      const catpics = document.createElement('img')
      catpics.style = 'width: 20%;'
      catpics.setAttribute('src', `${catImage}`)
      // Display the user's name along with the cat picture
      const nameElement = document.createElement('p')
      nameElement.textContent = `Here's a cat picture for you, ${name}!`
      this.#catIMG.appendChild(nameElement)
      this.#catIMG.appendChild(catpics)
      return data
    }
  }
)
