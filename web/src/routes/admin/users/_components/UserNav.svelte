<script lang="ts">
  const user_site_map = ['Farmers', 'Entrepreneurs', 'Riders'];

  interface Props {
    activeSite: string;
  }

  let { activeSite = $bindable() }: Props = $props();
</script>

<nav class="border-b-2 bg-secondary p-2">
  <div class="flex items-center gap-2.5">
    {#each user_site_map as user_site}
      <button
        onclick={() => {
          activeSite = user_site;
        }}
        class="rounded-lg p-2 text-sm text-primary transition-all hover:bg-primary/50 hover:text-white
        {activeSite === user_site ? 'bg-primary text-white' : ''}"
      >
        {user_site}
      </button>
    {/each}
  </div>
</nav>
