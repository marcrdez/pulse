<script lang="ts">
  import Navigation from './components/Navigation.svelte';
  import NewTab from './components/NewTab.svelte';
  import Tab from './components/Tab.svelte';
  import URLBar from './components/URLBar.svelte';

  let tabs = $state([]);
  window.api.onTabsChanged((tabsChanged) => {
    tabs = tabsChanged;
  });
</script>

<div id="topbar">
  <Navigation navigation={tabs.find((t) => t.isActive)?.navigation} />
  <URLBar url={tabs.find((t) => t.isActive)?.url || ''} />
</div>
<div id="sidebar" class="text">
  <NewTab />
  {#each tabs as tab}
    <Tab id={tab.id} name={tab.title} faviconUrls={tab.faviconUrls} isActive={tab.isActive} />
  {/each}
</div>
