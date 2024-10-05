<script lang="ts">
  import { ImageUp } from 'lucide-svelte';
  import { onDestroy } from 'svelte';

  interface Props {
    file: File | undefined;
    hasLink: string;
    attrs:
      | {
          name: string;
          id: string;
          'data-fs-error': string | undefined;
          'aria-describedby': string | undefined;
          'aria-invalid': 'true' | undefined;
          'aria-required': 'true' | undefined;
          'data-fs-control': string;
        }
      | undefined;
  }

  let { file = $bindable(), attrs, hasLink }: Props = $props();

  let previewUrl: string | null = $state(null);

  const readImage = () => {
    const reader = new FileReader();
    if (file) {
      reader.onload = () => {
        previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  onDestroy(() => (file = undefined));
</script>

<label
  class="flex flex-col items-center justify-center gap-[1.25rem] rounded-lg bg-secondary p-[1rem]"
>
  {#if previewUrl}
    <img src={previewUrl} alt="" class="h-[150px] w-full" />
  {:else if hasLink}
    <img src={hasLink} alt="churchImg" class="h-[150px] w-full" />
  {:else}
    <ImageUp class="h-[150px] w-[100px] text-primary" />
  {/if}

  <span class="text-sm text-primary">Upload Church Photo</span>
  <input
    {...attrs}
    type="file"
    class="hidden"
    onchange={readImage}
    oninput={(e) => {
      file = e.currentTarget.files?.item(0) as File;
    }}
    accept="image/*"
  />
</label>
