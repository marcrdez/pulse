<script lang="ts">
  import Tab from './components/Tab.svelte';
  import URLBar from './components/URLBar.svelte';

  let tabs = $state([]);
  window.api.onTabsChanged((tabsChanged) => {
    tabs = tabsChanged;
  });
</script>

<div id="topbar">
  <URLBar />
</div>
<div id="sidebar" class="text">
  {#each tabs as tab}
    {console.info(tab.title)}
    <Tab name={tab.title} />
  {/each}
</div>
