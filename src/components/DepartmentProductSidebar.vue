<template>
  <div class="col-lg-3">
          <a href="" class="stock-filter">
            <span class="pr-2 stock-title"> Out of Stock items</span>
            <span class="filter-btn">
              <span class="filter-btn-content">Show</span>
              <span class="filter-btn-content">Hide</span>
              </span>
          </a>
              <v-expansion-panels v-model="openpanel" class="brand-list" accordion  expand-icon="mdi-menu-down">
    <v-expansion-panel>
      <v-expansion-panel-header class="brand-header">
        Brand
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <ul>
          <div class="search pt-2">
          <v-text-field
            dense
            v-model="brandSearch"
            append-icon="mdi-magnify"
            placeholder="search Brand"
            outlined
            flat
            hide-details
            class=""
          ></v-text-field>
        </div>
                <li v-for="item in department_brands" :key="item.id" class="py-2 d-flex brand-item">
                  <v-checkbox
          
          hide-details
          class="shrink mr-2 mt-0"
        ></v-checkbox><a href=""><span></span>{{item.name}}</a></li>
                
              </ul>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-expansion-panels class="brand-list" accordion  expand-icon="mdi-menu-down">
    <v-expansion-panel>
      <v-expansion-panel-header class="brand-header">
        Colors
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <ul>
                <li v-for="color in department_colors" :key="color.id" class="py-3 mt-2 d-flex color-item">
                  <div
                          class="ml-2 mr-2 color-side"
                          :style="{'background-color': color.code}"
                        ></div>
                  <a href=""><span></span>{{color.name}}</a>
                  </li>
                
              </ul>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-expansion-panels class="brand-list" accordion  expand-icon="mdi-menu-down">
    <v-expansion-panel>
      <v-expansion-panel-header class="brand-header">
        Delivery Type
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <ul>
                <li v-for="item in department_delivery" :key="item.id" class="py-2 d-flex brand-item">
                  <v-checkbox
          
          hide-details
          class="shrink mr-2 mt-0"
        ></v-checkbox><a href=""><span></span>{{item.name}} ()</a></li>
                
              </ul>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-expansion-panels class="brand-list" accordion  expand-icon="mdi-menu-down">
    <v-expansion-panel>
      <v-expansion-panel-header class="brand-header">
        Price
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <ul>
                <li v-for="index in range" :key="index.id" class="py-2 d-flex brand-item">
                  <v-checkbox
          
          hide-details
          class="shrink mr-2 mt-0"
        ></v-checkbox>
        <a v-if="index == 1" href=""><span></span>${{min}} - ${{100 * index}}</a>
        <a v-else href=""><span></span>${{100 * (index-1) + 1}} - ${{100 * index}}</a>
        
        </li>
                
              </ul>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-expansion-panels class="brand-list" accordion  expand-icon="mdi-menu-down">
    <v-expansion-panel>
      <v-expansion-panel-header class="brand-header">
        Avg Review List
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <ul>
                <li v-for="item in items" :key="item.id" class="py-2 d-flex brand-item">
                  <v-checkbox
          
          hide-details
          class="shrink mr-2 mt-0"
        ></v-checkbox><a href=""><span></span>{{item.name}}</a></li>
                
              </ul>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
              
            </div>
            </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  data : () => ({
    brandSearch: '',
    openpanel: null,
    products: [],
    max: 0,
    min: 0,
    range: 0,
    items: [
      {id: 1, name: "this is test brand"},
      {id: 2, name: "easy"},
      {id: 3, name: "easy"},
      {id: 4, name: "easy"},
      {id: 5, name: "easy"},
      {id: 6, name: "easy"},
    ],
    colors: [
      {id: 1, name: "Red"},
      {id: 2, name: "Green"},
      {id: 3, name: "White"},
      {id: 4, name: "Black"},
      {id: 5, name: "Blue"},
      {id: 6, name: "Pink"},
    ]
  }),
  created(){
    this.openPanel(0);
    this.departmentBrands();
    this.departmentColors();
    this.departmentDelivery();
    this.departmentPrice();
  },
  computed: {
    ...mapState("department", ["department_brands"]),
    ...mapState("department", ["department_colors"]),
    ...mapState("department", ["department_delivery"]),
  },
  methods: {
    openPanel(index){
      this.openpanel =index
    },
    departmentBrands(){
      this.$store
        .dispatch("department/getDepartmentBrands",this.$route.params.id)
        .then(() => {})
        .catch(() => {});
    },
    departmentColors(){
      this.$store
        .dispatch("department/getDepartmentColors",this.$route.params.id)
        .then(() => {})
        .catch(() => {});
    },
    departmentDelivery(){
      this.$store
        .dispatch("department/getDepartmentDelivery",this.$route.params.id)
        .then(() => {})
        .catch(() => {});
    },
    departmentPrice()
    {
      axios.post('api/product/get_department_products',{
        department_id: this.$route.params.id,
      })
        .then(res => {
            console.log("pricing",res.data)
            this.products = res.data
            if (this.products.length == 0) {
          return 
        }
        let max_obj = this.products.reduce((a,b) => Number(a.price) > Number(b.price) ? a : b)    
        let min_obj = this.products.reduce((a,b) => Number(a.price) < Number(b.price) ? a : b)    
        this.max = max_obj.price
        this.min = min_obj.price
        this.range = Math.ceil(max_obj.price / 100);
        console.log("max",this.max,this.range)
        })
        
    }
  }
}
</script>

<style>
ul {
  list-style: outside none none;
  margin: 0;
  padding: 0;
}
img {
  max-width: 100%;
}
.filter-btn{
    border: 0;
    background: #f2f2f2;
    padding: 2px;
    display: -moz-inline-box;
    display: inline-flex;
    position: relative;
    flex-shrink: 0;
    width: 140px;
}
.filter-btn-content{
    display: block;
    font-size: 16px;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    width: 50%;
    color:#000;
    font-weight: 700;
}
.stock-title{
  color:black;
}
.color-side{
  width: 27px; 
  height:27px; 
  border-radius: 50%;
}
p {
  font-weight: normal;
  margin-bottom: 0;
  font-size: 16px;
  line-height: 1.5;
}
.stock-item{
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 16px 4px;
  text-decoration: none;
  color:#000;
}
.btn {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  background: #fff;
  text-align: center;
  outline: none;
  margin-top: 1.4rem;
  font-size: 18px;
  border: none;
  transition: .3s;
  border-radius: 50px;
  font-weight: 500;
}
.underline {
  text-decoration: underline;
}
.content-top-space {
  margin-top: 45px;
}

.box_shadow {
  border-radius: 5px;
  box-shadow: 0px 0px 8px 1px #0404040d;
  background: #fff;
}
.pt-top-100{
  padding-top: 100px;
}
.pb-top-100{
  padding-bottom: 100px;
}
.section-padding{
  padding-top: 60px;
}
.section-heading{
    font-size: 40px;
    font-weight: 700;
    line-height:1.5;
    color: #0910E2;
    text-align: center;
    padding-bottom: 30px;
    text-transform: uppercase;
}


@media only screen and (max-width: 348px)  {
  .right-side {
    grid-template-columns: repeat(1, minmax(0, 1fr))!important;
  }
  .quick-view2{
    font-size:12px!important;
  }
  .product-title h6{
    font-size:14px!important;
  }
  .product-title p{
    font-size:13px!important;
  }
  .product-title .content{
    min-height: 80px;
  }
}
@media only screen and (max-width: 480px)  {
  .right-side {
    grid-template-columns: repeat(2, minmax(0, 1fr))!important;
    gap: 2vw!important;
  }
  .product-title .content{
    min-height: 80px;
  }
  .product-title h6{
    font-size:14px!important;
  }
  .product-title p{
    font-size:13px!important;
  }
  .quick-view2{
    font-size:12px!important;
  }
}
@media only screen and (min-width: 480px) and (max-width: 768px)  {
  .right-side {
    grid-template-columns: repeat(2, minmax(0, 1fr))!important;
  }
}
#sidebar{
  border-right:1px solid #eee;
}
#sidebar h3{
  color:#262626;
  text-transform:uppercase;
  font-size:14px;
  font-weight:700;
  padding:35px 0 10px 0;
  letter-spacing:1px;
  clear:both;
}
#cart{padding:0px;}
#cart .empty{
  font-style:italic;
  color:#a0a3ab;
  font-size:14px;
  letter-spacing:1px; 
}
#sidebar .checklist{
  padding:0;
}

.checklist ul li{ 
  font-size:14px;
  font-weight:400;
  list-style:none;
  padding: 7px 0 7px 23px;
}
.filter-btn-content:first-child::before{
    content: "";
    background:transparent;
    border: 1px solid #000;
    position: absolute;
    left: 2px;
    top: 2px;
    bottom: 2px;
    width: -moz-calc(50% - 2px);
    width: calc(100% - 2px);
    transform: translateX(0);
    transition: transform .2s linear,-webkit-transform .2s linear,-moz-transform .2s linear;
}
.checklist li span{
  float:left;
  width:11px;
  height:11px;
  margin-left:-23px;
  margin-top:4px;
  border: 1px solid #d1d3d7;
  position:relative;  
}
.v-expansion-panel::before {
    box-shadow: none!important;
}

.brand-list{
  border-top: 1px solid rgb(185, 182, 182);
}
.brand-list,.brand-header{
  background-color:#ffff!important;
  padding-top: 5px!important;;
  padding-bottom:5px!important;
}
.brand-header{
  font-weight:600!important;
}
.v-expansion-panel--active > .v-expansion-panel-header, .v-expansion-panel-header {
  min-height:0!important;
  padding: 16px 18px 10px 0px!important;
}
.v-expansion-panel-content__wrap{
  padding:0!important;
}
.sizes li span, .categories .sizes li{
  -webkit-transition: all 300ms ease-out;
     -moz-transition: all 300ms ease-out;
      -ms-transition: all 300ms ease-out;
       -o-transition: all 300ms ease-out;
          transition: all 300ms ease-out;
}
.checklist li a{
  color:#676a74;
  text-decoration:none; 
  -webkit-transition: all 300ms ease-out;
     -moz-transition: all 300ms ease-out;
      -ms-transition: all 300ms ease-out;
       -o-transition: all 300ms ease-out;
          transition: all 300ms ease-out;
}
.checklist li a:hover{  
  color:#222;
  -webkit-transition: all 300ms ease-out;
     -moz-transition: all 300ms ease-out;
      -ms-transition: all 300ms ease-out;
       -o-transition: all 300ms ease-out;
          transition: all 300ms ease-out;
}
.checklist a:hover span{  
  border-color:#a6aab3; 
}


.quick-view{
  position: relative;
}

.best-saller:hover .cart-hover{
visibility: visible;
top: 10px;

}

.brand-item{
    padding: 1px 8px 13px 0;
    margin: 0 0 0 4px;
    align-items:center;
}
.color-item{
  align-items: center;
  border: 1px solid rgb(182, 177, 177);
}
.cart-hover {
    position: relative;
    left: 0;
    visibility: hidden;
}
.brand-list li a{
  color: #000;
  font-family: "Avenir";
  font-size: 17px;
}
</style>