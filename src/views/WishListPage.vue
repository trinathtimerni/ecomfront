<template>
    <div class="container">
        <div class="d-flex flex-row flex-wrap">
            <account-sidebar />
            <WishList />
        </div>
    </div>
</template>
<script>
import WishList from "../components/wishlist.vue"
import AccountSidebar from "../components/accountsidebar.vue"
export default {
    name: 'WishListPage',
    components: {
        WishList,AccountSidebar
    }

}
</script>