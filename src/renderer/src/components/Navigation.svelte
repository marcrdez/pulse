<script lang="ts">
  import { IconArrowLeft, IconArrowRight } from '@tabler/icons-svelte';

  let { navigation } = $props();

  const handleGoBackClick = (): void => {
    if (!navigation?.canGoBack) return;

    window.api.goBack();
  };
  const handleGoForwardClick = (): void => {
    if (!navigation?.canGoForward) return;

    window.api.goForward();
  };
</script>

<div class="navigation">
  <div
    onclick={handleGoBackClick}
    onkeyup={(): void => {}}
    tabindex="0"
    role="button"
    class="icon-div"
    class:disabled={!navigation?.canGoBack || true}
    class:enabled={navigation?.canGoBack || false}
  >
    <IconArrowLeft size={20} stroke={1.5} />
  </div>
  <div
    onclick={handleGoForwardClick}
    onkeyup={(): void => {}}
    tabindex="0"
    role="button"
    class="icon-div"
    class:disabled={!navigation?.canGoForward || true}
    class:enabled={navigation?.canGoForward || false}
  >
    <IconArrowRight size={20} stroke={1.5} />
  </div>
</div>
