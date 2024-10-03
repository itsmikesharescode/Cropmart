<script lang="ts">
  import Marquee from '$lib/components/general/Marquee.svelte';
  import ReviewCard from '$lib/components/general/ReviewCard.svelte';
  import AdminLogin from './_components/AdminLogin.svelte';

  const reviews = [
    {
      name: 'Alon',
      username: '@Alon',
      body: 'Napakagaling ng app na ito! Cropmart talaga ang solusyon sa lahat ng pangangailangan ko sa pagsasaka.',
      img: 'https://avatar.vercel.sh/jack'
    },
    {
      name: 'Luz',
      username: '@Luz',
      body: 'Wow, ang dali ng pagbili at pagbebenta ng mga produkto gamit ang Cropmart! Sulit na sulit.',
      img: 'https://avatar.vercel.sh/jill'
    },
    {
      name: 'Bayani',
      username: '@Bayani',
      body: 'Ang Cropmart ay napakaganda at talagang nakakatulong sa aking kabuhayan. Sobrang saya ko!',
      img: 'https://avatar.vercel.sh/john'
    },
    {
      name: 'Kulas',
      username: '@Kulas',
      body: 'Cropmart, pambihirang app ito! Madali gamitin at napakadali ng proseso. Paborito ko na!',
      img: 'https://avatar.vercel.sh/jane'
    },
    {
      name: 'Rosal',
      username: '@Rosal',
      body: 'Maganda ito! Tulong mo naman ako sa negosyo ko dito sa Cropmart. Galing!',
      img: 'https://avatar.vercel.sh/jenny'
    },
    {
      name: 'Datu',
      username: '@Datu',
      body: 'Sa wakas, may app na kagaya ng Cropmart! Madali na ang pagbili at pagbebenta. Saludo!',
      img: 'https://avatar.vercel.sh/james'
    }
  ];

  let firstRow = reviews.slice(0, reviews.length / 2);
  let secondRow = reviews.slice(reviews.length / 2);

  const { data } = $props();
</script>

<div class="relative mx-auto grid min-h-screen max-w-[1200px] grid-cols-2">
  <div class="flex flex-col items-center justify-center gap-2.5">
    <div class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover class="[--duration:20s]">
        {#each firstRow as item}
          <ReviewCard {...item} />
        {/each}
      </Marquee>
      <Marquee reverse pauseOnHover class="[--duration:20s]">
        {#each secondRow as item}
          <ReviewCard {...item} />
        {/each}
      </Marquee>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center gap-2.5">
    <div class="flex flex-col gap-2.5 rounded-lg bg-white p-5">
      <span
        class="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-black via-primary to-primary/80 bg-clip-text text-center text-3xl font-bold leading-none tracking-tighter text-transparent"
      >
        Admin Login
      </span>
      <div class="w-full md:w-[350px]">
        <AdminLogin adminLoginForm={data.adminLoginForm} />
      </div>
    </div>
  </div>
</div>
