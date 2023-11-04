<template>
<div>
    <main-header navsel="front"></main-header>
    <div class="hero-wrapper">
  <div id="carlist">
    <main-header navsel="front"></main-header>
    
    <div class="user-info">
      <br />
      <br />
      <h1>แสดงข้อมูลผู้ใช้งาน</h1>
      <div class="form-wrapper" v-if="user != null">
        <div class="form-horizontal">
          <div class="form-group">
            <label for class="control-label col-md-2">Name:</label>
            <div class="col-md-8">
              <input
                class="form-control"
                type="text"
                v-model="user.name"
                disabled
              />
            </div>
          </div>
          <div class="form-group">
            <label for class="control-label col-md-2">Lastname:</label>
            <div class="col-md-8">
              <input
                class="form-control"
                type="text"
                v-model="user.lastname"
                disabled
              />
            </div>
          </div>
          <div class="form-group">
            <label for class="control-label col-md-2">Email:</label>
            <div class="col-md-8">
              <input
                class="form-control"
                type="email"
                v-model="user.email"
                disabled
              />
            </div>
          </div>
          <div class="form-group">
            <label for class="control-label col-md-2">address:</label>
            <div class="col-md-8">
              <input
                class="form-control"
                type="text"
                v-model="user.address"
                disabled
              />
            </div>
          </div>
          <div class="form-group">
            <label for class="control-label col-md-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            &nbsp;&nbsp;&nbsp;<button class="btn btn-sm btn-warning" v-on:click="navigateTo('/front/edit/'+ user.id)">แก้ไขข้อมูล</button>

          </div>
        </div>
      </div>
    </div>
    
    <!-- cart info -->
    <div v-if="transections.length" class="cart-info container">
      <div class="rows">
        <div class="col-md-12">
          <div class="transection-wrapper">
            <h4>รายละเอียดการสั่ง</h4>
            <ul class="trasection-list">
              <li class="lii" v-for="transection in transections" v-bind:key="transection.id" >
                <h4> {{ transection.producttitle }} จํานวน {{ transection.qty }} x {{ transection.prices }}
                </h4>
                <p>
                  <strong>ราคารวม :</strong> {{ (transection.qty * transection.prices) | getNumberWithCommas }}บาท
                </p>
                <p>
                  <strong>สถานะลูกค้า :</strong> <span style="color: red;" v-if="transection.clientStatus == 'รูปภาพไม่สามารถใช้งานได้'">{{ transection.clientStatus }} </span> <span style="color: green;" v-if="transection.clientStatus == 'ชำระแล้ว'">{{ transection.clientStatus }} </span> <span style="color: blue;" v-if="transection.clientStatus == 'รอตรวจสอบการชำระเงิน'">{{ transection.clientStatus }} </span> <span  v-if="transection.clientStatus == 'รอชำระ'">{{ transection.clientStatus }} </span>
                </p>
                <p>
                  <table>
                    <tr>
                      <td>
                        <div>
                          <form enctype="multipart/form-data" novalidate>
                              <div class="dropbox">
                                  <input type="file" multiple :name="uploadFieldName"
                                  :disabled="isSaving" @change="filesChange($event.target.name,
                                  $event.target.files,transection.id); fileCount = $event.target.files.length"
                                  accept="image/*" class="input-file">
                              </div>
                          </form>
                        </div>
                      </td>
                      <td>

                      </td>
                    </tr>
                  </table>
                  
                </p>
                <transition-group  name="fade" >    
                  <li   v-for="picture in pictures" v-bind:key="picture.id">    
                    <button class="btn btn-xs btn-info"  v-if="pictures.length == picture.id && pictures.name != buy.pictures && transection.id == buy.idshow" v-on:click.prevent="useThumbnail(transection.id,picture.name)">ยืนยัน</button>
                  </li>  
                </transition-group>
                
                <p>

                  <transition name="fade" v-if="buy.cheakshow != 'false' && transection.id == buy.idshow">
                    <div class="thumbnail-pic" v-if="transection.pictures != 'null' || buy.cheakshow == 'true'">
                      <div class="container">
                      <input type="checkbox" id="zoomCheck"  >
                      <label for="zoomCheck">
                      <img class="img-thumbnail" v-on:click="sav(transection.id)"  height="120px" width="170px" :src="BASE_URL+transection.pictures" alt="thumbnail">
                      </label>
                      </div>
                      
                    </div>
                  </transition>

                  <p>
                    <button  v-if="buy.pictures != 'null' || (transection.pictures != 'null' || buy.cheakshow == 'false')" v-on:click.prevent="cheakshow(transection.id)" class="btn btnxs btn-success">Show img </button>
                    <button  v-if="buy.cheakshow == 'true' && transection.id == buy.idshow" v-on:click.prevent="cheakshowfalse(transection.id)" class="btn btnxs btn">ปิด </button>
                  </p>
                  
                  
                  
                  <div>
                    <div class="clearfix"></div>
                  </div>  
                
                 <p v-if="buy.pictures == 'null' && transection.clientStatus == 'ชำระแล้ว' && buy.sav == 'true'">
                   <br><br>
                </p>
                <p>
                  <button v-if="buy.pictures == 'null' && transection.clientStatus == 'ชำระแล้ว' && buy.sav != 'true'" class="btn btnxs btn-success" disabled> ยืนยันการชําระเงิน </button>
                </p>
                <p>
                  <button v-if="buy.pictures != 'null' && transection.clientStatus != 'ชำระแล้ว'" v-on:click.prevent="sendPaid(transection.id)" class="btn btnxs btn-success" > ยืนยันการชําระเงิน </button>
                </p>
                <p>
                  <button v-if="buy.pictures == 'null' && transection.clientStatus != 'ชำระแล้ว'" class="btn btnxs btn-success" > ยืนยันการชําระเงิน </button>
                </p>
                <p>
                  <strong>สถานะร้านค้า :</strong> {{ transection.shopStatus }}
                </p>
                
                <p>
                  <transition name="fade">
                    <div class="thumbnail-pic" v-if="transection.trackingnumber != 'null' && transection.trackingnumber != '' ">
                      <strong>trackingnumber :</strong> {{ transection.trackingnumber }}         
                    </div>
                  </transition>
                </p>
                <p>
                  <strong>วันที่ :</strong> {{ transection.createdAt | formatedDate }} 
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div class="trasection-null">ไม่มีรายการสั่งซื้อขณะนี้</div>
      
    </div>
  </div>
  </div><br><br><br><br><br><br><br><br><br><br><br><br><br>
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
import { mapState } from "vuex";
import BuysService from "@/services/BuysService";
import UsersService from '@/services/UsersService'
import moment from "moment";
import UploadService from "@/services/UploadService";
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default {
  filters: {
    formatedDate(value) {
      return moment(String(value)).format("DD-MM-YYYY");
    },
    getNumberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  data() {
    return {
      transections: [],
      users: null, 
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      // uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      buy: {
        pictures: "null",
        cheakshow: "",
        idshow: "",
        userId: 0,
        sav: "false",
      },
       
      check: "false",
      number: 0 ,
    };
  },
  async created() {
    this.transections = (await BuysService.user(this.user.id)).data;
    try {
      let userId = this.$route.params.userId
      if (userId != ''){
        this.users = (await UsersService.show(userId)).data
      }        
    } catch (error) {
      console.log (error)
    }
    console.log(this.transections);
  },
  mounted() {
    if (!this.isUserLoggedIn) {
      alert("Please, Register or Login before.\n\nThank you.");
      this.$router.push({
        name: "front",
      });
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async sendPaid(id) {
      let transection = {
        id: id,
        clientStatus: "รอตรวจสอบการชำระเงิน",
        pictures: this.buy.pictures
      };
      try {
        await BuysService.put(transection);
        this.check = "true"
        this.buy.sav = "false"
        this.refreshData();
      } catch (error) {
        console.log(error);
      }
    },
    async useThumbnail (id,filename) {     
      //console.log(filename) 
      this.buy.pictures = filename
      let transection = {
        id: id,
        pictures: filename
      };
      try {
        await BuysService.put(transection);
        this.check = "true"
        this.refreshData();
      } catch (error) {
        console.log(error);
      }
      
    },
    async delFile (material){
      let result = confirm("Want to delete?")
      if (result) {
        let dataJSON = {
          "filename":material.name
        }
        
        await UploadService.delete(dataJSON)      

        for (var i=0;i<this.pictures.length;i++){
          if(this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1)
            this.materialIndex--
            break
          }
        }    
      } 
    },
    async refreshData() {
      this.transections = (await BuysService.user(this.user.id)).data;
      this.users = (await UsersService.index()).data
    },
    async save(formData) {
      // upload data to the server
      try {
        this.currentStatus = STATUS_SAVING
        await UploadService.upload(formData)
        this.currentStatus = STATUS_SUCCESS
        
        // update image uploaded display
        let pictureJSON = []
        this.uploadedFileNames.forEach(uploadFilename => {
          let found = false;
          for(let i=0;i<this.pictures.length;i++){
            if(this.pictures[i].name == uploadFilename){            
              found = true            
              break
            }            
          }

          if(!found){
            this.pictureIndex++
            this.number++
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename
            }
            this.pictures.push(pictureJSON) 
          }  
        })

      } catch (error) {
        console.log(error)
        this.currentStatus = STATUS_FAILED
      }
    },
    filesChange(fieldName, fileList,id) {
      // handle file changes
      this.buy.idshow = id
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      // save it
      this.save(formData);
    },
    cheakshow(id){
      this.buy.idshow = id
      this.buy.cheakshow = "true"
      this.buy.sav = "false"
    },
    cheakshowfalse(id){
      this.buy.idshow = id
      this.buy.cheakshow = "false"
      this.buy.sav = "false"
    },
    sav(id){
      this.buy.idshow = id
      if (this.buy.sav == "false") {
        this.buy.sav = "true"
      }else {
        this.buy.sav = "false"
      }
      
    }
    
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ]),
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
};

</script>
<style scoped>
.user-info h1 {
  text-align: center;
}
.trasection-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.trasection-list .lii {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.cart-info {
  margin-top: 50px;
}
.trasection-null {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  margin-top: 30px;
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
input[type=checkbox] {
  display: none;
}

.container img {
  margin: 0px;
  transition: transform 0.25s ease;
  cursor: zoom-in;
}

input[type=checkbox]:checked ~ label > img {
  transform: scale(5);
  cursor: zoom-out;
}
</style>