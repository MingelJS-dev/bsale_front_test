document.addEventListener('DOMContentLoaded', () => {
    getProducts(),
    getCategoriesWithProducts()
})

const getProducts = async() => {
    try {
        const res = await fetch('http://localhost:3000/products')
        const data = await res.json()

    } catch (error) {
        console.log('Error', error)
    }
}

const getCategoriesWithProducts = async() => {
    try {
        const res = await fetch('http://localhost:3000/categories/group')
        const data = await res.json()

    } catch (error) {
        console.log('Error', error)
    }
}