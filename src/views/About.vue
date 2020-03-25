<template>
  <div class="about">
    <h1>This is an about page</h1>
    <NoteTest></NoteTest>
    <router-view></router-view>
  </div>
</template>
<script>
  import NoteTest from '@/components/recursion/NoteTest';
  export default {
    components: {
      NoteTest,
    },
  }
</script>
