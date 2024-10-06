<script lang="ts">
  const user_site_map = ['Farmers', 'Entrepreneurs', 'Riders'];
</script>

<nav class="border-b-2 bg-secondary p-2">
  <div class="flex items-center gap-2.5">
    {#each user_site_map as user_site}
      <button class="rounded-lg p-2 text-sm text-primary">
        {user_site}
      </button>
    {/each}
  </div>
</nav>
