<script lang="ts">
  import type { Snippet } from 'svelte';
  import { root_assets } from '$lib/assets/index';
  import { LogOut } from 'lucide-svelte';
  import { page } from '$app/stores';
  import Button from '$lib/components/ui/button/button.svelte';
  import AdminLogout from './AdminLogout.svelte';

  interface Props {
    children: Snippet;
  }

  const { ...props }: Props = $props();


  const site_map = [
    {
      url: '/admin',
      name: 'Dashboard'
    },
    {
      url: '/admin/products',
      name: 'Products'
    },
    {
      url: '/admin/categories',
      name: 'Categories'
    },
    {
      url: '/admin/users',
      name: 'Manage users'
    }
  ];
</script>

<div class="grid lg:grid-cols-[300px,1fr]">
  <div class="sticky top-0 h-[70dvh]">
    <div class="flex justify-center p-4">
      <div class="flex items-end gap-2.5">
        <enhanced:img src={root_assets.adminLanding} alt="system-image" class="h-[70px] w-[50px]"
        ></enhanced:img>
        <div class="">
          <h5 class="text-2xl font-semibold text-primary">Crop Mart</h5>
          <p class="text-sm leading-7 text-muted-foreground">Management Portal</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2.5 p-4">
      {#each site_map as site}
        <a
          href={site.url}
          class="{$page.url.pathname === site.url ? 'bg-primary text-white' : 'bg-secondary/80'}
                    rounded-lg p-4 text-[20px] font-semibold text-muted-foreground transition-all hover:bg-primary/50 hover:text-white"
          >{site.name}</a
        >
      {/each}
    </div>
  </div>
  <div class="">
    <nav
      class="sticky top-0 z-20 flex items-center justify-between border-b-2 border-l-2 px-5 py-2 backdrop-blur-lg"
    >
      <AdminLogout />
      <div class="flex items-center gap-2.5">
        <p class="font-semibold leading-7 text-muted-foreground">Admin, <strong>Kaloy</strong></p>
        <div class="h-[45px] w-[45px] rounded-full bg-red-500"></div>
      </div>
    </nav>

    <div class="min-h-screen border-l-2">
      {@render props.children()}
    </div>
  </div>
</div>
