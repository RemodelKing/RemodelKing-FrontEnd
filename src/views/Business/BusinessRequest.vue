<template>
  <h1 class="title">Request</h1>
  <v-main>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row no-gutters>
          <v-col class="labelForm" cols="12" sm="2" md="2">
            <smal><b>Business name:</b></smal>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="form.businessName" :rules="nameRules" label="Name" clearable aria-required="true">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="labelForm" cols="12" sm="2" md="2">
            <smal><b>Email:</b></smal>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="form.email" :rules="emailRules" label="Email" clearable aria-required="true">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="labelForm" cols="12" sm="2" md="2">
            <smal><b>Title:</b></smal>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="form.title" :rules="titleRules" label="Title" clearable aria-required="true">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="labelForm" cols="12" sm="2" md="2">
            <smal><b>Description:</b></smal>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-textarea v-model="form.description" :rules="descriptionRules" label="Description about your request" clearable aria-required="true">
            </v-textarea>
          </v-col>
        </v-row>
        <v-btn @click="submit()" class="ma-2" type="submit" elevation="6" rounded color="light-green darken-1">
          Submit
        </v-btn>
        <v-btn class="ma-2" color="light-green darken-1" elevation="6" rounded @click="clear">
          Clear
        </v-btn>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>

import {RequestService} from "../Clients/ClientServices/request.service";

export default {
  name: "BusinessRequest",
  data() {
    return {
      requestService: null,
      valid: true,
      businessName: '',
      nameRules: [v => !!v || 'Name is required'],
      email: '',
      emailRules: [v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      title: '',
      titleRules: [v => !!v || 'Title is required'],
      description: '',
      descriptionRules: [v => !!v || 'Description is required'],
      form: {
        businessName: '',
        email: '',
        title: '',
        description: '',
        clientId: 1
      },
    }
  },
  created() {
    this.requestService = new RequestService();
  },
  methods: {
    submit () {
      //this.$refs.observer.validate();
      console.log(JSON.stringify(this.form))
      this.requestService.create(JSON.stringify(this.form)).then(res=>{
        console.log(res.data);
      })
    },
    clear () {
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped>
.title{
  text-align: center;
  font-size: 35px;
  font-weight: 300;
  padding: 20px;
}
</style>