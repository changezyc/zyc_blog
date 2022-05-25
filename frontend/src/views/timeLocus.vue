<template>
  <div
    class="block wow slideInLeft"
    style="background: rgba(255, 255, 255, .2)"
  >
    <div @click="changeShow">
      <el-button
        type="primary"
        round
        style="width: 100%"
      >{{timelineshow? '关闭时间轴':'展开时间轴'}}</el-button>
    </div>
    <el-timeline style="margin:20px">
      <el-collapse-transition>
        <div v-if="timelineshow">
          <el-timeline-item
            :timestamp="item.time"
            placement="top"
            class="transition-box"
            v-for="item in timeLocusData"
            :key="item.id"
          >
            <el-card>
              <h4>{{item.title}}</h4>
              <p style="margin-top: 10px">{{item.content}}</p>
            </el-card>
          </el-timeline-item>
        </div>
      </el-collapse-transition>
    </el-timeline>
  </div>
</template>

<script>
import axios from "axios";
import WOW from "wowjs";
export default {
  name: "timeLocus",
  data() {
    return {
      timelineshow: true,
      timeLocusData: [],
    };
  },
  methods: {
    getAllTimeLocus() {
      //timeLocusData是按时间戳由近到远排序，
      axios.get("/timelocus").then((res) => {
        console.log("res", res.data);
        this.timeLocusData = res.data.data;
      });
    },
    changeShow() {
      this.timelineshow = !this.timelineshow;
    },
  },
  created() {
    this.getAllTimeLocus();
  },
  mounted() {
    let wow = new WOW.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();
  },
};
</script>

<style lang="scss" scoped>
</style>