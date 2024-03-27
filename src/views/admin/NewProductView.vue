<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import Link from '@/components/Link.vue'
    import useImage from '@/composables/useImage'
    import { useProductsStore } from '@/stores/products'

    const { url, isImageUploaded, onFileChange } = useImage()
    const products = useProductsStore()
    const router = useRouter()
    
    const formData = reactive({
        name: '',
        category: '',
        price: '',
        availability: '',
        image: ''
    })
    const submitHandler = async (data) => {
        const {image, ...values} = data
        
        try {
           await products.createProduct({
                ...values,
                image: url.value
           })
           router.push({name: 'products'})
        } catch (error) {
            console.log(error)
        }
    }

</script>

<template>
    <div>
        <Link
            to="products"
        >Volver</Link>

        <h1 class=" text-4xl font-black my-10">Nuevo Producto</h1>

        <div class=" flex justify-center bg-white shadow">
            <div class=" mt-10 p-10 w-full 2xl:w-2/4">

                <FormKit
                    type="form"
                    submit-label="Agregar Producto"
                    incomplete-message="No se pudo enviar, revisa los mensajes obligatorios"
                    @submit="submitHandler"
                >
                    <FormKit
                        type="text"
                        label="Nombre"
                        name="name"
                        placeholder="Nombre de Producto"
                        validation="required"
                        :validation-messages="{required: 'El Nombre del Producto es Obligatorio'}"
                        v-model.trim="formData.name"
                    />

                    <FormKit
                        type="file"
                        label="Imagen Producto"
                        name="image"
                        validation="required"
                        :validation-messages="{required: 'La imagen del Producto es Obligatorio'}"
                        accept=".jpg"
                        multiple="true"
                        @change="onFileChange"
                        v-model.trim="formData.image"

                    />

                    <div v-if="isImageUploaded">
                        <p class="font-black">Imagen Producto:</p>

                        <img 
                            :src="url" 
                            alt="Nueva imagen producto"
                            class="w-32"
                        >
                    </div>

                    <FormKit
                        type="select"
                        label="Categorias"
                        name="category"
                        validation="required"
                        :validation-messages="{required: 'La categoria del Producto es Obligatorio'}"
                        :options="products.categoryOptions"
                        v-model.number="formData.category"

                    />

                    <FormKit
                        type="number"
                        label="Precio"
                        name="price"
                        placeholder="Precio del Producto"
                        validation="required"
                        :validation-messages="{required: 'El precio del Producto es Obligatorio'}"
                        min="1"
                        step="2"
                        v-model.number="formData.price"
                    />

                    <FormKit
                        type="number"
                        label="Disponible"
                        name="availability"
                        placeholder="Cantidad Disponible"
                        validation="required"
                        :validation-messages="{required: 'La cantidad del Producto es Obligatorio'}"
                        min="1"
                        v-model.number="formData.availability"
                    />


                </FormKit>

            </div>
        </div>
    </div>
</template>
