<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { adminLoginSchema, type AdminLoginSchema } from './schema';

	interface Props {
		adminLoginForm: SuperValidated<Infer<AdminLoginSchema>>;
	}

	const { ...props }: Props = $props();

	const form = superForm(props.adminLoginForm, {
		validators: zodClient(adminLoginSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="flex flex-col gap-2.5">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="pwd">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$formData.pwd} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button href="/admin">Log in</Form.Button>
</form>
