<template>
<div class="content">
  <h1>Neem contact op</h1>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <ContactForm />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ContactForm from "@/components/ContactForm";

export default {
  name: "Contact",
  components: {
    ContactForm
  }
};
</script>
