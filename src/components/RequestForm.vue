<template>
  <form class="form popup-form" method="post" @submit.prevent="submit">
    <MyFieldInput
      :class="{'field--error': $v.form.request_cost_name.$error}"
      v-model="$v.form.request_cost_name.$model"
      :placeholder="'Укажите имя'"
      autofocus
    >Имя</MyFieldInput>

    <MyFieldInput
      :class="{'field--error': $v.form.request_cost_phone.$error}"
      v-model="$v.form.request_cost_phone.$model"
      :type="'tel'"
      :mask="'(###) ###-##-##'"
      :placeholder="'(___) ___-__-__'"
    >
      Телефон
      <template v-slot:prefixInput>+7</template>
    </MyFieldInput>

    <div class="popup-form__submit-wrapper form-submit-wrapper">
      <MyButton type="submit" :disabled="($v.form.$invalid || isSubmitting)"></MyButton>
    </div>
  </form>
</template>

<script>
import MyFieldInput from './MyFieldInput';
import MyButton from './MyButton';

import Axios from 'axios';
import { typeHouseDictionary, roomDictionary } from '@/assets/js/dictionary.js';
import { required } from 'vuelidate/lib/validators';
import { checkPhoneMask } from '@/assets/js/validator.js';

export default {
  name: 'RequestForm',
  props: {
    apartment: {
      type: Object,
      required: true
    }
  },
  validations: {
    form: {
      request_cost_name: {
        required
      },
      request_cost_phone: { required, checkPhoneMask }
    }
  },
  data() {
    return {
      isSubmitting: false,
      form: {
        action: 'sendRequestFlatCost',
        request_cost_name: '',
        request_cost_phone: ''
      }
    };
  },
  computed: {
    room() {
      return roomDictionary[this.apartment.selectedRoom];
    },
    typeHouse() {
      return typeHouseDictionary[this.apartment.selectedHouseId];
    }
  },
  methods: {
    submit() {
      this.$v.$touch();

      if (!this.$v.form.$invalid) {
        const data = Object.assign(
          { room: this.room, typeHouse: this.typeHouse },
          this.form,
          this.apartment
        );
        this.isSubmitting = true;

        Axios.post('/wp-content/themes/next/mail.php', data).then(response => {
          alert(
            'Форма отправлена. \n Наш менеджер свяжется с вами в ближайшее время.'
          );
          this.$emit('send-mortgage-form');
          this.isSubmitting = false;
        });
      }
    }
  },
  components: {
    MyFieldInput,
    MyButton
  }
};
</script>

<style lang="scss" scoped>
.form-submit-wrapper {
  margin-top: 28px;
  text-align: center;
}

.field {
  margin-bottom: 20px;
}
</style>
