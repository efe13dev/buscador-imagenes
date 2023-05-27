const form = document.querySelector('form.search')
const app = document.querySelector('.app')
const accesKey = 'c1w_d3xuOiMkZmj2A7iP0QmUQ-W8TjZ4rQGh2ObyepY'
const secretKey = 'tm3EPGyq3hVODe61Tmas3c6XSfS4gEflt3V_A6hPRng'
const writePhotos = ({ results }) => {
  const photoList = results.map((photo) => {
    return `<li>
  <img src='${photo.urls.thumb}' alt='${photo.description}' />
  <p>${photo.user.username}</p>
  </li>`
  })

  app.innerHTML = `<ul>${photoList.join('')}</ul>`
}

const writeMessage = (message) => {
  app.innerHTML = `<p>${message}</p>`
}
const getData = async (e) => {
  e.preventDefault()
  const value = new FormData(form)
  const imagesNumber = value.get('imagesNumber')

  const query = value.get('query')
  const url = `https://api.unsplash.com/search/photos/?client_id=${accesKey}&per_page=${imagesNumber}&query=${query}`

  try {
    writeMessage('Cargando datos...')
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      if (data.results.length > 0) {
        writePhotos(data)
      } else {
        writeMessage('No se encontraron resultados')
      }
    } else {
      writeMessage('Hubo un error en la petición')
    }
  } catch (error) {
    writeMessage(error.message)
  }
}

form.addEventListener('submit', getData)
