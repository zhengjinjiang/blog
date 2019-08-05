<template>
  <Page class="page-home">
    <div class="title">Zhengjinjiang.Design</div>
    <div class="content">
   
      <p>
        <template v-for="(m, index) in menus">
          <span v-if="index > 0" :key="index">&nbsp;|&nbsp;</span>
          <b :key="index">
            <a v-if="m.type === 'taxonomy'" href="./projects.html">{{
              m.title
            }}</a>
            <a
              v-else-if="m.type === 'post_type'"
              :href="'./page.html?id=' + m.id + '&title=' + m.title"
              >{{ m.title }}</a
            >
            <a v-else-if="m.type === 'custom'" :href="m.url">{{ m.title }}</a>
          </b>
        </template>
      </p>
      
      <Loading v-if="loading" />
     
      <br />
      <font size="2">
        Copyright © {{ year }} Zhengjinjiang.Design All rights reserved.
      </font>
    </div>
  </Page>
</template>

<script>
import _ from 'lodash';

import Page from '@/components/Page';
import Loading from '@/components/Loading';

import request from '@/utils/request';

export default {
  name: 'page-home',
  components: {
    Page,
    Loading,
  },
  data() {
    return {
      loading: true,
      year: new Date().getFullYear(),
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
.page-home {
  .title {
    font-family: Bitter, Bold 700;
    font-size: 24px;
    letter-spacing: 1px;
    margin-bottom: 35px;
  }
  .content {
    max-width: 640px;
  }
}
</style>
