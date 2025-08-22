<template>
  <div class="p-[15px] min-h-screen bg-[#f7f7f7]">
    <van-form @submit="onSubmit">
      <van-field
        v-model="formData.content"
        rows="16"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请在这里输入您的问题"
        show-word-limit
      />
      <van-field
        v-model="formData.contact_person"
        name="contact_person"
        label="联系人"
        placeholder="请输入联系人"
      />
      <van-field
        v-model="formData.contact_phone"
        name="contact_phone"
        label="联系方式"
        placeholder="请输入联系方式"
      />

      <div class="mt-[111px]">
        <van-button color="#30B3EA" block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup lang="ts">
import { createDemand } from '@/api/demand'
import { showSuccessToast } from 'vant'
import { ref } from 'vue'

// 写成函数，需要干净数据时直接调
const createDefaultForm = () => ({
  content: '',
  contact_person: '',
  contact_phone: '',
})
const formData = ref(createDefaultForm())
const onSubmit = async () => {
  await createDemand(formData.value)
  showSuccessToast('提交成功')
  // 赋一个全新的对象
  formData.value = createDefaultForm()
}
</script>
