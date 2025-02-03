<script lang="ts">
  import { IconX } from '@tabler/icons-svelte';

  let { id, name, faviconUrls, isActive } = $props();

  let isMouseOver = $state(false);

  const handleCloseClick = (): void => {
    window.api.closeTab(id);
  };

  const handleTabClick = (): void => {
    if (isActive) return;

    window.api.changeCurrentTab(id);
  };
</script>

<div
  class="tab"
  class:active={isActive}
  onmouseenter={(): boolean => (isMouseOver = true)}
  onmouseleave={(): boolean => (isMouseOver = false)}
  role="button"
  tabindex="0"
  onclick={handleTabClick}
  onkeyup={(): void => {}}
>
  <img
    srcset={faviconUrls.join(', ')}
    alt="favicon"
    onerror={(event): string => ((event.target as HTMLImageElement).style.display = 'none')}
    onload={(event): string => ((event.target as HTMLImageElement).style.display = '')}
  />
  <p>{name}</p>
  <div
    class="hidden"
    class:close-icon-div={isMouseOver}
    onclick={handleCloseClick}
    onkeyup={(): void => {}}
    role="button"
    tabindex="0"
  >
    <IconX size={20} class="close-icon" />
  </div>
</div>
