import { WithProtection } from '../../../features/auth/ui/WithProtection';
import { SignInForm } from '../../../features/auth';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
