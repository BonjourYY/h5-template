<template>
  <div class="p-[15px] min-h-screen bg-[#f7f7f7]">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="flex flex-col gap-[20px]">
        <li
          class="bg-[#fff] p-[10px] rounded-[8px] space-y-[20px]"
          v-for="demand in demandList"
          :key="demand.id"
        >
          <p class="text-[12px] text-[#999] text-right">
            {{ format(demand.createdAt, 'yyyy-MM-dd HH:mm') }}
          </p>
          <p class="text-[16px] leading-[1.5]">{{ demand.content }}</p>
          <div class="p-[10px] bg-[#F6F6F6] space-y-[20px]" v-if="demand.feedbackId">
            <div class="flex justify-between">
              <p class="font-[600]">回复：</p>
              <p class="text-[12px] text-[#999]">
                {{ format(demand.feedback?.updatedAt as string, 'yyyy-MM-dd HH:mm') }}
              </p>
            </div>
            <p class="text-[16px] leading-[1.5]">{{ demand.feedback?.content }}</p>
          </div>
        </li>
      </ul>
    </van-list>
    <div class="mt-[20px]">
      <RouterLink :to="{ name: 'demand-ask' }">
        <van-button color="#30B3EA" block round type="primary" native-type="submit">
          去提问
        </van-button>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { readDemand } from '@/api/demand'
import type { Demand } from '@/api/demand/type'
import { ref } from 'vue'
import { format } from 'date-fns'

const demandList = ref<Demand[]>([])
let page = 1
const limit = 10
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  loading.value = true
  const { list, meta } = await readDemand({ page, limit })
  demandList.value.push(...list)
  page++
  loading.value = false
  if (demandList.value.length >= meta.totalCount) {
    finished.value = true
  }
}
</script>
