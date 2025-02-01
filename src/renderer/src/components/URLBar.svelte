<script lang="ts">
  let url = '';

  window.api.onWillNavigate((value) => {
    url = value;
  });
</script>

<div class="url-bar">
  <input type="text" bind:value={url} placeholder="" />
</div>

<style>
  .url-bar {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
