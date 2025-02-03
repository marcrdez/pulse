<script lang="ts">
  import { IconPlus } from '@tabler/icons-svelte';
  const handleClick = (): void => window.api.newTab();
</script>

<div class="tab" on:click={handleClick} on:keyup={(): void => {}} role="button" tabindex="0">
  <IconPlus size={16} />
  <p>New Tab</p>
</div>
