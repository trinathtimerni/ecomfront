<template>
  <div class="container">
        <div class="d-flex flex-row flex-wrap">
            <account-sidebar />
            <edit-password />
        </div>
    </div>
</template>

<script>
import EditPassword from '../components/editpassword'
import AccountSidebar from '../components/accountsidebar'
export default {
  name: 'EditPasswordPage',
  components: {
    EditPassword,AccountSidebar
  }
}
</script>
