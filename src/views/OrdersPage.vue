<template>
    <div class="container">
        <div class="d-flex flex-row flex-wrap">
            <account-sidebar />
            <Orders />
        </div>
    </div>
</template>
<script>
import Orders from "../components/orders.vue"
import AccountSidebar from "../components/accountsidebar.vue"
export default {
    name: 'OrdersPage',
    components: {
        Orders,AccountSidebar
    }

}
</script>