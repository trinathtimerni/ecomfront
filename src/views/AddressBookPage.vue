<template>
  <div class="container">
        <div class="d-flex flex-row flex-wrap">
            <account-sidebar />
            <address-book />
        </div>
    </div>
</template>

<script>
import AddressBook from '../components/addressbook'
import AccountSidebar from '../components/accountsidebar'
export default {
  name: 'AddressBookPage',
  components: {
    AddressBook,AccountSidebar
  }
}
</script>
