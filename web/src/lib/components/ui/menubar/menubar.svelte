<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils.js';

  type $$Props = MenubarPrimitive.Props;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<MenubarPrimitive.Root class={cn('flex items-center  rounded-md ', className)} {...$$restProps}>
  <slot />
</MenubarPrimitive.Root>
