<template>
  <Page class="page-page">
    <!-- <div class="title">{{ title }}</div> -->
    <div class="content" v-if="!loading" v-html="content"></div>
    <Loading v-if="loading" />
  </Page>
</template>

<script>
import _ from 'lodash';
import qs from 'qs';

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
    const search = window.location.search;
    const { id, title } = qs.parse(search.substr(1, search.length));
    return {
      loading: true,
      year: new Date().getFullYear(),
      id,
      title,
      content: '',
    };
  },
  created() {
    request
      .get(`/wp-json/wp/v2/pages/${this.id}`)
      .then(res => {
        console.log(res);
        this.title = _.result(res, 'title.rendered');
        this.content = _.result(res, 'content.rendered');
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
.page-page {
  .title {
    font-family: Bitter, Bold 700;
    font-size: 24px;
    letter-spacing: 1px;
    margin-bottom: 35px;
  }
  .content {
    max-width: 640px;
    hr {
      border: 0;
      border-top: 1px solid #000;
    }
    img {
      display: inline-block;
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
