<template>
  <div class="container">
        <div class="d-flex flex-row flex-wrap">
            <account-sidebar />
            <add-address />
        </div>
    </div>
</template>

<script>
import AddAddress from '../components/addaddress'
import AccountSidebar from '../components/accountsidebar'
export default {
  name: 'AddAddressPage',
  components: {
    AddAddress,AccountSidebar
  }
}
</script>
