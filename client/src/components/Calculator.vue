<template>
  <div>
    <h1 class="mt-5 text-center">Calculate</h1>
    <template>
      <v-card class="mx-auto mt-5" max-width="500">
        <v-row>
          <v-col cols="5">
            <v-card-title>I'd like to rent out</v-card-title>
          </v-col>
          <v-col cols="7">
            <v-select class="mr-3" :items="items" v-model="category" label="Category" outlined></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5">
            <v-card-title class="pr-0">Select size in sqm</v-card-title>
          </v-col>
          <v-col cols="7">
            <v-card-text>
              <v-slider v-model="sqm" step="10" thumb-label="always" ticks></v-slider>
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" class="pr-0">
            <v-card-title class="pr-0">Earn up to</v-card-title>
          </v-col>
          <v-col cols="2" class="px-0">
            <v-text-field
              background-color="grey lighten-2"
              reverse
              v-model="euro"
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-card-title class="pl-0">EUR per month.</v-card-title>
          </v-col>
        </v-row>
        <!-- <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" text>Share</v-btn>

          <v-btn color="orange" text>Explore</v-btn>
        </v-card-actions>-->
      </v-card>
    </template>
  </div>
</template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sqm: 0,
      category: "",
      items: [
        {
          text: "Space",
          value: { price: 5 }
        },
        {
          text: "Garage",
          value: { price: 6 }
        },
        {
          text: "Other",
          value: { price: 4 }
        }
      ],
      euro: 0
    };
  },
  watch: {
    sqm(val) {
      this.calculatePriceMonth();
    },
    category(val) {
      this.calculatePriceMonth();
    }
  },
  methods: {
    calculatePriceMonth() {
      if (this.category) {
        this.euro = this.sqm * this.category.price;
      }
    }
  }
};
</script>

<style>
</style>