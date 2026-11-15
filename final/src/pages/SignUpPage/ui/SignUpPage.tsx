import { WithProtection } from '../../../features/auth/ui/WithProtection';
import { SignUpForm } from '../../../features/auth';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
