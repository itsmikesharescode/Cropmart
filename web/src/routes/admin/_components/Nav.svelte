<script lang="ts">
	import type { Snippet } from "svelte";

    interface Props {
        children: Snippet
    }

    const {...props}: Props = $props()

</script>

<div class="grid lg:grid-cols-[300px,1fr]">
    <div class="">
        
    </div>
    <div class="">
        <nav class="flex items-center justify-end px-5 py-2 border-l-2 border-b-2 sticky top-0">
            <div class="flex items-center gap-2.5">
                <p class="text-muted-foreground font-semibold leading-7">Admin, <strong>Kaloy</strong></p>
                <div class="w-[45px] h-[45px] rounded-full bg-red-500"></div>
            </div>
        </nav>

        <div class="min-h-screen border-l-2">
            {@render props.children()}
        </div>
    </div>

</div>