<template>
  <div class="app-date-picker">
    <label v-if="label">{{ label }}</label>
    <date-picker
      v-model="text"
      @change="change()"
      @clear="clear()"
      :format="valueFormat"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :range="range"
      :range-separator="rangeSeparator"
      :shortcuts="shortcuts"
      :value-type="valueType"
      :show-time-panel="showTimePanel"
    >
      <!-- <template v-slot:icon-calendar>
        <IconCalendar/>
      </template>

      <template v-slot:icon-clear>
        <slot name="icon-clear"></slot>
      </template> -->
      <template v-slot:header>
        <button class="mx-btn mx-btn-text" @click="toggleTimePanel">
        {{ showTimePanel ? 'select date' : 'select time' }}
        </button>
      </template>
    </date-picker>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
export default {
  components: {
    DatePicker
  },
  props: {
    value: [String, Number, Date, Array],
    label: String,
    valueType: {
      type: String,
      default: "format",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    valueFormat: {
      type: String,
      default: "DD/MM/YYYY",
    },
    type: {
      type: String,
      default: "date",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
    rangeSeparator: {
      type: String,
      default: " - ",
    },
    shortcuts: {
      type: Array,
      default: () => [],
    },
    clearDate: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      text: this.value,
      showTimePanel: false,
    };
  },
  methods: {
    change: function() {
      this.$emit("input", this.text);
    },
    clear: function() {
      //this.text = null;
      this.$emit("input", null);
    },
    toggleTimePanel() {
      this.showTimePanel = !this.showTimePanel;
    },
    handleOpenChange() {
      this.showTimePanel = false;
    },
  },
  computed: {
    popupCls() {
      const typeCls = {
        "app-date-picker__popup--range": this.range,
      };

      return {
        ...typeCls,
      };
    },
  },
  watch: {
    value(newValue, oldValue) {
      this.text = this.clearDate ? null : newValue;
    },
  },
};
</script>
