<template>
  <Page class="page-projects">
    <div class="projects">
      <a
        class="item"
        :href="'./project.html?id=' + p.id + '&title=' + p.title"
        :key="index"
        v-for="(p, index) in posts"
      >
        <div class="thumb">
          <img :src="p.thumb" />
        </div>
        <div class="title">{{ p.title }}</div>
        <div class="tags" v-if="p.tags && p.tags.length > 0">
          <span :key="index" v-for="(t, index) in p.tags">
            <a href="javascript:;">{{ t.name }}</a>
          </span>
        </div>
      </a>
    </div>
    <Loading v-if="loading" />
  </Page>
</template>

<script>
import _ from 'lodash';

import Page from '@/components/Page';
import Loading from '@/components/Loading';

import request from '@/utils/request';

export default {
  name: 'page-project',
  components: {
    Page,
    Loading,
  },
  data() {
    return {
      loading: true,
      posts: [],
    };
  },
  created() {
    this.loading = true;
    request
      .get('/wp-json/wp/v2/posts?per_page=100&_embed')
      .then(res => {
        this.posts = _.map(res, r => {
          const id = r.id;
          const title = _.result(r, 'title.rendered');
          const thumb = _.result(r, '_embedded.wp:featuredmedia[0].source_url');
          const tags = [];
          _.forEach(_.result(r, '_embedded.wp:term'), t => {
            if (t && t.length > 0 && t[0].taxonomy === 'post_tag') {
              tags.push({
                id: t[0].id,
                name: t[0].name,
              });
            }
          });
          return {
            id,
            title,
            thumb,
            tags,
          };
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
.page-projects {
  .projects {
    .item {
      display: inline-block;
      margin: 0 15px 26px 0;
      max-width: 250px;
      position: relative;
      font-size: 12px;
      vertical-align: top;
      text-decoration: none;
      .thumb {
        position: relative;
        margin-bottom: 12px;
        width: 250px;
        min-height: 115px;
        img {
          display: block;
          margin: 0;
          width: 100%;
        }
      }
      .title {
        font-size: 15px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tags {
        color: #333333;
        font-family: Menlo, monaco, monospace;
        font-size: 11px;
        margin: 2px 0 2px 0;
        line-height: 20px;
        span {
          margin-right: 3px;
          &::after {
            content: ',';
          }
          &:last-child {
            &::after {
              display: none;
            }
          }
          a {
            color: #333333;
            font-size: 11px;
            line-height: 1.5em;
            text-decoration: none;
            &:hover {
              border-bottom: 1px solid #222;
              color: #222;
            }
          }
        }
      }
      &:hover {
        .thumb {
          outline: 1px solid #cccccc;
          outline-offset: 2px;
        }
        .title {
          color: #000000;
          border-bottom: 1px #000000;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
