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
    width: 50%;
    height: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    app-region: no-drag;
  }

  input {
    background-color: rgba(255, 255, 255, 0.25);
    color: white;
    height: 20px;
    text-align: center;
    flex: 1;
    row-gap: 8px;
    border-radius: 7px;
    border: none;
    border-width: 0;
    box-shadow: none;
  }

  input:focus {
    outline: none;
  }
</style>
