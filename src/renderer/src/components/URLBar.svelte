<script lang="ts">
  let url = '';

  window.api.onWillNavigate((value) => {
    url = value;
  });

  function handleInput(event): void {
    if (event.key !== 'Enter') return;

    url = event.target.value;
    window.api.setUrl(url);
  }
</script>

<div class="url-bar">
  <input type="url" bind:value={url} placeholder="" on:keydown={handleInput} />
</div>

<style>
  .url-bar {
    width: 50%;
    height: 25px;
    display: flex;
    align-items: center;
    app-region: no-drag;
  }

  input {
    padding: 0 10px;
    background-color: rgba(255, 255, 255, 0.25);
    color: white;
    height: 25px;
    text-align: center;
    flex: 1;
    row-gap: 8px;
    border-radius: 7px;
    border: none;
    border-width: 0;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  input:focus {
    outline: none;
  }
</style>
