<template>
    <div class="container">
        <div class="d-flex flex-row flex-wrap">
            <account-sidebar />
            <MyDetails />
        </div>
    </div>
</template>
<script>
import MyDetails from "../components/mydetails.vue"
import AccountSidebar from "../components/accountsidebar.vue"
export default {
    name: 'MyDetailsPage',
    components: {
        MyDetails,AccountSidebar
    }

}
</script>