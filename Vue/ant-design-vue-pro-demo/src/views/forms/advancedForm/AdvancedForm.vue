<template>
  <div>
    <h2>AdvancedForm</h2>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <ReceveiverAccount
          v-decorator="[
            'payAccount',
            {
              initialValue: step.receiveAccount,
              rules: [
                {
                  required: true,
                  validator: this.payAccountValidator,
                },
              ],
            },
          ]"
          placeholder="请输入收款账号"
        />
      </a-form-item>
      <a-form-item
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-button type="primary" @click="handleSubmit"> 下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ReceveiverAccount from '@/components/ReceiverAccount.vue'
export default {
  components: {
    ReceveiverAccount,
  },

  computed: {
    step() {
      return this.$store.state.form.step
    },
  },

  data() {
    this.form = this.$form.createForm(this)
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    }
  },

  methods: {
    handleSubmit() {},

    payAccountValidator(rule, value, callback) {
      if (value && value.number) {
        callback()
      } else {
        callback('请输入收款金额')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
