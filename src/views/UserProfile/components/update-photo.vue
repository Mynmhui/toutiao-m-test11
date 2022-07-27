<template>
<div class="update-avatar">
  <img :src="img" ref="img"/>
  <div class="toolbar">
    <span class="cancel" @click="$emit('close')">取消</span>
    <span class="confirm" @click="confirm">完成</span>
  </div>
</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api'
export default {
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      aspectRatio: 1 / 1, // 默认比例
      preview: '.previewImg', // 预览视图
      guides: true, // 裁剪框的虚线(九宫格)
      autoCropArea: 0.5, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
      movable: false, // 是否允许移动图片
      dragCrop: true, // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
      resizable: true, // 是否允许改变裁剪框的大小
      zoomable: true, // 是否允许缩放图片大小
      mouseWheelZoom: true, // 是否允许通过鼠标滚轮来缩放图片
      touchDragZoom: true, // 是否允许通过触摸移动来缩放图片
      rotatable: true // 是否允许旋转图片
    })
  },
  props: {
    img: {
      type: [String, Object],
      retuired: true
    }
  },
  methods: {
    confirm () {
    //   console.log(this.cropper.getData())
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // 创建formData数据
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    .cancel, .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
