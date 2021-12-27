<template>
    <div class="col-lg-10">
      <div v-if="category.length > 0">
         <div class="beauty-add beauty-grid" v-for="(subcategory, index) in category[0].sub_category" :key="index">
            <div class="item-g"  v-for="(childcategory,sl) in subcategory.child_category.slice(0,2)" :key="sl">
             
                 <img
                :src="`${baseEnvLocal}${childcategory.image}`"
                alt="">
              <div class="item-content">
                <h3 class="title-b">BVLGARI MAN TERRAE ESSENCE</h3>
                <p class="py-3">{{childcategory.description}}<br>
                  <br>
                </p>
                <b>
                  <a href="#" class="shop-now">Shop now</a>
                </b>
              </div>
             
            </div>
         </div>
            <!-- <div class="item-g">
              <img
                src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty-bvlgari-block1-060821?$cms-max-image-threshold$&wid=672&fit=hfit,1"
                alt="">
              <div class="item-content">
                <h3 class="title-b">BVLGARI MAN TERRAE ESSENCE</h3>
                <p class="py-3">The fertile Tuscan soil, with its iconic richness, is the
                  inspiration behind the new signature of the Bvlgari.<br>
                  One tree planted for every bottle sold until 5th September 2021<br>
                </p>
                <b>
                  <a href="#" class="shop-now">Shop now</a>
                </b>
              </div>
            </div> -->
          </div>
          <div class="beauty-ghd">
            <img
              src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty_ghd_skinny_150721?$cms-max-image-threshold$&wid=1200&fit=hfit,1"
              alt="">
            <div class="overlay-wrapper text-left">
              <h3 class="new-ghd-title">NEW GHD UNPLUGGED</h3>
              <p class="py-3">No strings attached. Ghd's first on-the-go cordless styler
              </p>
              <b>
                <a href="#" class="shop-now">Shop now</a>
              </b>
            </div>
          </div>
          <div class="list-of-beauty mb-5" v-if="category.length > 0">
            <div class="beauty-item-list mb-4" v-for="(subcategory, index) in category[0].sub_category" :key="index">
      
                <div v-for="(childcategory,sl) in subcategory.child_category" :key="sl" @click="getCategoryProduct(childcategory)">
                <img
                  :src="`${baseEnvLocal}${childcategory.image}`"
                  alt="">
                <h3 class="title-b mt-3">{{childcategory.name}}</h3>
              </div>
              <!-- <div>
                <img
                  src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty_block10_210721?$cms-max-image-threshold$&resMode=sharp&wid=576&fit=hfit,1"
                  alt="">
                <h3 class="title-b mt-3">BEAUTY EXCLUSIVES</h3>
              </div>
              <div>
                <img
                  src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty_block3_210721?$cms-max-image-threshold$&resMode=sharp&wid=576&fit=hfit,1"
                  alt="">
                <h3 class="title-b mt-3">BEAUTY EXCLUSIVES</h3>
              </div>
              <div>
                <img
                  src="https://johnlewis.scene7.com/is/image//JohnLewis/beauty_block4_210721?$cms-max-image-threshold$&resmode=sharp&wid=576&fit=hfit,1"
                  alt="">
                <h3 class="title-b mt-3">MAC</h3>
              </div> -->
            </div>
            <!-- <div class="beauty-item-list">
              <div>
                <img
                  src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty_block3_210721?$cms-max-image-threshold$&resMode=sharp&wid=576&fit=hfit,1"
                  alt="">
                <h3 class="title-b mt-3">BEAUTY EXCLUSIVES</h3>
              </div>
              <div>
                <img
                  src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty_block10_210721?$cms-max-image-threshold$&resMode=sharp&wid=576&fit=hfit,1"
                  alt="">
                <h3 class="title-b mt-3">BEAUTY EXCLUSIVES</h3>
              </div>
              <div>
                <img
                  src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty_block3_210721?$cms-max-image-threshold$&resMode=sharp&wid=576&fit=hfit,1"
                  alt="">
                <h3 class="title-b mt-3">BEAUTY EXCLUSIVES</h3>
              </div>
              <div>
                <img
                  src="https://johnlewis.scene7.com/is/image//JohnLewis/beauty_block4_210721?$cms-max-image-threshold$&resmode=sharp&wid=576&fit=hfit,1"
                  alt="">
                <h3 class="title-b mt-3">MAC</h3>
              </div>
            </div> -->
          </div>
          <div class="py-5 border-top">
            <div class="title_titleContainer">
              <h1 class="title-b">INSPIRATION</h1>
            </div>
            <div class="brand-love list-of-beauty py-5" v-if="cat_brands.length > 0">
              <div class="brand-icons" v-for="(cat_brand, index) in cat_brands" :key="index" @click="getBrandProduct(cat_brand)">
                <a>
                  <img
                    :src="`${baseEnvLocal}${cat_brand.image}`"
                    alt="">
                </a>
              </div>
              <!-- <div class="brand-icons">
                <a href="#">
                  <img
                    src="https://johnlewis.scene7.com/is/image/JohnLewis/lizearle_brl?$cms-max-image-threshold$&&op_colorize=b1b0b0&wid=288&fit=hfit,1"
                    alt="">
                </a>
              </div>
              <div class="brand-icons">
                <a href="#">
                  <img
                    src="https://johnlewis.scene7.com/is/image/JohnLewis/lizearle_brl?$cms-max-image-threshold$&&op_colorize=b1b0b0&wid=288&fit=hfit,1"
                    alt="">
                </a>
              </div>
              <div class=" brand-icons">
                <a href="#">
                  <img
                    src="https://johnlewis.scene7.com/is/image/JohnLewis/lizearle_brl?$cms-max-image-threshold$&&op_colorize=b1b0b0&wid=288&fit=hfit,1"
                    alt="">
                </a>
              </div>
              <div class=" brand-icons">
                <a href="#">
                  <img
                    src="https://johnlewis.scene7.com/is/image/JohnLewis/lizearle_brl?$cms-max-image-threshold$&&op_colorize=b1b0b0&wid=288&fit=hfit,1"
                    alt="">
                </a>
              </div>
              <div class=" brand-icons">
                <a href="#">
                  <img
                    src="https://johnlewis.scene7.com/is/image/JohnLewis/lizearle_brl?$cms-max-image-threshold$&&op_colorize=b1b0b0&wid=288&fit=hfit,1"
                    alt="">
                </a>
              </div> -->
            </div>
          </div>
          <div v-if="category.length > 0">
          <div class="beauty-add beauty-grid" v-for="(subcategory, index) in category[0].sub_category" :key="index">
            
              <div class="item-g" v-for="(childcategory,sl) in subcategory.child_category.slice(3,7)" :key="sl">
              <img
                :src="`${baseEnvLocal}${childcategory.image}`"
                alt="">
              <div class="item-content">
                <h3 class="title-b">BVLGARI MAN TERRAE ESSENCE</h3>
                <p class="py-3">{{childcategory.description}}<br>
                </p>
                <b>
                  <a href="#" class="shop-now">Shop now</a>
                </b>
              </div>
            </div>
            </div>
            
            <!-- <div class="item-g">
              <img
                src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty_esteelauder_010721?$cms-max-image-threshold$&wid=672&fit=hfit,1"
                alt="">
              <div class="item-content">
                <h3 class="title-b">BVLGARI MAN TERRAE ESSENCE</h3>
                <p class="py-3">The fertile Tuscan soil, with its iconic richness, is the
                  inspiration behind the new signature of the Bvlgari.<br>
                  One tree planted for every bottle sold until 5th September 2021<br>
                </p>
                <b>
                  <a href="#" class="shop-now">Shop now</a>
                </b>
              </div>
            </div>
            <div class="item-g">
              <img
                src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty_esteelauder_010721?$cms-max-image-threshold$&wid=672&fit=hfit,1"
                alt="">
              <div class="item-content">
                <h3 class="title-b">BVLGARI MAN TERRAE ESSENCE</h3>
                <p class="py-3">The fertile Tuscan soil, with its iconic richness, is the
                  inspiration behind the new signature of the Bvlgari.<br>
                  One tree planted for every bottle sold until 5th September 2021<br>
                </p>
                <b>
                  <a href="#" class="shop-now">Shop now</a>
                </b>
              </div>
            </div>
            <div class="item-g">
              <img
                src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty-VCA-block18-060821?$cms-max-image-threshold$&resMode=sharp&wid=672&fit=hfit,1"
                alt="">
              <div class="item-content">
                <h3 class="title-b">BVLGARI MAN TERRAE ESSENCE</h3>
                <p class="py-3">The fertile Tuscan soil, with its iconic richness, is the
                  inspiration behind the new signature of the Bvlgari.<br>
                  One tree planted for every bottle sold until 5th September 2021<br>
                </p>
                <b>
                  <a href="#" class="shop-now">Shop now</a>
                </b>
              </div>
            </div> -->
          </div>
          <div class="click beauty-ghd">
            <img
              src="https://johnlewis.scene7.com/is/image/JohnLewis/click-collect-desktop-gry-080421?$cms-max-image-threshold$&resMode=sharp&wid=1200&fit=hfit,1"
              alt="">
            <div class="overlay-wrapper">
              <h3 class="new-ghd-title">
                CLICK TODAY, COLLECT TOMORROW
              </h3>
              <p class="py-3">From John Lewis, Waitrose and hundreds of other locations
              </p>
              <b>
                <a href="#" class="shop-now">Find out more</a>
              </b>
            </div>
          </div>
          <div class="py-5 ">
            <div class="title_titleContainer py-5 border-top">
              <h1 class="title-b">Beauty</h1>
            </div>
            <div class="beauty-add beauty-grid">
              <div class="item-g">
                <img
                  src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty-VCA-block18-060821?$cms-max-image-threshold$&amp;resMode=sharp&amp;wid=672&amp;fit=hfit,1"
                  alt="">
                <div class="item-content">
                  <h3 class="title-b">BVLGARI MAN TERRAE ESSENCE</h3>
                  <p class="py-3">Step into a world of inspiration with our beauty services
                  </p>
                  <b>
                    <a href="#" class="shop-now">Shop now</a>
                  </b>
                </div>
              </div>
              <div class="item-g">
                <img
                  src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty_esteelauder_010721?$cms-max-image-threshold$&amp;wid=672&amp;fit=hfit,1"
                  alt="">
                <div class="item-content">
                  <h3 class="title-b">BVLGARI MAN TERRAE ESSENCE</h3>
                  <p class="py-3">Step into a world of inspiration with our beauty services
                  </p>
                  <b>
                    <a href="#" class="shop-now">Shop now</a>
                  </b>
                </div>
              </div>
              <div class="item-g">
                <img
                  src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty_esteelauder_010721?$cms-max-image-threshold$&amp;wid=672&amp;fit=hfit,1"
                  alt="">
                <div class="item-content">
                  <h3 class="title-b">BVLGARI MAN TERRAE ESSENCE</h3>
                  <p class="py-3">Step into a world of inspiration with our beauty services
                  </p>
                  <b>
                    <a href="#" class="shop-now">Shop now</a>
                  </b>
                </div>
              </div>
              <div class="item-g">
                <img
                  src="https://johnlewis.scene7.com/is/image/JohnLewis/beauty-VCA-block18-060821?$cms-max-image-threshold$&amp;resMode=sharp&amp;wid=672&amp;fit=hfit,1"
                  alt="">
                <div class="item-content">
                  <h3 class="title-b">BVLGARI MAN TERRAE ESSENCE</h3>
                  <p class="py-3">Step into a world of inspiration with our beauty services
                  </p>
                  <b>
                    <a href="#" class="shop-now">Shop now</a>
                  </b>
                </div>
              </div>
            </div>
          </div>
        
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex"
export default {
  data: () => ({  
    baseEnvLocal: baseEnv,
    brands: [],
    apiArg: {
      child_category_id: "",
      brand_id: ""
    }
  }),
  async created(){
        await this.getCategories()
         this.getSubCategory()
        this.getCategoryBrands()
    },
  computed:{
        ...mapState("category",["categories"]),
        ...mapState("category",["category"]),
        ...mapState("category",["cat_brands"])
    },
    methods: {
      ...mapActions("category",["getCategories"]),
        getSubCategory(){
            console.log("categories",this.categories)
            let category_id = this.$route.params.id
            this.$store
        .dispatch("category/getCategory",category_id)
        .then(() => {
            console.log("test")
        })
        .catch(() => {});
        console.log("main category paichi",this.category[0])
        },
    async getBrandProduct(brand)
    {
      this.load = true
        this.apiArg.brand_id = brand.slug
        await this.$store.dispatch("product/getBrandProducts",this.apiArg).then((res) => {
          this.load = false
          this.$router.push({ name: "BrandProduct", params: { id: brand.slug}});

          console.log(res.data);
        })
        .catch(() => {});
    },
        getCategoryBrands(){
            let category_id = this.$route.params.id
            this.$store
        .dispatch("category/getCatBrands",category_id)
        .then(() => {
          console.log("brands",this.cat_brands)
        })
        .catch(() => {});
        }
    }
}
</script>

<style>
    .title-b {
      display: block;
      overflow: hidden;
      color: #141414;
      margin-top: 0;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 1.07px;
      line-height: 20px;
      text-transform: uppercase;
      margin-bottom: 0;
      text-align: center;
    }

    .beauty-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
      text-align: center;
    }

    .item-content {
      padding: 15px 15px;
      margin-top: 20px;
    }

    .item-content .shop-now,
    .overlay-wrapper .shop-now {
      color: #141414;
      text-decoration: underline;
    }

    .new-ghd-title {
      font-size: 1.125em;
      font-weight: 400;
      line-height: 150%;
      letter-spacing: 5px;
      text-align: left;
      color: #111111;
    }

    .beauty-ghd {
      position: relative;
      padding: 30px 0px;
    }

    .overlay-wrapper {
      position: absolute;
      width: 100%;
      z-index: 1;
      bottom: auto;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      padding-left: 30px;
      padding-top: 20px;
      padding-right: 20px;
      max-width: 50%;
    }

    .click .overlay-wrapper {
      max-width: 100%;
      text-align: center;
      padding-bottom: 20px;
    }

    .click .overlay-wrapper h3 {
      text-align: center;
    }

    .beauty-item-list{
      position: relative;
      display: flex;
      /* justify-content: space-between; */
      flex-wrap: wrap;
      gap: 10px;
    }

    .beauty-item-list div {
      flex-basis: 24%;
    }

    .brand-love {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .brand-icons {
      flex-basis: 30%;
      padding: 35px 60px;
      border: 1px solid #ddd;
      margin: 10px;
    }

    .click.beauty-ghd>img {
      height: 22vh;
    }

    @media only screen and (max-width: 991px) {
      .beauty-ghd img {
        height: 20vh;
      }

      .overlay-wrapper p.py-3 {
        display: none;
      }

      .overlay-wrapper h3 {
        margin-bottom: 10px;
      }

      .beauty-item-list div {
        flex: 1 0 48%;
        margin-bottom: 10px;
      }

      .brand-icons {
        flex-basis: 28%;
        padding: 20px 50px;
        border: 1px solid #ddd;
      }

      .brand-love {
        justify-content: left;
      }
    }

    @media only screen and (max-width: 768px) {
      .beauty-grid {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    @media only screen and (max-width: 578px) {
      .brand-icons {
        padding: 20px 45px;
      }

      .brand-icons {
        flex-basis: 45%;
      }
    }
</style>