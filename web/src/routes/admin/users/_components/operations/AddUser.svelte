<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Plus, X, Loader } from 'lucide-svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select/index.js';
  import { createUserSchema, type CreateUserSchema } from './schema';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';

  interface Props {
    createUserForm: SuperValidated<Infer<CreateUserSchema>>;
  }

  const { createUserForm }: Props = $props();

  let open = $state(false);

  const form = superForm(createUserForm, {
    validators: zodClient(createUserSchema),
    id: crypto.randomUUID(),
    async onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          form.reset();
          open = false;
          break;
        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const selectedRole = $derived(
    $formData.role ? { label: $formData.role, value: $formData.role } : undefined
  );
</script>

<Button class="gap-1.5" onclick={() => (open = true)}>
  <Plus class="h-4 w-4" />
  Create Account
</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="p-0">
    <button
      disabled={$submitting}
      type="button"
      onclick={() => {
        open = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-red-500 data-[state=open]:text-red-500"
    >
      <X class="h-4 w-4 text-primary " />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header class="px-6 pt-6">
      <AlertDialog.Title class="text-primary">Create Account</AlertDialog.Title>
      <AlertDialog.Description class="text-primary/90">
        Kindy provide all the information needed to create an account.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/createUserEvent" use:enhance>
      <ScrollArea class="h-[50dvh]  pb-2.5">
        <div class="px-6">
          <Form.Field {form} name="role">
            <Form.Control let:attrs>
              <Form.Label class="text-primary">Role</Form.Label>
              <Select.Root
                selected={selectedRole}
                onSelectedChange={(v) => {
                  v && ($formData.role = v.value);
                }}
              >
                <Select.Trigger {...attrs}>
                  <Select.Value placeholder="Select Role" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="Rider" label="Rider" />
                  <Select.Item value="Farmer" label="Farmer" />
                  <Select.Item value="Entrepreneur" label="Entrepreneur" />
                </Select.Content>
              </Select.Root>
              <input hidden bind:value={$formData.role} name={attrs.name} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="email">
            <Form.Control let:attrs>
              <Form.Label class="text-primary">Email</Form.Label>
              <Input {...attrs} bind:value={$formData.email} placeholder="Enter email" />
            </Form.Control>

            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="fName">
            <Form.Control let:attrs>
              <Form.Label class="text-primary">First Name</Form.Label>
              <Input {...attrs} bind:value={$formData.fName} placeholder="Enter first name" />
            </Form.Control>

            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="lName">
            <Form.Control let:attrs>
              <Form.Label class="text-primary">Last Name</Form.Label>
              <Input {...attrs} bind:value={$formData.lName} placeholder="Enter last name" />
            </Form.Control>

            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="address">
            <Form.Control let:attrs>
              <Form.Label class="text-primary">Address</Form.Label>
              <Input {...attrs} bind:value={$formData.address} placeholder="Enter address" />
            </Form.Control>

            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="mobileNum">
            <Form.Control let:attrs>
              <Form.Label class="text-primary">Mobile Number</Form.Label>
              <Input
                {...attrs}
                bind:value={$formData.mobileNum}
                placeholder="Enter mobile number"
              />
            </Form.Control>

            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="pwd">
            <Form.Control let:attrs>
              <Form.Label class="text-primary">Password</Form.Label>
              <Input
                type="password"
                {...attrs}
                bind:value={$formData.pwd}
                placeholder="Enter password"
              />
            </Form.Control>

            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="confirmPwd">
            <Form.Control let:attrs>
              <Form.Label class="text-primary">Confirm Password</Form.Label>
              <Input
                type="password"
                {...attrs}
                bind:value={$formData.confirmPwd}
                placeholder="Confirm password"
              />
            </Form.Control>

            <Form.FieldErrors />
          </Form.Field>
        </div>
      </ScrollArea>
      <AlertDialog.Footer class="px-6 pb-6">
        <Form.Button disabled={$submitting} class="relative">
          {#if $submitting}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Create
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
