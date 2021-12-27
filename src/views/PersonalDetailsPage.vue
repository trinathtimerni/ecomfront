<template>
  <div class="container">
        <div class="d-flex flex-row flex-wrap">
            <account-sidebar />
            <personal-details />
        </div>
    </div>
</template>

<script>
import PersonalDetails from '../components/personaldetails'
import AccountSidebar from '../components/accountsidebar'
export default {
  name: 'PersonalDetailsPage',
  components: {
    PersonalDetails,AccountSidebar
  }
}
</script>
