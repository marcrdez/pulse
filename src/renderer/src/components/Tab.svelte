<script lang="ts">
  import { IconX } from '@tabler/icons-svelte';

  let { name, faviconUrls, isActive } = $props();

  let isMouseOver = $state(false);
</script>

<div
  class="tab"
  class:active={isActive}
  onmouseenter={(): boolean => (isMouseOver = true)}
  onmouseleave={(): boolean => (isMouseOver = false)}
  role="button"
  tabindex="0"
>
  <img
    srcset={faviconUrls.join(', ')}
    alt="favicon"
    onerror={(event): string => ((event.target as HTMLImageElement).style.display = 'none')}
    onload={(event): string => ((event.target as HTMLImageElement).style.display = '')}
  />
  <p>{name}</p>
  <div class="close-icon-div">
    <IconX size={16} class="close-icon" />
  </div>
</div>
