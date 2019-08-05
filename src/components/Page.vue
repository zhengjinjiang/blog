<template>
  <div class="page">
    <div class="page-navi">
      <a class="logo" href="./">
        <img
          src="http://www.zheng-jinjiang.com/wp-content/uploads/2018/12/B85DA58D5ABD8BD2D03D14705635F2E2副本-2.jpg"
        />
      </a>
      <template v-for="(m, index) in menus">
        <b class="item" :key="index">
          <a v-if="m.type === 'taxonomy'" href="./">
            {{ m.title }}
          </a>
          <a
            v-else-if="m.type === 'post_type'"
            :href="'./page.html?id=' + m.id + '&title=' + m.title"
          >
            {{ m.title }}
          </a>
          <a v-else-if="m.type === 'custom'" :href="m.url">
            {{ m.title }}
          </a>
        </b>
      </template>
    </div>
    <div class="page-content">
      <slot />
    </div>

    <div class="page-footer">
      Copyright © 2019 Zhengjinjiang.Design All rights reserved.
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

import request from '@/utils/request';

export default {
  name: 'Page',
  data() {
    return {
      loading: false,
      menus: [],
    };
  },
  created() {
    this.loading = true;
    request
      .get('/wp-json/menus/v1/menus/main')
      .then(res => {
        this.menus = _.map(res.items, m => {
          const { object_id, type, title, url } = m;
          return { id: object_id, type, title, url };
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style lang="less">
.page {
  position: relative;
  padding: 50px 140px;
  box-sizing: border-box;
  min-height: 100%;
  .page-navi {
    box-sizing: border-box;
    height: 50px;
    margin-bottom: 50px;
    .logo {
      position: absolute;
      right: 70px;
      top: 50px;
      display: block;
      margin-bottom: 20px;
      img {
        display: block;
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
    }
    .item {
      margin-right: 30px;
      a {
        display: inline-block;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        // text-decoration: none;
      }
    }
  }
  .page-content {
    position: relative;
    box-sizing: border-box;
    padding-bottom: 30px;
    // max-width: 1600px;
  }
  .page-footer {
    position: absolute;
    bottom: 30px;
    left: 140px;
    font-size: 12px;
  }
}
</style>
