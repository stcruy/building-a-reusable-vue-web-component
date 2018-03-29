<template>
  <div class="my-component">
    <button @click="increment">+</button>&nbsp;
    <span>{{ count }}
      <span class="smaller">
        (initial: {{ initialCount }}, {{ typeof initialCount }})
        (val: {{ val }})
      </span>
    </span>
  </div>
</template>


<script>
export default {
  name: 'MyComponent',

  props: {
    initialCount: {
      type: Number,
      default: 0
    },
    dataSource: {
      type: [Object, Function] ,  // This allows 'class' too.
      default: function() {  // Make default: an Object with a Function property.
        return { getValue: () => 0 };
      }
    }
  },

  data: function() {
    return {
      count: Math.floor(Number(this.initialCount))
    };
  },

  computed: {
    val: function() {
      return this.dataSource.getValue();
    }
  },

  methods: {
    increment(...args) {
      this.count++;
      this.$emit('inc', this.count, ...args);
    }
  }
};
</script>


<style scoped>
  span { font-size: 12px; color: blue; }
  span.smaller { font-size: 10px; }
</style>
