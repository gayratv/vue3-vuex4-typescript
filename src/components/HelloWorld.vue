<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>count : {{ count }}</h2>
    <h2>user : {{ user.name }}</h2>

    <button @click="handleAdd2">Start mutations</button>
    <button @click="handleDispatchSetMultiA">Dispatch action setMultiA</button>
    <button @click="handleChangeUserName">
      Dispatch mutation changeUserName
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useStore, Store, State } from "@/store";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const store = useStore();
    const count = computed(() => store.getters.counterGet);
    const user = computed(() => store.getters.userGet);

    const handleAdd2 = () => {
      store.commit("setAdd", 2);
      store.commit("setMulti", { addCnt1: 1, addCnt2: 2 });
    };
    const handleDispatchSetMultiA = async () => {
      store.dispatch("setMultiA", { addCnt1: 1, addCnt2: 1 });
    };
    const handleChangeUserName = () => {
      store.commit("changeUserName", "Petya");
    };

    return {
      count,
      user,
      handleAdd2,
      handleDispatchSetMultiA,
      handleChangeUserName,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  display: block;
  margin: 10px auto;
  font-size: 1.5rem;
  color: blue;
  padding: 0.5em;
}
</style>
