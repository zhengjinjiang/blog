<template>
  <Page class="page-project">
    <!-- <div class="navi">
      <a href="./"><b>HOME</b></a>
      ↩｜↪
      <a href="./projects.html"><b>ALL PROJECTS</b></a>
    </div> -->
    <template v-if="post.photos && post.photos.length > 0">
      <div class="content" v-show="previewLoaded">
        <div class="preview">
          <img
            :src="post.photos[currIndex].src"
            @click="doPreview(currIndex)"
            @load="onPreviewLoad"
          />
        </div>
        <div class="thumbs" v-if="previewLoaded">
          <img
            :class="{ active: currIndex === index }"
            :src="t.src"
            :key="index"
            v-for="(t, index) in post.photos"
            @click="currIndex = index"
          />
        </div>
      </div>
      <!-- <div class="desc">
      <p>Graphic Design: Wang Zhi-Hong</p>
      <p>Client: Birmingham Design Festival</p>
      <p>Year: 2019</p>
    </div> -->

      <div class="footer" v-show="previewLoaded">
        <div class="title">{{ post.title }}</div>
        <div class="tags" v-if="post.tags && post.tags.length > 0">
          <span :key="index" v-for="(t, index) in post.tags">
            <a href="javascript:;">{{ t.name }}</a>
          </span>
        </div>
      </div>
      <PhotoPreview ref="preview" :photos="post.photos" :options="options" />
    </template>
    <Loading v-if="!previewLoaded" />
  </Page>
</template>

<script>
import _ from 'lodash';
import qs from 'qs';

import Page from '@/components/Page';
import Loading from '@/components/Loading';
import PhotoPreview from '@/components/PhotoPreview';

import request from '@/utils/request';

export default {
  name: 'page-project',
  components: {
    Page,
    Loading,
    PhotoPreview,
  },
  data() {
    const search = window.location.search;
    const { id, title } = qs.parse(search.substr(1, search.length));
    return {
      loading: true,
      previewLoaded: false,
      options: {
        fullscreenEl: false,
        shareEl: false,
      },
      currIndex: 0,
      post: {
        id,
        title,
        tags: [],
        photos: [],
      },
    };
  },
  created() {
    this.loading = true;
    request
      .get(`/wp-json/wp/v2/posts/${this.post.id}?_embed`)
      .then(res => {
        const photos = [];
        const tags = [];
        const title = _.result(res, 'title.rendered');
        const content = _.result(res, 'content.rendered');
        _.forEach(_.result(res, '_embedded.wp:term'), t => {
          if (t && t.length > 0 && t[0].taxonomy === 'post_tag') {
            tags.push({
              id: t[0].id,
              name: t[0].name,
            });
          }
        });
        // eslint-disable-next-line
        const result = content.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/gi);
        if (result) {
          _.forEach(result, r => {
            // eslint-disable-next-line
            const src = r.replace(/src=\"(.*)\"/, '$1');
            photos.push({ src, w: 0, h: 0 });
          });
        }
        document.title = `${title} – Zhengjinjiang.Design`;
        this.post.tags = tags;
        this.post.photos = photos;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    doPreview(index) {
      this.$refs.preview.open(index);
    },
    onPreviewLoad() {
      this.previewLoaded = true;
    },
  },
};
</script>

<style lang="less">
.page-project {
  .title {
    font-size: 24px;
    letter-spacing: 1px;
    margin: 0 0 10px 0;
  }
  .navi {
    margin-bottom: 30px;
  }
  .content {
    .preview {
      cursor: pointer;
      margin-bottom: 20px;
      img {
        display: block;
        max-width: 100%;
      }
    }
    .thumbs {
      img {
        cursor: pointer;
        display: inline-block;
        margin: 0 15px 15px 0;
        height: 80px;
        vertical-align: top;
        width: auto;
        &.active {
          outline: 1px solid rgba(0, 0, 0, 0.6);
          outline-offset: 2px;
        }
      }
    }
  }
  .footer {
    color: #000000;
    clear: both;
    font-size: 11px;
    padding-top: 35px;
    .tags {
      color: #333333;
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
  }
}
</style>
