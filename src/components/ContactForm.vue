<template>
    <div class="content">
        <b-field>
            <b-input placeholder="Email"
                type="email"
                icon-pack="fas"
                icon="envelope-square" 
                v-model="email"></b-input>
        </b-field>
        <div class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="">
            <span class="icon is-medium is-left">
            </span>
            <span class="icon is-medium is-right">
                <i class="fa fa-check"></i>
            </span>
            </div>
    </div>
</template>

<script>
export default {
  name: "ContactForm"
};
</script>
