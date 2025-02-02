<script lang="ts">
  let { name, faviconUrls } = $props();

  $inspect(faviconUrls);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('img').forEach(function (img) {
      img.onerror = function (): void {
        img.style.display = 'none';
      };
    });
  });
</script>

<div class="tab">
  <img
    srcset={faviconUrls.join(', ')}
    alt="favicon"
    onerror={(event): string => ((event.target as HTMLImageElement).style.display = 'none')}
    onload={(event): string => ((event.target as HTMLImageElement).style.display = '')}
  />
  <p>{name}</p>
  <div class="close-button"></div>
</div>
