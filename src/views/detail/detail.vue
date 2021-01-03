<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      :probe-type="3"
      @scroll="contentScorll"
      class="content"
      ref="scroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top
      class="back-top"
      @click.native="backClick"
      v-show="isshowBackTo"
    />
    <detail-bottom-bar @addCart="addToCart" />
    <!-- <toast :message="message" :isShow="isShow" /> -->
  </div>
</template>
<script>
import detailNavBar from "./childComps/detailNavBar";
import detailSwiper from "./childComps/detailSwiper";
import detailBaseInfo from "./childComps/detailBaseInfo";
import detailShopInfo from "./childComps/detailShopInfo";
import detailGoodsInfo from "./childComps/detailGoodsInfo";
import detailParamInfo from "./childComps/detailParamInfo";
import detailCommentInfo from "./childComps/detailCommentInfo";
import detailBottomBar from "./childComps/detailBottomBar";

import backTop from "components/content/backTop/backTop";
import Scroll from "components/common/scroll/scroll";
// import toast from "components/common/toast/toast";

import GoodsList from "components/content/goods/GoodsList";

import {
  getDatail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      isshowBackTo: false,
      themeTopYs: [],
      currentIndex: 0,
      itemListener: null,
      refresh: null,
      getThemTopY: null
      // message: "",
      // isShow: false
    };
  },
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    detailGoodsInfo,
    detailParamInfo,
    detailCommentInfo,
    detailBottomBar,
    Scroll,
    // toast,
    backTop,
    GoodsList
  },
  created() {
    this.iid = this.$route.params.iid;
    getDatail(this.iid).then(res => {
      console.log(res);
      // 1.获取顶部轮播图数据
      console.log(res.result);
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      //   console.log(this.themeTopYs);
      // });
    });
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    // 4. 在getThemTopY赋值 进行防抖操作
    this.getThemTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 10);
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemListener = () => {
      this.refresh();
    };
    this.$bus.on("imgeLoad", this.itemListener);
  },
  unmounted() {
    this.$bus.off("imgeLoad", this.itemListener);
  },
  updated() {},
  methods: {
    ...mapActions(["addCart"]),
    backClick() {
      // console.log("回到顶部");
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScorll(position) {
      // console.log(position);
      // 1.判断BackTo是否显示
      let positionY = Math.abs(position.y);
      this.isshowBackTo = positionY > 3000 ? true : false;
      // 2.判断导航栏的index
      // for (let i of this.themeTopYs) {
      //   if (positionY > i && positionY < i + 1 && undefined) {
      //     console.log(i + 1);
      //   }
      // }
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // if (positionY > this.themeTopYs[parseInt(i)] && undefined) {
        //   console.log(i);
        // }
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
      }
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    imageLoad() {
      this.refresh();
      this.getThemTopY();
    },
    addToCart() {
      // 1.获取商品的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.lowPrice;
      product.iid = this.iid;
      // 2.将商品添加到购物车里面
      // this.$store.commit("addCart", product);
      this.addCart(product).then(res => {
        this.$toast(res);
        // alert(this.$toast(res));
      });
      //   // this.isShow = true;
      //   // this.message = res;
      //   // setTimeout(() => {
      //   //   this.isShow = false;
      //   // }, 2000);
      // });
      // this.$store.dispatch("addCart", product).then(res => {
      //   alert(res);
      // });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 11;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
  position: relative;
  bottom: 55px;
}
.back-top {
  position: fixed;
  right: 15px;
  bottom: 70px;
}
</style>
