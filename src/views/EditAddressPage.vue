<template>
  <div class="container">
        <div class="d-flex flex-row flex-wrap">
            <account-sidebar />
            <edit-address />
        </div>
    </div>
</template>

<script>
import EditAddress from '../components/editaddress'
import AccountSidebar from '../components/accountsidebar'
export default {
  name: 'EditAddressPage',
  components: {
    EditAddress,AccountSidebar
  }
}
</script>
