<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="hero-wrapper">
      <div class="component-wrapper">
        <br><br>
        <div id="slider-wrapper">
  <div class="inner-wrapper">
    <input checked type="radio" name="slide" class="control" id="Slide1" />
    <label for="Slide1" id="s1"></label>
    <input type="radio" name="slide" class="control" id="Slide2" />
    <label for="Slide2" id="s2"></label>
    <input type="radio" name="slide" class="control" id="Slide3" />
    <label for="Slide3" id="s3"></label>
    <input type="radio" name="slide" class="control" id="Slide4" />
    <label for="Slide4" id="s4"></label>
    <div class="overflow-wrapper">
      <a class="slide" href=""><img src="https://storage.googleapis.com/image-computeandmore/Banner/Welcome%20banner/ASUS.jpg" /></a>
      <a class="slide" href=""><img src="https://storage.googleapis.com/file-computeandmore/images/e920c7e1-44d7-421b-b52b-a3b01f476cd4.jpg" /></a>
      <a class="slide" href=""><img src="https://storage.googleapis.com/file-computeandmore/images/dd1e3c81-8a8b-4594-8405-30b3f386b8c3.jpg" /></a>
      <a class="slide" href=""><img src="https://storage.googleapis.com/file-computeandmore/images/9fa46871-86f6-44a3-92ec-3830a68cc641.jpg" /></a>
    </div>
  </div>
</div>
        <div class="container new-product">
          <h2>สินค้ามาใหม่</h2>
          <div class="row">
            <div class="col-md-3" v-for="product in newProducts" v-bind:key="product.id">
              <div v-if="product.thumbnail != 'null'">
                <img class="img-responsive" :src="BASE_URL+product.thumbnail" alt="thumbnail" />
              </div>
              <div v-on:click="navigateTo('/front-view-product/'+ product.id)"><a href=""><h4>{{ product.title }}</h4></a></div>
              <!--<div v-html="product.content.slice(0,60) + '...'"></div>-->
              <p>
                <strong>ราคา:</strong>
                {{ product.prices | getNumberWithCommas
                }}
              </p>
              
              <div>
                <button v-on:click.prevent="addCart(product)" class="btn btnsm btn-danger">
                  <i class="fas fa-shopping-cart"></i> Add to cart
                </button>
                <button class="btn btn-warning" v-on:click="navigateTo('/front-view-product/'+ product.id)">
                  <i class="fab fareadme"></i>เพิ่มเติม
                </button>
                
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="product-header">
          <div>
            <form class="form-inline form-search">
              <span>
                <strong>จํานวน:</strong>
                {{results.length}}
              </span>
              &nbsp;
              <div class="form-group">
                <div class="input-group">
                  <input
                    type="text"
                    v-model="search"
                    class="form-control"
                    id="exampleInputAmount"
                    placeholder="Search"
                  />
                  <div class="input-group-addon">
                    <i class="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <ul class="categories">
            <li v-for="cate in category" v-bind:key="cate.index">
              <a v-on:click.prevent="setCategory(cate)" href="#">{{ cate }}</a>
            </li>
            <li class="clear">
              <a v-on:click.prevent="setCategory(' ')" href="#">Clear</a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <transition-group name="fade">
          <div v-for="product in products" v-bind:key="product.id" class="product-list">
             <div class="popup-cart" v-if="carts.length">
            <h3>ตระกร้าสินค้า</h3>
            <ul class="cart">
              <li v-for="cart in carts" v-bind:key="cart.id">
                <div>{{ cart.producttitle }} จํานวน {{ cart.qty}} x {{ cart.prices }}</div>
                <div>
                  <button v-on:click.prevent="inc(cart)">+</button>
                  <button v-on:click.prevent="dec(cart)">-</button>
                </div>
              </li>
            </ul>
            <hr />
            <p>รวมทั้งสิน: {{total | getNumberWithCommas}} บาท</p>
            <button class="btn btn-info" v-on:click.prevent="sendBuy">
              <i class="fas fa-check-square"></i> ทำการสั่งซื้อ
            </button>
          </div>
            <!-- <p>id: {{ product.id }}</p> -->
            <div class="product-pic">
              <!-- <transition name="fade"> -->
              <div class="thumbnail-pic" v-if="product.thumbnail != 'null'">
                <img :src="BASE_URL+product.thumbnail" alt="thumbnail" />
              </div>
              <!-- </transition> -->
            </div>
            <div v-on:click="navigateTo('/front-view-product/'+ product.id)"><a href=""><h3>{{ product.title }}</h3></a></div>
            <!--<div v-html="product.content.slice(0,200) + '...'"></div>-->
            <div class="product-info">
              <p>
                <strong>Category:</strong>
                {{ product.category }}
              </p>
              <p>
                <strong>Create:</strong>
                {{ product.createdAt }}
              </p>
              <!-- <p>status: {{ product.status }}</p> -->
              <p>
                <strong>ราคา:</strong>
                {{ product.prices | getNumberWithCommas
                }}
                
              </p>
              <p>
                <button v-on:click.prevent="addCart(product)" class="btn btnsm btn-danger">
                  <i class="fas fa-shopping-cart"></i> Add to cart
                </button>
                <button
                  class="btn btn-warning"
                  v-on:click="navigateTo('/front-view-product/'+ product.id)">
                  <i class="fab fareadme"></i> เพิ่มเติม
                </button>
              </p>
            </div>
            <div class="clearfix"></div>
          </div>
          
        </transition-group>
        <div v-if="products.length === 0 && loading === false" class="empty-product">*** ไม่มีข้อมูล***</div>
        <div id="product-list-bottom">
          <div class="product-load-finished" v-if="products.length === results.length && results.length > 0">โหลดข้อมูลครบแล้ว</div>
        </div>
      </div>
    </div>
    <!-- Site footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">com-gt.com <i>เป็นเว็บไซต์ที่เอาไว้จัดจำหน่ายอุปกรณ์คอมพิวเตอร์ทางออนไลน์ </i>สำหรับคนที่มีความต้องการซื้ออุปกรณ์คอมพิวเตอร์แต่ไม่สามารถเดินทางออกมาซื้อที่หน้าร้านได้เว็บไซต์เราจึงเป็นอีกหนึ่งทางเลือกที่จะช่วยให้ลูกค้าสะดวกสบายมากยิ่งขึ้น
</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
              <li v-for="cate in category" v-bind:key="cate.index">
              <a v-on:click.prevent="setCategory(cate)" href="#">{{ cate }}
            </a></li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <router-link :to="{name: 'front'}">
                <i class="fas fa-home"></i> Home
              </router-link><br>
              <router-link :to="{name: 'front-products'}">
              <i class="fas fa-shopping-bag"></i> Order Now
              </router-link>
            </ul>
          </div>
        </div>
        <hr>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2020 All Rights Reserved by 
         <a href="#">Com-gt</a>.
            </p>
          </div>
        </div>
      </div>
</footer>
  </div>
</template>
<script>
import ProductsService from "@/services/ProductsService";
import BuysService from "@/services/BuysService";
import _ from "lodash";
import ScrollMonitor from "scrollMonitor";
import { mapState } from "vuex";

let LOAD_NUM = 3;
let pageWatcher;

export default {
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: "front-products",
      };
      if (this.search !== "") {
        route.query = {
          search: this.search,
        };
      }
      console.log("search: " + this.search);
      this.$router.push(route);
    }, 700),
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.products = [];
        this.results = [];
        this.loading = true;
        this.results = (await ProductsService.frontIndex(value)).data;
        this.appendResults();
        this.results.forEach((product) => {
          if (this.category.length > 0) {
            // console.log(this.category.indexOf(product.category))
            if (this.category.indexOf(product.category) === -1) {
              this.category.push(product.category);
            }
          } else {
            this.category.push(product.category);
          }
        });
        this.loading = false;
        this.search = value;
        // console.log(this.category)
      },
    },
  },
  data() {
    return {
      products: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
      search: "",
      results: [],
      category: [],
      loading: false,
      newProducts: [],
      carts: [],
      total: 0
    };
  },
  // async created () {
  // this.products = (await ProductsService.index()).data
  // },
  async created() {
    let allProducts = (await ProductsService.frontIndex()).data;
    this.newProducts = allProducts.slice(0, 4);
  },
  methods: {
    sendBuy() {
      this.carts.forEach(async (cart) => {
        console.log("cart: " + JSON.stringify(cart));
        try {
          await BuysService.post(cart);
          this.$router.push({
            name: "cartlist",
          });
        } catch (err) {
          console.log(err);
        }
      });
    },
    inc(item) {
      item.qty++;
      this.total += parseInt(item.prices);
    },
    dec(item) {
      item.qty--;
      this.total -= parseInt(item.prices);
      if (item.qty <= 0) {
        let i = this.carts.indexOf(item);
        this.carts.splice(i, 1);
        // this.total = 0
      }
    },
    appendResults: function () {
      if (this.products.length < this.results.length) {
        let toAppend = this.results.slice(
          this.products.length,
          LOAD_NUM + this.products.length
        );
        this.products = this.products.concat(toAppend);
      }
    },
    navigateTo(route) {
      if (this.user == null) {
        alert("Please, Register or Login before.\n\nThank you.");
      } else {
        this.$router.push(route);
      }
    },
    async deleteProduct(product) {
      try {
        await ProductsService.delete(product);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.products = (await ProductsService.index()).data;
    },
    setCategory(keyword) {
      if (keyword === " ") {
        this.search = "";
        console.log("null");
      } else {
        this.search = keyword;
      }
    },
    addCart(product) {
      if (this.user == null) {
        alert("Please, Register or Login before.\n\nThank you.");
      } else {
        this.total += parseInt(product.prices);

        let found = false;
        this.carts.map((cart) => {
          if (cart.productid == product.id) {
            cart.qty++;
            found = true;
          }
        })

        if (!found) {
          let cart = {
            productid: product.id,
            
            userid: this.user.id,
            email: this.user.email ,
            qty: 1,
            pictures: "null",
            trackingnumber: "null",
            clientStatus: "รอชำระ",
            shopStatus: "รอส่ง",
            producttitle: product.title,
            username: this.user.name,
            userlastname: this.user.lastname,
            prices: product.prices,
          };
          this.carts.push(cart);
        }

        // console.log('carts length: ' + this.carts.length)
      }
    },
  },
  updated() {
    let sens = document.querySelector("#product-list-bottom");
    pageWatcher = ScrollMonitor.create(sens);
    pageWatcher.enterViewport(this.appendResults);
  },
  beforeUpdated() {
    if (pageWatcher) {
      pageWatcher.destroy();
      pageWatcher = null;
    }
  },
  /*mounted() {
    if (!this.isUserLoggedIn) {
      this.$router.push({
        name: "front-products",
      });
    }
  },*/
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  filters: {
    getNumberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<style scoped>
.popup-cart {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #ddd;
  background: #fff;
  width: 360px;
  padding: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}
.component-wrapper {
  padding-left: 5px;
  padding-right: 5px;
}
.hero {
  margin-top: 80px;
  max-width: 1150px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  background: lightslategray;
  height: 250px;
  color: white;
  padding: 20px;
}
.hero h1 {
  margin-top: 30px;
}
.logo {
  padding-right: 20px;
}
.hero {
  margin-top: 80px;
  border-radius: 5px;
  background: lightslategray;
  height: 250px;
  color: white;
  padding: 20px;
}
.hero h1 {
  margin-top: 30px;
}
.logo {
  padding-right: 20px;
  max-width: 200px;
}
.empty-product {
  width: 100%;
  text-align: center;
  padding: 10px;
  background: darksalmon;
  color: white;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
  padding: 5px 5px 5px 5px;
  border: solid 1px #ccc;
  margin: 10px 10px 0px 0px;
}
.product-info {
  float: left;
}
.product-pic {
  float: left;
}
.clearfix {
  clear: both;
}
.product-list {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.product-header {
  margin-top: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
#product-list-bottom {
  padding-top: 4px;
}
.product-load-finished {
  padding: 4px;
  text-align: center;
  background: seagreen;
  color: white;
}
.categories {
  margin-top: 20px;
  padding: 0;
  list-style: none;
  float: left;
}
.categories li {
  float: left;
  padding: 2px;
}
.categories li a {
  padding: 5px 10px 5px 10px;
  background: paleturquoise;
  color: black;
  text-decoration: none;
}
.categories li a:hover {
  color: white;
}
.categories li.clear a {
  background: tomato;
  color: white;
}
.categories li.clear a:hover{
  color: black;
}
.create-product {
  margin-top: 10px;
}
@media (max-width: 768px) {
  .logo {
    width: 120px;
  }
}
.new-product h2 {
  font-family: kanit;
  padding-bottom: 20px;
  margin-top: 30px;
}
.empty-product {
  width: 100%;
  text-align: center;
  padding: 4px;
  background: coral;
  color: white;
  margin-left: auto;
  margin-right: auto;
}
#slider-wrapper {
  width: 940px;
  height: 470px;
  margin: 50px auto;
  position: relative;
  margin-bottom: 0px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

#s1 {
  padding: 6px;
  background: #ffffff;
  position: absolute;
  left: 50%;
  bottom: 25px;
  margin-left: -36px;
  border-radius: 20px;
  opacity: 0.3;
  cursor: pointer;
  z-index: 999;
}

#s2 {
  padding: 6px;
  background: #ffffff;
  position: absolute;
  left: 50%;
  bottom: 25px;
  margin-left: -12px;
  border-radius: 20px;
  opacity: 0.3;
  cursor: pointer;
  z-index: 999;
}

#s3 {
  padding: 6px;
  background: #ffffff;
  position: absolute;
  left: 50%;
  bottom: 25px;
  margin-left: 12px;
  border-radius: 20px;
  opacity: 0.3;
  cursor: pointer;
  z-index: 999;
}

#s4 {
  padding: 6px;
  background: #ffffff;
  position: absolute;
  left: 50%;
  bottom: 25px;
  margin-left: 36px;
  border-radius: 20px;
  opacity: 0.3;
  cursor: pointer;
  z-index: 999;
}

#s1:hover,
#s2:hover,
#s3:hover,
#s4:hover {
  opacity: .50;
}

.inner-wrapper {
  width: 940px;
  height: 470px;
  position: absolute;
  top: 0;
  left: 0;
  margin-bottom: 0px;
  overflow: hidden;
}

.control {
  display: none;
}

#Slide1:checked ~ .overflow-wrapper {
  margin-left: 0%;
}

#Slide2:checked ~ .overflow-wrapper {
  margin-left: -100%;
}

#Slide3:checked ~ .overflow-wrapper {
  margin-left: -200%;
}

#Slide4:checked ~ .overflow-wrapper {
  margin-left: -300%;
}

#Slide1:checked + #s1 {
  opacity: 1;
}

#Slide2:checked + #s2 {
  opacity: 1;
}

#Slide3:checked + #s3 {
  opacity: 1;
}

#Slide4:checked + #s4 {
  opacity: 1;
}

.overflow-wrapper {
  width: 400%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: hidden;
  z-index: 1;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.slide img {
  width: 25%;
  float: left;
}
a:link {
  color: #2c3e50;
}
a:hover {
  color: gray;
}
.site-footer
{
  background-color:#26272b;
  padding:45px 0 20px;
  font-size:16px;
  line-height:24px;
  color:#737373;
}
.site-footer hr
{
  border-top-color:#bbb;
  opacity:0.5
}
.site-footer hr.small
{
  margin:20px 0
}
.site-footer h6
{
  color:#fff;
  font-size:20px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px
}
.site-footer a
{
  color:#737373;
}
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links
{
  padding-left:0;
  list-style:none
}
.footer-links li
{
  display:block
}
.footer-links a
{
  color:#737373
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links.inline li
{
  display:inline-block
}
.site-footer .social-icons
{
  text-align:right
}
.site-footer .social-icons a
{
  width:40px;
  height:40px;
  line-height:40px;
  margin-left:6px;
  margin-right:0;
  border-radius:100%;
  background-color:#33353d
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text,.site-footer .social-icons
  {
    text-align:center
  }
}
.social-icons
{
  padding-left:0;
  margin-bottom:0;
  list-style:none
}
.social-icons li
{
  display:inline-block;
  margin-bottom:4px
}
.social-icons li.title
{
  margin-right:15px;
  text-transform:uppercase;
  color:#96a2b2;
  font-weight:700;
  font-size:13px
}
.social-icons a{
  background-color:#eceeef;
  color:#818a91;
  font-size:16px;
  display:inline-block;
  line-height:44px;
  width:44px;
  height:44px;
  text-align:center;
  margin-right:8px;
  border-radius:100%;
  -webkit-transition:all .2s linear;
  -o-transition:all .2s linear;
  transition:all .2s linear
}
.social-icons a:active,.social-icons a:focus,.social-icons a:hover
{
  color:#fff;
  background-color:#29aafe
}
.social-icons.size-sm a
{
  line-height:34px;
  height:34px;
  width:34px;
  font-size:14px
}
.social-icons a.facebook:hover
{
  background-color:#3b5998
}
.social-icons a.twitter:hover
{
  background-color:#00aced
}
.social-icons a.linkedin:hover
{
  background-color:#007bb6
}
.social-icons a.dribbble:hover
{
  background-color:#ea4c89
}
@media (max-width:767px)
{
  .social-icons li.title
  {
    display:block;
    margin-right:0;
    font-weight:600
  }
}
</style>
