<template>
  <v-app>
    <div class = "card-register">
      <v-content class = "mx-auto ">
        <v-card max-width="700" min-width="700" class="mx-auto mt-9 ">
          <v-card-title>Pay with card JEJEJE</v-card-title>
          <v-card-text>
            <v-text-field v-model="creditCard" label="Number of credit card" prepend-icon="mdi-card" type="number" required/>
            <v-text-field v-model="expiryDate" label="Date of expiry" prepend-icon="mdi-calendar" required/>
            <v-text-field v-model="cardHolder" label="Cardholder" prepend-icon="mdi-account" required/>
            <v-text-field v-model="cardIssuer" label="Card issuer" prepend-icon="mdi-bank" required/>
            <v-text-field v-model="cvv" label="CVV" prepend-icon="mdi-dialpad"/>
          </v-card-text>
          <v-divider></v-divider>


          <v-card-actions>
              <v-btn color="success" @click="add()">Pay S/ 499</v-btn>
            <router-link to="/home" class="text-decoration-none">
              <v-btn color="grey">Cancel</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-content>

      <dialog-login :dialog = "dialog" />

    </div>

  </v-app>
</template>

<script>
import {PaymentService} from "./services/PaymentService";
import {BusinessLoginService} from "./services/BusinessLogin.Service";

export default {
  name: "PayWithCard",
  data(){
    return{
      creditCard: '',
      expiryDate: '',
      cardHolder: '',
      cardIssuer: '',
      cvv: '',
      values: {},
      paymentService: null,
      paymentData: [],
      payments: [],
      businesses: null
    }
  },
  created(){
    this.paymentService = new PaymentService();
    this.businesses = new BusinessLoginService();
    this.paymentService.getAll().then(response=>{
      this.payments = response.data;
    })
  },
  methods:{
    async add(){
      if (this.creditCard === ''|| this.expiryDate === null ||this.cardHolder === ''
          ||this.cardIssuer===''||this.cvv===''){
        return;
      }
      await this.$router.replace("/home");
      //let  business = this.businesses.getAccount(this.business.email);
      //console.log("ID", business.id);
      console.log("AHHHHHH 2222: ", localStorage.getItem("businessId"));
      this.values = {
        "creditCard": this.creditCard, "expiryDate": this.expiryDate, "cardHolder": this.cardHolder,
        "cardIssuer": this.cardIssuer, "cvv": this.cvv, "businessId": Number(localStorage.getItem("businessId"))
      }
      console.log("INGRESAAAAA", JSON.stringify(this.values))
      await this.paymentService.create(JSON.stringify(this.values))
          .then(res=>{this.paymentData.push(res.data); console.log("funcionmaaaaaa")})
          .catch(err=>console.log(err));
    }
  }
}
</script>

<style scoped>

</style>