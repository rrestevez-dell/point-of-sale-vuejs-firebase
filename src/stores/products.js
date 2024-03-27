import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { deleteObject, ref as storageRef } from "firebase/storage";


export const useProductsStore = defineStore('products', () => {
    
    const db = useFirestore()
    const storage = useFirebaseStorage()

    const selectedCategory = ref(0)

    const categories = [
        {id: 1, name: 'Sudaderas'},
        {id: 2, name: 'Tenis'},
        {id: 3, name: 'Lentes'}
    ]

    const newCategory = { id: 0, name: 'todos' };
    const allCategories = [newCategory, ...categories];
    
    const q = query(
        collection(db, 'products'),
        orderBy('availability', 'asc')
        // where('category', '==', 3)
    )
    const productsCollection = useCollection( q )

    async function createProduct(product) {
        await addDoc(collection(db, 'products'), product)
    }

    async function updateProduct(docRef, product) {
        const { image, url, ...values } = product

        if (image.length) {
            await updateDoc(docRef, {
                ...values,
                image: url.value
            })     
        } else {
            await updateDoc(docRef, values)
        }
    }

    async function deleteProduct(id) {
        if (confirm('Desea eliminar producto ???')) {
            const docRef = doc(db, 'products', id)
            const docSnap = await getDoc(docRef)
            const { image } = docSnap.data()
            const imageRef = storageRef(storage, image)

            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])
        }
    }

    //Creando la estructura que me exige formkit para arreglos de categorias en el select :options [{label: ..., value: ...}]
    const categoryOptions = computed(() => {
        const options = [
            {label: 'Seleccione', value: '', attrs: {disabled: true}},
            ...categories.map(category => (
                {label: category.name, value: category.id}
            ))
        ]
        return options
    })

    const noResults = computed(() => productsCollection.value.length === 0)

    const filteredProducts = computed(() => {
        if (selectedCategory.value == 0) {
            return productsCollection.value.filter( product => product.availability > 0)
        } else {
            return productsCollection.value
                .filter( product => product.category === selectedCategory.value)
                .filter( product => product.availability > 0)
        }
    })
    
    return {
        categoryOptions,
        productsCollection,
        noResults,
        filteredProducts,
        categories,
        allCategories,
        selectedCategory,
        createProduct,
        updateProduct,
        deleteProduct,
    }
})