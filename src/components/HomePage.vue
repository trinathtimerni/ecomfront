<template>
  <div class="mt-md-4 mt-sm-0">
    <v-carousel height="auto" hide-delimiters>
    <v-carousel-item v-for="(slider, index) in sliders" :key="index">
        <a href="#" class="home">
            <div class="home-carousel1">
               <div class="home-bg"></div>
               <div class="container">
                  <div class="row">
                     <div class="col-md-6 d-flex align-items-center">
                        <div class="home-carousel-wraper">
                           <div class="home-carousel-wraper-img pt-10">
                               <img src="../assets/img/dior.png" alt="">
                           </div>
                           <div class="home-carousel-wraper-content px-2">
                              <h3 class="home-carousel-heading pt-4">
                                 {{slider.sub_title}}
                              </h3>
                              <p class="pt-4">{{slider.short_description}}</p>
                              <div class="py-4 mb-10">
                                 <button class="carouusel-btn shop-btn" :style="{'background-color': slider.button_bg_color}">{{slider.button}}</button>
                              </div>
                              <div></div>
                           </div>
                        </div>
                     </div>
                     <div class="col-md-6 mt-n10">
                        <img :src="`${baseEnvLocal}${slider.image}`" alt="">
                     </div>
                  </div>
               </div>
            </div>
         </a>
    
    </v-carousel-item>

    <!-- <v-carousel-item
     
    >
     <a href="#" class="home">
            <div class="home-carousel1">
               <div class="home-bg"></div>
               <div class="container">
                  <div class="row">
                     <div class="col-md-6 d-flex align-items-center">
                        <div class="home-carousel-wraper">
                           <div class="home-carousel-wraper-img pt-10">
                              <img src="../assets/img/dior.png" alt="">
                           </div>
                           <div class="home-carousel-wraper-content px-2">
                              <h3 class="home-carousel-heading pt-4">
                                 Lorem ipsum dolor sit amet.
                              </h3>
                              <p class="pt-4">with amazing value on hayfever &amp; suncare essentials for the whole family</p>
                              <div class="py-4 mb-10">
                                 <button class="carouusel-btn shop-btn">SHOP HAYFEVER</button>
                              </div>
                              <div></div>
                           </div>
                        </div>
                     </div>
                     <div class="col-md-6 mt-n10">
                        <img src="../assets/img/Hero_Dior.jpg" alt="">
                     </div>
                  </div>
               </div>
            </div>
         </a>
    
    </v-carousel-item> -->
  </v-carousel>


    <div class="when-spend pt-5" v-if="delivery_types.length > 0">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-6 sm-mb-30" v-for="delivery_type in delivery_types.slice(0,4)" :key="delivery_type.id">
            <div class="when-spend-content">
              <a href="">
                <div class="pb-2">
                  <img src="../assets/img/home-delivery.svg" alt="" />
                </div>
                <div>
                  <div
                    class="pb-1"
                    style="font-size: 17px; font-weight: bold; color: #05054b; letter-spacing: 1px"
                  >
                    {{delivery_type.name}}
                  </div>
                  <span style="color: #333; font-size: 15px; font-weight: 300"
                    >When You spend &#163; {{delivery_type.price}}</span
                  >
                </div>
              </a>
            </div>
          </div>
          <!-- <div class="col-md-3 col-sm-6 sm-mb-30">
            <div class="when-spend-content">
              <a href="">
                <div class="pb-2">
                  <img src="../assets/img/home-delivery.svg" alt="" />
                </div>
                <div>
                  <div
                    class="pb-1"
                    style="font-size: 17px; font-weight: bold; color: #05054b; letter-spacing: 1px"
                  >
                    Free Click & Collect
                  </div>
                  <span style="color: #333; font-size: 15px; font-weight: 300"
                    >When You spend &#163;15</span
                  >
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 sm-mb-30">
            <div class="when-spend-content">
              <a href="">
                <div class="pb-2">
                  <img src="../assets/img/home-delivery.svg" alt="" />
                </div>
                <div>
                  <div
                    class="pb-1"
                    style="font-size: 17px; font-weight: bold; color: #05054b; letter-spacing: 1px"
                  >
                    Free Click & Collect
                  </div>
                  <span style="color: #333; font-size: 15px; font-weight: 300"
                    >When You spend &#163;15</span
                  >
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 sm-mb-30">
            <div class="when-spend-content last-content-item">
              <a href="">
                <div class="pb-2">
                  <img src="../assets/img/home-delivery.svg" alt="" />
                </div>
                <div>
                  <div
                    class="pb-1"
                    style="font-size: 17px; font-weight: bold; color: #05054b; letter-spacing: 1px"
                  >
                    Free Click & Collect
                  </div>
                  <span style="color: #333; font-size: 15px; font-weight: 300"
                    >When You spend &#163;15</span
                  >
                </div>
              </a>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- SHOP BY DEPARTMENT -->
    <section class="reducer">
      <div class="department">
        <div class="container">
          <div
            class="text-center"
            style="margin-top: 50px; margin-bottom: 40px"
          >
            <span
              style="color: #1FA2DD; font-size: 26px; font-weight: 400; letter-spacing: 6px; text-transform: uppercase;"
              class=""
              >Shop By Department</span
            >
          </div>

          <div v-if="showCarousel" class="hide-class">
            <VueSlickCarousel :arrows="true" v-bind="departmentSettings">
              <div
                v-for="(department, index) in departments"
                :key="index" @click="getDepartmentProduct(department)"
                style="padding-right: 100px; padding-left: 100px"
              >
                <div class="item mx-10">
                  <div
                    class="text-center department-section"
                  >
                    <div class="mb-2">
                      <img :src="`${baseEnvLocal}${department.image}`" alt="" />
                    </div>
                    <p style="font-family: 'Open Sans';font-size: 16px; color: #AAA; font-weight: 200;">{{ department.name }}</p>
                  </div>
                </div>
              </div>
            </VueSlickCarousel>
          </div>

          <div class="d-md-none" v-if="showCarousel">
           <VueSlickCarousel :arrows="false" :dots="true"  v-bind="departmentSettingsSmall">
              <div
                v-for="(department, index) in departments"
                :key="index" @click="getDepartmentProduct(department)"
              >
                <div class="item mx-10">
                  <div
                    class="text-center department-section"
                  >
                    <div class="mb-2">
                      <img class="mx-auto" :src="`${baseEnvLocal}${department.image}`" alt="" />
                    </div>
                    <p style="font-family: 'Open Sans';font-size: 16px; color: #AAA; font-weight: 200;">{{ department.name }}</p>
                  </div>
                </div>
              </div>
            </VueSlickCarousel>
          </div>

        </div>
      </div>
    </section>
    <!-- protect -->
    <div class="protect px-4" v-if="summers.products != null">
      <div class="container">
        <div class="text-center" style="margin-top: 20px; margin-bottom: 50px">
          <span
            style="font-size: 26px; font-weight: 400; letter-spacing: 6px; text-transform: uppercase; color: #555"
            >{{summers.feature_products.title}}</span
          >
        </div>
        <div class="row">
          <div class="col-md-4 sm-mb-30 " v-for="hot_product in summers.products" :key="hot_product.id">
            <a href="#" class="my-5">
              <div class="protect-content">
                <div class="protect-content-img">
                  <img
                     :src="`${baseEnvLocal}${hot_product.product.main_image}`"
                    alt=""
                  />
                </div>
                <div class="protect-content-footer">
                  <h3 class="content-heading">Free Click & Collect</h3>
                  <p style="color: #444">When You spend &#163;15</p>
                  <div>
                    <button class="shop-btn" @click="productDetails(hot_product.product)">SHOP Now</button>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <!-- <div class="col-md-4 sm-mb-30 ">
            <a href="#" class="my-5">
              <div class="protect-content">
                <div class="protect-content-img">
                  <img
                    src="../assets/img/Homepage_33_ProjectPhoenix_IntimateHygiene_DX.dam.215x162x480.ts=1623230145766.jpg"
                    alt=""
                  />
                </div>
                <div class="protect-content-footer">
                  <h3 class="content-heading">Free Click & Collect</h3>
                  <p style="color: #444">When You spend &#163;15</p>
                  <div>
                    <button class="shop-btn">SHOP Now</button>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-4 sm-mb-30 ">
            <a href="#" class="my-5">
              <div class="protect-content">
                <div class="protect-content-img">
                  <img
                    src="../assets/img/Homepage_33_ProjectPhoenix_IntimateHygiene_DX.dam.215x162x480.ts=1623230145766.jpg"
                    alt=""
                  />
                </div>
                <div class="protect-content-footer">
                  <h3 class="content-heading">Free Click & Collect</h3>
                  <p style="color: #444">When You spend &#163;15</p>
                  <div>
                    <button class="shop-btn">SHOP Now</button>
                  </div>
                </div>
              </div>
            </a>
          </div> -->
        </div>
      </div>
    </div>
    <!-- fathers day gift -->
    <section class="fathers-day pt-70 px-4" v-if="hot_offers.products != null">
      <div class="container">
        <div class="text-center pb-50">
          <span
            style="font-size: 26px; font-weight: 400; letter-spacing: 6px; text-transform: uppercase; color: #cc0033"
            >{{hot_offers.feature_products.title}}</span>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-3 sm-mb-30" v-for="hot_product in hot_offers.products" :key="hot_product.id">
            <a href="#" class="my-15">
              <div class="father-content">
                <div>
                  <div class="father-content-img">
                    <img style="max-height:205px"
                      :src="`${baseEnvLocal}${hot_product.product.main_image}`"
                      alt=""
                    />
                  </div>
                  <div class="save">
                    <h3 class="content-heading">Save {{hot_offers.feature_products.discount}}</h3>
                  </div>
                </div>
                <div>
                  <div class="father-content-footer">
                    <div class="oct-teaser">
                      <div>
                        <h3 class="content-heading">Only {{hot_product.product.price}}</h3>
                        <!-- <p style="color: #555; font-weight: 300">
                          on Gillette Labs Heated Razor For Men
                        </p> -->
                        <p style="color: #555; font-weight: 300">
                          {{hot_product.product.short_description}}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button class="shop-btn" @click="productDetails(hot_product.product)">SHOP Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <!-- <div class="col-md-6 col-lg-3 sm-mb-30">
            <a href="#" class="my-15">
              <div class="father-content">
                <div>
                  <div class="father-content-img">
                    <img
                      src="../assets/img/Homepage_33_ProjectPhoenix_IntimateHygiene_DX.dam.215x162x480.ts=1623230145766.jpg"
                      alt=""
                    />
                  </div>
                  <div class="save">
                    <h3 class="content-heading">Save £15</h3>
                  </div>
                </div>
                <div>
                  <div class="father-content-footer">
                    <div class="oct-teaser">
                      <div>
                        <h3 class="content-heading">Only £74.99</h3>
                        <p style="color: #555; font-weight: 300">
                          on Gillette Labs Heated Razor For Men
                        </p>
                        <p style="color: #555; font-weight: 300">
                          The warmth &amp; sensation of a hot towel shave at the
                          push of a button
                        </p>
                      </div>
                    </div>
                    <div>
                      <button class="shop-btn">SHOP Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-6 col-lg-3 sm-mb-30">
            <a href="#" class="my-15">
              <div class="father-content">
                <div>
                  <div class="father-content-img">
                    <img
                      src="../assets/img/Homepage_33_ProjectPhoenix_IntimateHygiene_DX.dam.215x162x480.ts=1623230145766.jpg"
                      alt=""
                    />
                  </div>
                  <div class="save">
                    <h3 class="content-heading">Save £15</h3>
                  </div>
                </div>
                <div>
                  <div class="father-content-footer">
                    <div class="oct-teaser">
                      <div>
                        <h3 class="content-heading">Only £74.99</h3>
                        <p style="color: #555; font-weight: 300">
                          on Gillette Labs Heated Razor For Men
                        </p>
                        <p style="color: #555; font-weight: 300">
                          The warmth &amp; sensation of a hot towel shave at the
                          push of a button
                        </p>
                      </div>
                    </div>
                    <div>
                      <button class="shop-btn">SHOP Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-6 col-lg-3 sm-mb-30">
            <a href="#" class="my-15">
              <div class="father-content">
                <div>
                  <div class="father-content-img">
                    <img
                      src="../assets/img/Homepage_33_ProjectPhoenix_IntimateHygiene_DX.dam.215x162x480.ts=1623230145766.jpg"
                      alt=""
                    />
                  </div>
                  <div class="save">
                    <h3 class="content-heading">Save £15</h3>
                  </div>
                </div>
                <div>
                  <div class="father-content-footer">
                    <div class="oct-teaser">
                      <div>
                        <h3 class="content-heading">Only £74.99</h3>
                        <p style="color: #555; font-weight: 300">
                          on Gillette Labs Heated Razor For Men
                        </p>
                        <p style="color: #555; font-weight: 300">
                          The warmth &amp; sensation of a hot towel shave at the
                          push of a button
                        </p>
                      </div>
                    </div>
                    <div>
                      <button class="shop-btn">SHOP Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div> -->
        </div>
      </div>
    </section>
    <section class="love-island pt-70">
      <div class="container">
        <a href="#">
          <div class="island-wrapper">
            <div>
              <img src="../assets/img/boots_love_island_logo.png" alt="" />
            </div>
            <div>
              <p>Lorem ipsum, dolor sit amet consectetur.</p>
              <P class="pt-1 d-sm-block d-lg-none">Find the way</P>
            </div>
            <div
              class="d-flex align-items-center justify-content-space-between d-sm-none d-lg-block"
            >
              <P class="pr-3">Find the way</P>
              <img class="" src="assets/img/Corporate7.PNG" alt="" />
            </div>
          </div>
        </a>
      </div>
    </section>
    <!-- <section class="dyson-hair pt-10">
         <div class="container">
            <div class="dyson-bg pb-10" style="border-radius: 15px">
               <div class="text-center">
                  <h3 class="section-heading">FEEL-GOOD BEAUTY DEALS</h3>
               </div>
               <div class="row justify-content-center">

         <div class="col-11">
            <div class="row">
               <div class="col-md-6 sm-mb-30">
                <a href="#" class="item-wrapper my-15">
                  <div class="item-wrapper__contents">
                     <div class="item-wrapper__contents-panel">
                        <div class="item-wrapper__main-content">
                           <div>
                              <h3 class="item-wrapper__title">Only £74.99</h3>
                           </div>
                           <div class="item-wrapper__body-copy">
                              <p>on Gillette Labs Heated Razor For Men</p>
                              <p>
                                 <p>on Gillette Labs Heated Razor For Men</p>
                                 <br>
                                 <p>on Gillette Labs Heated Razor For Men</p>
                                 <p>
                                    <br>
                                    The warmth &amp; sensation of a hot towel shave at the push of a button
                                    <br>
                                 </p>
                              </div>
                           </div>
                           <div class="item-wrapper__calls-to-action">
                              <button class="shop-btn">SHOP NOW</button>
                           </div>
                        </div>
                     </div>
                     <div class="item-wrapper__img">
                        <picture>
                           <img src="../assets/img/9a_Gift_50_GiftsForDad_Lifestyle.dam.35x23x720.ts=1615984925527.jpg" alt="">
                        </picture>
                     </div>
                  </a>
               </div>
               <div class="col-md-6 sm-mb-30">
                  <a href="#" class="item-wrapper my-15">
                     <div class="item-wrapper__contents">
                        <div class="item-wrapper__contents-panel">
                           <div class="item-wrapper__main-content">
                              <div>
                                 <h3 class="item-wrapper__title">Only £74.99</h3>
                              </div>
                              <div class="item-wrapper__body-copy">
                                 <p>on Gillette Labs Heated Razor For Men</p>
                                    <p>on Gillette Labs Heated Razor For Men</p>
                                    <p>on Gillette Labs Heated Razor For Men</p>
                                    <p>
                                       The warmth &amp; sensation of a hot towel shave at the push of a button
                                    </p>
                                 </div>
                              </div>
                              <div class="item-wrapper__calls-to-action">
                                 <button class="shop-btn">SHOP NOW</button>
                              </div>
                           </div>
                        </div>
                        <div class="item-wrapper__img">
                           <picture>
                              <img src="https://assets.boots.com/content/dam/boots/homepage/2021/06-june/07-06-2021/Homepage_50_No7_GWP_1106_DX.dam.ts%3D1623403223751.jpg" alt="">
                           </picture>
                        </div>
                        <div class="item-wrapper__callouts">
                           <div class="save">
                              <h3 class="content-heading">WORTH £25</h3>
                           </div>
                        </div>
                     </a>
                  </div>
               </div>
            </div>
                  </div>
               </div>
            </div>
         </div>
      </section> -->
    <section class="feel-good px-4" v-if="new_arrival.products != null">
      <div class="container">
        <div class="text-center" style="margin-top: 30px; margin-bottom: 50px;">
          <span
            style="font-size: 26px; font-weight: 400; letter-spacing: 6px; text-transform: uppercase; color: #05054b"
            >{{new_arrival.feature_products.title}}</span
          >
        </div>
        <div class="row">
          <div class="col-md-6 sm-mb-30" v-for="new_product in new_arrival.products" :key="new_product.id">
            <a href="#" class="item-wrapper mb-5">
              <div class="item-wrapper__contents">
                <div class="item-wrapper__contents-panel">
                  <div class="item-wrapper__main-content">
                    <div>
                      <div
                        style="color: #05054b; font-size: 26px; padding-bottom: 20px"
                      >
                        Only {{new_product.product.price}}
                      </div>
                    </div>
                    <div class="item-wrapper__body-copy">
                      <p
                        style="letter-spacing: 4px; font-size: 20px; font-weight: 300px; color: #555; border-bottom: 1px solid #BBB"
                      >
                        Έcέnce
                      </p>
                      <div
                        style="padding-top: 8px; letter-spacing: 1px; color: #555"
                      >
                        {{new_product.product.short_description}}
                      </div>
                    </div>
                  </div>
                  <div class="item-wrapper__calls-to-action">
                    <button class="shop-btn">SHOP NOW</button>
                  </div>
                </div>
              </div>
              <div class="item-wrapper__img">
                <picture>
                  <img
                    :src="`${baseEnvLocal}${new_product.product.main_image}`"
                    alt=""
                  />
                </picture>
              </div>
            </a>
          </div>
          <!-- <div class="col-md-6 sm-mb-30">
            <a href="#" class="item-wrapper">
              <div class="item-wrapper__contents">
                <div class="item-wrapper__contents-panel">
                  <div class="item-wrapper__main-content">
                    <div>
                      <div
                        style="color: #05054b; font-size: 26px; padding-bottom: 20px"
                      >
                        Only £24.99
                      </div>
                    </div>
                    <div class="item-wrapper__body-copy">
                      <p
                        style="letter-spacing: 4px; font-size: 20px; font-weight: 300px; color: #555; border-bottom: 1px solid #BBB"
                      >
                        La ё Luіїй
                      </p>
                      <div
                        style="padding-top: 8px; letter-spacing: 1px; color: #555"
                      >
                        The warmth &amp; sensation of a hot towel shave at the
                        push of a button. It is a long established fact that a
                        reader will be distracted by the readable content of a
                        page when looking at its layout. The point of using
                        Lorem Ipsum is that it has a more-or-less normal
                        distribution of letters, as opposed to using 'Content
                        here, content here', making it look like readable
                        English.
                      </div>
                    </div>
                  </div>
                  <div class="item-wrapper__calls-to-action">
                    <button class="shop-btn">SHOP NOW</button>
                  </div>
                </div>
              </div>
              <div class="item-wrapper__img">
                <picture>
                  <img
                    src="https://assets.boots.com/content/dam/boots/homepage/2021/06-june/07-06-2021/Homepage_50_No7_GWP_1106_DX.dam.ts%3D1623403223751.jpg"
                    alt=""
                  />
                </picture>
              </div>
              <div class="item-wrapper__callouts">
                <div class="save">
                  <h3 class="content-heading">WORTH £25</h3>
                </div>
              </div>
            </a>
          </div> -->
        </div>
      </div>
    </section>

    <section class="ummissable" style="padding-top: 70px">
      <div class="container">
        <div class="soltan-wrapper">
          <div>
            <img src="../assets/img/Soltan_Strip-desktop2021.png" alt="" />
          </div>
          <div class="d-flex justify-content-around align-items-center">
            <p>Lorem ipsum dolor sit amet consectetur!</p>
            <button class="shop-offer">Shop Now</button>
          </div>
        </div>
      </div>
    </section>
    <section class="health-care px-4" v-if="health_care && health_care.products != null">
      <div class="container">
        <div class="text-center" style="margin-top: 50px;">
          <span
            style="font-size: 26px; font-weight: 400; letter-spacing: 6px; text-transform: uppercase; color: #05054b"
            >HOW TO GET THE HEALTHCARE YOU NEED</span
          >
        </div>
        <div class="row" v-for="health_product in health_care.feature_products" :key="health_product.id">
          <div class="col-md-4 sm-mb-30 ">
            <a href="#" class="item-wrapper my-15">
              <div class="item-wrapper__contents">
                <div class="item-wrapper__contents-panel">
                  <div class="item-wrapper__main-content">
                    <div>
                      <h3 class="item-wrapper__title blue-color">
                        {{health_product.title}}
                      </h3>
                    </div>
                    <div class="item-wrapper__body-copy">
                      <div
                        style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px"
                      >
                        {{health_product.description}}
                      </div>
                    </div>
                  </div>
                  <div class="item-wrapper__calls-to-action">
                    <button class="shop-btn">SHOP NOW</button>
                  </div>
                </div>
              </div>
              <div class="item-wrapper__img">
                <picture>
                  <img
                    :src="`${baseEnvLocal}${health_product.product.main_image}`"
                    alt=""
                  />
                </picture>
              </div>
            </a>
          </div>
          <!-- <div class="col-md-4 sm-mb-30 ">
            <a href="#" class="item-wrapper my-15">
              <div class="item-wrapper__contents">
                <div class="item-wrapper__contents-panel">
                  <div class="item-wrapper__main-content">
                    <div>
                      <h3 class="item-wrapper__title blue-color">
                        Only £74.99
                      </h3>
                    </div>
                    <div class="item-wrapper__body-copy">
                      <div class="item-wrapper__body-copy">
                        <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px"
                        >
                          This is it. And Testing For the good or for good.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item-wrapper__calls-to-action">
                    <button class="shop-btn">Find Out More</button>
                  </div>
                </div>
              </div>
              <div class="item-wrapper__img">
                <picture>
                  <img
                    src="../assets/img/Homepage_33_HealthHub_0806_DX.dam.215x162x480.ts=1623158637136.jpg"
                    alt=""
                  />
                </picture>
              </div>
            </a>
          </div>
          <div class="col-md-4 sm-mb-30 ">
            <a href="#" class="item-wrapper my-15">
              <div class="item-wrapper__contents">
                <div class="item-wrapper__contents-panel">
                  <div class="item-wrapper__main-content">
                    <div>
                      <h3 class="item-wrapper__title blue-color">
                        Only £74.99
                      </h3>
                    </div>
                    <div class="item-wrapper__body-copy">
                      <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px"
                        >
                          This is it. And Testing For the good or for good. Lorem ipsome dolor sit emit th efunction thiolo kid the oiil cylinder.
                        </div>
                    </div>
                  </div>
                  <div class="item-wrapper__calls-to-action">
                    <button class="shop-btn">Find Out More</button>
                  </div>
                </div>
              </div>
              <div class="item-wrapper__img">
                <picture>
                  <img
                    src="../assets/img/Homepage_33_HealthHub_0806_DX.dam.215x162x480.ts=1623158637136.jpg"
                    alt=""
                  />
                </picture>
              </div>
            </a>
          </div> -->
        </div>
      </div>
    </section>
    <section class="health-shop px-4">
      <div class="container">
        <div class="text-center" style="margin-top: 110px; margin-bottom: 60px">
          <span
            style="font-size: 26px; font-weight: 400; letter-spacing: 6px; text-transform: uppercase; color: #05054b"
            >OFFERS ON YOUR HEALTH SHOP & FREE GIFTS</span
          >
        </div>
        <div class="row">
          <div class="col-md-4 sm-mb-30 ">
            <a href="#" class="item-wrapper ">
              <!-- HERE -->
              <div class="item-wrapper__contents">
                <div class="item-wrapper__contents-panel">
                  <div class="item-wrapper__main-content">
                    <div>
                      <h3 class="item-wrapper__title red-color">Only £74.99</h3>
                    </div>
                    <div class="item-wrapper__body-copy">
                       <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px"
                        >
                          This is it. And Testing For the good or for good. Lorem ipsome dolor sit emit th efunction thiolo kid the oiil cylinder.
                        </div>
                        <br />
                        <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px"
                        >
                          This is it. And Testing For the good or for good. Lorem ipsome dolor sit emit th efunction thiolo kid the oiil cylinder.
                        </div>
                        
                     
                    </div>
                  </div>
                  <div class="item-wrapper__calls-to-action">
                    <button class="shop-btn">SHOP NOW</button>
                  </div>
                </div>
              </div>
              <div class="item-wrapper__img">
                <picture>
                  <img
                    src="https://assets.boots.com/content/dam/boots/homepage/2021/06-june/07-06-2021/Homepage_50_No7_GWP_1106_DX.dam.ts%3D1623403223751.jpg"
                    alt=""
                  />
                </picture>
              </div>
              <div class="item-wrapper__callouts">
                <div class="save">
                  <h3 class="content-heading">
                    OVER £14 <br />
                    WORTH OF POINT
                  </h3>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-4 sm-mb-30 ">
            <a href="#" class="item-wrapper">
              <!-- HERE -->
              <div class="item-wrapper__contents">
                <div class="item-wrapper__contents-panel">
                  <div class="item-wrapper__main-content">
                    <div>
                      <h3 class="item-wrapper__title red-color">Only £74.99</h3>
                    </div>
                    <div class="item-wrapper__body-copy">
                      <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px"
                        >
                          This is it. And Testing For the good or for good. Lorem ipsome dolor sit emit th efunction thiolo kid the oiil cylinder.
                        </div>
                        <br />
                        <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px"
                        >
                          This is it. And Testing For the good or for good. Lorem ipsome dolor sit emit th efunction thiolo kid the oiil cylinder.
                        </div>
                    </div>
                  </div>
                  <div class="item-wrapper__calls-to-action">
                    <button class="shop-btn">Find Out More</button>
                  </div>
                </div>
              </div>
              <div class="item-wrapper__img">
                <picture>
                  <img
                    src="https://assets.boots.com/content/dam/boots/homepage/2021/06-june/07-06-2021/Homepage_50_No7_GWP_1106_DX.dam.ts%3D1623403223751.jpg"
                    alt=""
                  />
                </picture>
              </div>
              <div class="item-wrapper__callouts">
                <div class="save">
                  <h3 class="content-heading">
                    OVER £14 <br />
                    WORTH OF POINT
                  </h3>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-4 sm-mb-30 ">
            <a href="#" class="item-wrapper">
              <!-- HERE my-here -->
              <div class="item-wrapper__contents">
                <div class="item-wrapper__contents-panel">
                  <div class="item-wrapper__main-content">
                    <div>
                      <h3 class="item-wrapper__title red-color">Only £74.99</h3>
                    </div>
                    <div class="item-wrapper__body-copy">
                     <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px"
                        >
                          This is it. And Testing For the good or for good. Lorem ipsome dolor sit emit th efunction thiolo kid the oiil cylinder.
                        </div>
                        <br />
                        <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px"
                        >
                          This is it. And Testing For the good or for good. Lorem ipsome dolor sit emit th efunction thiolo kid the oiil cylinder.
                        </div>
                    </div>
                  </div>
                  <div class="item-wrapper__calls-to-action">
                    <button class="shop-btn">Find Out More</button>
                  </div>
                </div>
              </div>
              <div class="item-wrapper__img">
                <picture>
                  <img
                    src="https://assets.boots.com/content/dam/boots/homepage/2021/06-june/07-06-2021/Homepage_50_No7_GWP_1106_DX.dam.ts%3D1623403223751.jpg"
                    alt=""
                  />
                </picture>
              </div>
              <div class="item-wrapper__callouts">
                <div class="save">
                  <h3 class="content-heading">
                    OVER £14 <br />
                    WORTH OF POINT
                  </h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="show-team px-4">
      <div class="container">
        <div class="text-center" style="margin-top: 70px">
          <span
            style="font-size: 26px; font-weight: 400; letter-spacing: 6px; text-transform: uppercase; color: #555"
            >OFFERS ON YOUR HEALTH SHOP & FREE GIFTS</span
          >
        </div>
        <div class="row" v-if="special_days.length > 0">
          <div class="col-md-6 sm-mb-30" v-for="special in special_days" :key="special.id">
            <a href="#" class="item-wrapper my-15">
              <div class="item-wrapper__contents">
                <div class="item-wrapper__contents-panel">
                  <div class="item-wrapper__main-content">
                    <div>
                      <h3 class="item-wrapper__title blue-color">
                        {{special.title}}
                      </h3>
                    </div>
                    <div class="item-wrapper__body-copy">
                      <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px; color: #4c241a"
                        >
                          {{special.short_description}}
                        </div>
                        <br />
                        <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px; color: #4c241a"
                        >
                          {{special.description}}
                        </div>
                    </div>
                  </div>
                  <div class="item-wrapper__calls-to-action">
                    <button class="shop-btn">{{special.button_name}}</button>
                  </div>
                </div>
              </div>
              <div class="item-wrapper__img">
                <picture>
                  <img
                    :src="`${baseEnvLocal}${special.image}`"
                    alt=""
                  />
                </picture>
              </div>
            </a>
          </div>
          <!-- <div class="col-md-6 sm-mb-30">
            <a href="#" class="item-wrapper my-15">
              <div class="item-wrapper__contents">
                <div class="item-wrapper__contents-panel">
                  <div class="item-wrapper__main-content">
                    <div>
                      <h3 class="item-wrapper__title blue-color">
                        Pride rainbow make-up tutorial
                      </h3>
                    </div>
                    <div class="item-wrapper__body-copy">
                       <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px; color: #4c241a"
                        >
                          This is it. And Testing For the good or for good. Lorem ipsome dolor sit emit th efunction thiolo kid the oiil cylinder.
                        </div>
                        <br />
                        <div
                          style="font-size: 17px; font-family: 'Open Sans'; font-weight: 300; letter-spacing: 1px; color: #4c241a"
                        >
                          This is it. And Testing For the good or for good. Lorem ipsome dolor sit emit th efunction thiolo kid the oiil cylinder.
                        </div>
                    </div>
                  </div>
                  <div class="item-wrapper__calls-to-action">
                    <button class="shop-btn">Find Out More</button>
                  </div>
                </div>
              </div>
              <div class="item-wrapper__img">
                <picture>
                  <img
                    src="../assets/img/9a_Gift_50_GiftsForDad_Lifestyle.dam.35x23x720.ts=1615984925527.jpg"
                    alt=""
                  />
                </picture>
              </div>
              <div class="item-wrapper__callouts">
                <div class="save">
                  <h3 class="content-heading">WORTH £25</h3>
                </div>
              </div>
            </a>
          </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import {mapState, mapActions} from "vuex"
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  data: () => ({

    baseEnvLocal: baseEnv,
    departments: [],
    apiArg: {
      department_id: ""
    },
    sliders: [],
    departmentSettings: {
      dots: true,
      dotsClass: "slick-dots custom-dot-class",
      edgeFriction: 0.35,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: true
    },
    departmentSettingsSmall: {
      dots: true,
      dotsClass: "slick-dots custom-dot-class",
      edgeFriction: 0.35,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true
    },
    showCarousel: false,
  }),
  components: {
    VueSlickCarousel,
    carousel
  },
  async created(){
    this.getDepartments();
    this.getSliders();
    this.getDeliveryTypes();
    this.getSpecialDays();
    this.getHotOffers();
    this.getSummers();
    this.getHealthCare();
    this.getNewArrival();
  },
  computed: {
    ...mapState("product", ["delivery_types"]),
    ...mapState("product", ["special_days"]),
    ...mapState("homepage", ["hot_offers"]),
    ...mapState("homepage", ["summers"]),
    ...mapState("homepage", ["health_care"]),
    ...mapState("homepage", ["new_arrival"]),
  },
  methods: {
     ...mapActions("product",["getDeliveryTypes"]),
     ...mapActions("product",["getSpecialDays"]),
     ...mapActions("homepage",["getHotOffers"]),
     ...mapActions("homepage",["getSummers"]),
     ...mapActions("homepage",["getHealthCare"]),
     ...mapActions("homepage",["getNewArrival"]),
    async getDepartments()
    {
       this.showCarousel = false;
     await this.$store.dispatch("homepage/getDepartments").then(() => {
       this.$nextTick(() => {
       this.showCarousel = true;
      });

     });
     this.departments = this.$store.getters['homepage/departments']
     console.log('Departments', this.baseEnvLocal);
    },
    productDetails(product){
      this.$store
        .dispatch("product/getProductDetails", this.$route.params.id
        )
        .then(() => {
          this.$router.push({ name: "Product", params: { id: product.id}})
        })
        .catch(() => {});
      // this.$router.push('/product_info').catch(() => {});
      // this.$router.push({ name: "Product", params: { id: product.id}}).catch(() => {});
    },
    async getDepartmentProduct(department)
    {
      this.load = true
        this.apiArg.department_id = department.slug
        await this.$store.dispatch("product/getDepartmentProducts",this.apiArg).then((res) => {
          this.load = false
          this.$router.push({ name: "DepartmentProduct", params: { id: department.slug}});

          console.log(res.data);
        })
        .catch(() => {});
    },
    async getSliders()
    {
      //  this.showCarousel = false;
     await this.$store.dispatch("homepage/getSliders").then((response) => {
       this.sliders = response;
     });
    },
  }
};
</script>

<style>
.hide-class {
  display: block;
}
.reducer{

}
@media screen and (max-width: 600px) {
  .hide-class {
    display: none;
  }
  .reducer{
    margin-top: -60px;
  }
}
.slick-prev:before,
.slick-next:before {
  color: #555 !important;
}
.slick-prev:before {
  content: "\F0141";
  font: normal normal normal 40px/1 "Material Design Icons";
  position: relative;
  left: 0px;
  top: 0px;
}
.slick-next:before {
  content: "\F0142";
  font: normal normal normal 40px/1 "Material Design Icons";
  position: relative;
  left: 0px;
  top: 0px;
}

.slick-prev,
.slick-next {
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 35%;
  display: block;
  width: 30px;
  height: 30px;
  padding: 0;
  transform: translate(0%, -50%);
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
  background: transparent;
}
.department{
  font-family: 'Open Sans';
  font-size: 12px;
  font-weight: 200;
  color: rgb(99, 99, 99);
}
</style>
