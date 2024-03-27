<script setup>
    import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
    import Amount from '@/components/Amount.vue'
    import CouponForm from '@/components/CouponForm.vue'
    import { useCartStore } from '@/stores/cart';
    import { useCouponStore } from '@/stores/coupons';
    import { formatCurrency } from '@/helpers';


    const cart = useCartStore()
    const coupon = useCouponStore()

</script>

<template>
    <p v-if="cart.isEmpty" class=" text-xl text-gray-900 text-center">El Carrito esta vacio</p>

    <div v-else>
        <p class=" text-4xl font-bold text-gray-900 text-center">Resumen de venta</p>
        <ul
            role="list"
            class="mt-6 divide-y divide-gray-200 border-t border-gray-200"
        >
            <ShoppingCartItem
                v-for="item in cart.items"
                :key="item.id"
                :item="item"
            />
        </ul>

        <dl class=" space-y-6 border-gray-200 pt-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label>Subtotal:</template>
                {{ formatCurrency(cart.subtotal) }}
            </Amount>
            <Amount>
                <template #label>Impuestos:</template>
                {{ formatCurrency(cart.taxes) }}
            </Amount>
            <Amount v-if="coupon.isValidCoupo">
                <template #label>Descuentos por cupón:</template>
                {{ formatCurrency(coupon.discount) }}
            </Amount>
            <Amount>
                <template #label>Total a Pagar:</template>
                {{ formatCurrency(cart.total) }}
            </Amount>
        </dl>

        <CouponForm/>

        <button
            type="button"
            class=" mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
            @click="cart.checkout"
        >
            Confirmar la Compra
        </button>
    </div>
</template>
