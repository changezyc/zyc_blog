<template>
  <div class='switch-wrap'>
    <input
      type='checkbox'
      id='switch'
      @click="handle()"
    >
    <label for='switch'></label>
  </div>
</template>

<script>
export default {
  methods: {
    data() {
      return {
        readFlag: false,
      };
    },
    handle() {
      let sidebar = this.$parent.$refs.sidebar;
      let article = this.$parent.$refs.article;
      this.readFlag = !this.readFlag;
      if (this.readFlag) {
        sidebar.style.display = "none";
        article.style.width = "135%";
      } else {
        sidebar.style.display = "block";
        article.style.width = "100%";
      }
    },
  },
  created() {
    console.log(this.isname);
  },
};
</script>

<style lang="scss" scoped>
.switch-wrap {
  position: fixed;
  z-index: 9999;
  margin-left: 20px;
}
.switch-wrap input[type="checkbox"] {
  height: 0px;
  width: 0px;
  visibility: hidden;
  margin: 0;
  padding: 0;
}
.switch-wrap label {
  display: inline-block;
  width: 52px;
  height: 32px;
  border: 1px solid #dfdfdf;
  outline: none;
  border-radius: 16px;
  box-sizing: border-box;
  background: #ffffff;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  vertical-align: middle;
  position: relative;
}
.switch-wrap label::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  background-color: #fff;
}
.switch-wrap input:checked + label {
  background: #33db70;
}
.switch-wrap input:checked + label:before {
  transform: translateX(20px);
}
</style>
