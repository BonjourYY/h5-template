<template>
  <div class="min-h-screen bg-[#DDF4FD]">
    <div
      :style="{ backgroundImage: `url(${bg})` }"
      class="h-[401px] bg-no-repeat bg-cover pt-[350px]"
    >
      <div
        class="mx-[16px] rounded-[30px] px-[16px] py-[8px] flex gap-[10px] items-center text-[#858B9C] bg-[rgba(249,250,251,0.8)]"
      >
        <RiSearch2Line color="#858B9C" size="20px" />
        <form @submit.prevent="handleSearch">
          <input
            class="w-full text-[16px]"
            type="text"
            v-model="inputValue"
            placeholder="全站内容搜索"
          />
        </form>
      </div>
    </div>
    <div class="p-[15px] space-y-[15px]">
      <ul class="flex gap-[5px] items-center overflow-x-scroll">
        <li
          @click="activeTag = tag.id"
          v-for="tag in tags"
          :key="tag.id"
          :class="[
            'rounded-[16px]',
            'whitespace-nowrap',
            'border',
            'px-[10px]',
            'py-[12px]',
            'font-[600]',
            'text-[16px]',
            activeTag === tag.id ? tag.activeClass : tag.defaultClass,
          ]"
        >
          {{ tag.name }}
        </li>
      </ul>
      <ul class="flex flex-col gap-[20px]">
        <li v-for="(item, index) in listData" :key="item.id">
          <p
            class="rounded-t-[15px] bg-[rgba(50,135,239,0.25)] text-[16px] font-[600] text-[#000] px-[20px] py-[8px] text-justify"
          >
            <span>{{ index + 1 }}.</span>
            <span>{{ item.question }}</span>
          </p>
          <p
            v-html="edjsParser.parse(item.answer)"
            class="v-html-container bg-[#fff] text-[16px] font-[400] text-[#000] leading-[1.7] p-[18px]"
          ></p>
        </li>
      </ul>
    </div>
    <RouterLink :to="{ name: 'demand-list' }">
      <div class="fixed bottom-[100px] right-0 z-[10] bg-[#30B3EA] p-[10px] rounded-l-[100px]">
        <RiCustomerServiceFill color="#FFF" size="20px" />
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
// 脚本部分保持不变
import { readQA, searchQA } from '@/api/qa'
import type { QA } from '@/api/qa/type'
import { RiSearch2Line, RiCustomerServiceFill } from '@remixicon/vue'
import { ref, watchEffect } from 'vue'
import bg from './assets/bg.png'
import edjsHTML from 'editorjs-html'

const listData = ref<QA[]>([])
const activeTag = ref(1)
const inputValue = ref('')

const edjsParser = edjsHTML()

const tags = ref([
  {
    id: 1,
    name: '日常生活篇',
    defaultClass: ['text-[#3287EF]', 'bg-[#E6F2FF]', 'border-[#3287EF]'],
    activeClass: ['text-[#FFFFFF]', 'bg-[#3287EF]', 'border-[#3287EF]'],
  },
  {
    id: 2,
    name: '创业就业篇',
    defaultClass: ['text-[#5FC6B3]', 'bg-[#EBFFFC]', 'border-[#5FC6B3]'],
    activeClass: ['text-[#FFFFFF]', 'bg-[#5FC6B3]', 'border-[#5FC6B3]'],
  },
  {
    id: 3,
    name: '创新发展篇',
    defaultClass: ['text-[#F8A1A1]', 'bg-[#FFFBFB]', 'border-[#F8A1A1]'],
    activeClass: ['text-[#FFFFFF]', 'bg-[#F8A1A1]', 'border-[#F8A1A1]'],
  },
  {
    id: 4,
    name: '法律服务篇',
    defaultClass: ['text-[#CCBE59]', 'bg-[#FFFBDA]', 'border-[#CCBE59]'],
    activeClass: ['text-[#FFFFFF]', 'bg-[#D2C569]', 'border-[#D2C569]'],
  },
])

const getData = async (tag: number) => {
  listData.value = await readQA(tag)
}

const handleSearch = async () => {
  listData.value = await searchQA(inputValue.value)
}

watchEffect(() => {
  getData(activeTag.value)
})
</script>

<style scoped>
/* 使用后代选择器为 v-html-container 下的所有 <p> 元素应用 Tailwind 样式 */
.v-html-container :deep(p) {
  @apply text-justify;
}
</style>
