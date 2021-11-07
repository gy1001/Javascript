<template>
  <div>
    分析页面
    <Charts />
    <pre v-highlightjs="ChartCode">
      <code class="html"></code>
    </pre>
  </div>
</template>

<script>
import Charts from '../../components/Chart.vue'
import ChartCode from '!!raw-loader!../../components/Chart.vue'
//import axios from 'axios'
export default {
  components: { Charts },

  mounted() {
    this.getChartData()
  },

  data() {
    return {
      ChartCode: ChartCode,
    }
  },

  methods: {
    getChartData() {},
  },
}
</script>

<style lang="less" scoped></style>
