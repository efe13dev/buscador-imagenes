const form = document.querySelector('form.search')
const app = document.querySelector('.app')
const accesKey = 'c1w_d3xuOiMkZmj2A7iP0QmUQ-W8TjZ4rQGh2ObyepY'
//const secretKey = 'tm3EPGyq3hVODe61Tmas3c6XSfS4gEflt3V_A6hPRng'

async function getData() {
  const url = `https://api.unsplash.com/photos/?client_id=${accesKey}`
  try {
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      return data
    }
  } catch (error) {
    console.error(error.message)
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const value = new FormData(form)
  const query = value.get('query')
  const images = await getData()
  console.log(images)
}

form.addEventListener('submit', handleSubmit)
