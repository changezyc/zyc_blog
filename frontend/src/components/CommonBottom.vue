<template>
  <div
    id="mybottom"
    class="bottom"
  >
    <!-- 计时器 -->
    <timer class="timer threed"></timer>
    <div class="content">
      <div class="pic">
      </div>
      <p>
        <span>
          备案号：鄂ICP备2022054329号
        </span>
      </p>
      <p>
        <span>
          个人博客功能正在逐步完善中，敬请期待
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import timer from "./timer.vue";
export default {
  components: { timer },
  methods: {},
};
</script>

<style lang="scss" scoped>
.bottom {
  margin-top: 3px;
  width: 100%;
  height: 180px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
  // background-color: #2d2d2d;
  position: relative;
  .timer {
    position: absolute;
    right: 15px;
    color: white;
    bottom: 15px;
    font-size: 20px !important;
  }
  .content {
    margin-top: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #73777a;
    font-size: 14px;
    .pic {
      display: flex;
      justify-content: center;
      img {
        width: 100px;
        margin: 0 20px;
      }
    }
    p {
      margin-top: 5px;
      text-align: center;
      span {
        line-height: 30px;
        color: #ccc;
      }
    }
  }
}
</style>