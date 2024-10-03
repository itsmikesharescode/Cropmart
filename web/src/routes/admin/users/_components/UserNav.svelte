<script lang="ts">
  const user_site_map = [
    {
      url: '/admin/users',
      name: 'All Users'
    },

    {
      url: '/admin/users/farmers',
      name: 'Farmers'
    },
    {
      url: '/admin/users/entrepreneurs',
      name: 'Entrepreneurs'
    },
    {
      url: '/admin/users/riders',
      name: 'Riders'
    }
  ];
</script>

<nav class="border-b-2 bg-white p-2">
  <div class="flex items-center gap-2.5">
    {#each user_site_map as user_site}
      <a
        href={user_site.url}
        class="rounded-lg bg-secondary/80 px-4 py-2 font-semibold text-muted-foreground"
        >{user_site.name}</a
      >
    {/each}
  </div>
</nav>
