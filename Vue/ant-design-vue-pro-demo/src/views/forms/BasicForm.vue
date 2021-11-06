<template>
  <a-form :layout="formLayout">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal"> Horizontal </a-radio-button>
        <a-radio-button value="vertical"> Vertical </a-radio-button>
        <a-radio-button value="inline"> Inline </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :validateStatus="filedAStatus"
      :help="filedAHelp"
    >
      <a-input placeholder="input placeholder" v-model="filedA" />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :validateStatus="filedBStatus"
      :help="filedBHelp"
    >
      <a-input placeholder="input placeholder" v-model="filedB" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      formLayout: 'horizontal',
      filedA: '',
      filedAStatus: '',
      filedAHelp: '',
      filedB: '',
      filedBStatus: '',
      filedBHelp: '',
    }
  },
  watch: {
    filedA(val) {
      if (val.length <= 5) {
        this.filedAStatus = 'error'
        this.filedAHelp = '必须大于5个字符'
        return
      }
      this.filedAStatus = 'success'
      this.filedAHelp = ''
    },
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
        : {}
    },
    buttonItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? { wrapperCol: { span: 14, offset: 4 } }
        : {}
    },
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value
    },

    handleSubmit() {
      if (this.filedA.length <= 5) {
        this.filedAStatus = 'error'
        this.filedAHelp = '必须大于5个字符'
      } else {
        console.log(this.filedA, this.filedB)
      }
    },
  },
}
</script>
