<template>
  <div v-if="matched" class="breadcrumbs">
    <template v-for="(item, idx) of matched" :key="item.name">
      <dl v-if="item.meta.hiddenChildrenInMenu !== true && idx < matched.length - 1">
        <dt>
          <router-link :to="{ name: item.name }">{{ item.meta?.title }}</router-link
          ><span>/</span>
        </dt>
        <dd>
          <router-link
            v-for="child of item.children"
            :key="child.name"
            :to="{ name: child.name }"
            >{{ child.meta?.title }}</router-link
          >
        </dd>
      </dl>
      <span v-else>{{ item.meta?.title }}</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { RouteRecordNormalized } from 'vue-router'

import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const matched = ref<RouteRecordNormalized[]>()

watch(
  () => route.name,
  () => {
    matched.value = route.matched
  },
  { immediate: true }
)
</script>

<style scoped lang="less">
.breadcrumbs {
  display: flex;
  align-items: center;
  padding: 0 10px;
  dl {
    position: relative;
    dt {
      a {
        cursor: pointer;
      }
      span {
        margin: 0 8px;
      }
    }
    dd {
      display: none;
      width: 140px;
      padding: 5px 0;
      background-color: #fbfbfb;
      border-radius: 5px;
      position: absolute;
      a {
        display: block;
        line-height: 2em;
        height: 2em;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        text-indent: 10px;
        text-decoration: none;
        &:hover {
          background-color: #eee;
        }
      }
    }
    &:hover {
      dd {
        display: block;
      }
    }
  }
}
</style>
