<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
            },
          ]"
          :disabled="true"
        />
      </a-form-item>
      <a-form-item
        label="密码"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-input
          type="password"
          v-decorator="[
            'payPassword',
            { rules: [{ required: true, message: '请输入付款密码' }] },
          ]"
          placeholder="请输入付款密码"
        />
      </a-form-item>
      <a-form-item
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-button @click="toPrev"> 上一步</a-button>
        <a-button
          style="margin-left: 50px"
          type="primary"
          @click="handleSubmit"
        >
          提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    this.form = this.$form.createForm(this)
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    }
  },

  computed: {
    step() {
      return this.$store.state.form.step
    },
  },

  methods: {
    handleSubmit() {
      const { form, $router, $store } = this
      form.validateFields((err, values) => {
        if (!err) {
          $store
            .dispatch({
              type: 'form/submitStepForm',
              payload: values,
            })
            .then(() => {
              $router.push('/form/step-form/result')
            })
        }
      })
    },

    toPrev() {
      this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped></style>
