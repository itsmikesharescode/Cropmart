<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { adminLoginSchema, type AdminLoginSchema } from './schema';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';

  interface Props {
    adminLoginForm: SuperValidated<Infer<AdminLoginSchema>>;
  }

  const { ...props }: Props = $props();

  const form = superForm(props.adminLoginForm, {
    validators: zodClient(adminLoginSchema),
    id: crypto.randomUUID(),
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" action="?/adminLoginEvent" use:enhance class="flex flex-col gap-2.5">
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={$formData.email} placeholder="Enter admin email" />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="pwd">
    <Form.Control let:attrs>
      <Form.Label>Password</Form.Label>
      <Input
        type="password"
        {...attrs}
        bind:value={$formData.pwd}
        placeholder="Enter admin password"
      />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button disabled={$submitting} class="relative">
    {#if $submitting}
      <div
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
      >
        <Loader class="h-[15px] w-[15px] animate-spin" />
      </div>
    {/if}

    Log in
  </Form.Button>
</form>
